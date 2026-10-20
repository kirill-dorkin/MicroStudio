"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  SpringOptions,
  useMotionValue,
  useSpring,
  AnimatePresence,
  Transition,
  Variant,
} from "motion/react";
import { cn } from "@/lib/utils";

export type CursorProps = {
  children: React.ReactNode;
  className?: string;
  springConfig?: SpringOptions;
  attachToParent?: boolean;
  transition?: Transition;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
  onPositionChange?: (x: number, y: number) => void;
};

export function Cursor({
  children,
  className,
  springConfig,
  attachToParent,
  variants,
  transition,
  onPositionChange,
}: CursorProps) {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!attachToParent);

  useEffect(() => {
    cursorX.set(window.innerWidth / 2);
    cursorY.set(window.innerHeight / 2);
  }, [cursorX, cursorY]);

  const cursorXSpring = useSpring(cursorX, springConfig || { duration: 0 });
  const cursorYSpring = useSpring(cursorY, springConfig || { duration: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      onPositionChange?.(e.clientX, e.clientY);
    };

    if (!attachToParent) {
      document.body.style.cursor = "none";
      document.addEventListener("mousemove", updatePosition);
      return () => {
        document.body.style.cursor = "auto";
        document.removeEventListener("mousemove", updatePosition);
      };
    }

    // Attached cursors only track the pointer while it is over their parent,
    // so many cursors on a page don't all listen to every mouse move.
    const parent = cursorRef.current?.parentElement;
    if (!parent) return;
    const onEnter = (e: MouseEvent) => {
      parent.style.cursor = "none";
      updatePosition(e);
      setIsVisible(true);
    };
    const onLeave = (e: MouseEvent) => {
      parent.style.cursor = "";
      onPositionChange?.(e.clientX, e.clientY);
      setIsVisible(false);
    };
    parent.addEventListener("mouseenter", onEnter);
    parent.addEventListener("mousemove", updatePosition);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mouseenter", onEnter);
      parent.removeEventListener("mousemove", updatePosition);
      parent.removeEventListener("mouseleave", onLeave);
      parent.style.cursor = "";
    };
  }, [attachToParent, cursorX, cursorY, onPositionChange]);

  return (
    <motion.div
      ref={cursorRef}
      className={cn("pointer-events-none fixed left-0 top-0 z-50", className)}
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={transition}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
