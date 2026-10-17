"use client";
import { useEffect, useRef, useState } from "react";

// Artwork remains visible without JS. Load decorative video only when appropriate.
export default function StudioBackdrop() {
  const [enabled, setEnabled] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 960px) and (prefers-reduced-motion: no-preference)",
    );
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const update = () =>
      setEnabled(
        media.matches &&
          !connection?.saveData &&
          !connection?.effectiveType?.includes("2g"),
      );
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const element = video.current;
    if (!enabled || !element) return;
    let visible = true;
    const update = () => {
      if (visible && !document.hidden) void element.play().catch(() => {});
      else element.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [enabled]);
  return enabled ? (
    <video
      ref={video}
      className="studio-hero-video"
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src="/hero-light.mp4" type="video/mp4" />
    </video>
  ) : null;
}
