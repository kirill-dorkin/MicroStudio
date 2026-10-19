import Image from "next/image";
import Link from "next/link";
import type { LocalizedProject } from "@/lib/content";
import { cn } from "@/lib/utils";

type Item = { project: LocalizedProject; href: string };

function Phone({ item, className, sizes, priority }: { item: Item; className?: string; sizes: string; priority?: boolean }) {
  return (
    <Link
      href={item.href}
      aria-label={item.project.name}
      className={cn(
        "group absolute block overflow-hidden rounded-[22px] border-[5px] border-[#25292c] bg-[#25292c] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9)] transition-transform duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1.5",
        className,
      )}
    >
      <span className="relative block aspect-[390/844] overflow-hidden rounded-[17px] bg-[#f3f3f1]">
        <Image src={item.project.screenshots.mobile} alt="" fill sizes={sizes} priority={priority} className="object-cover object-top" />
      </span>
    </Link>
  );
}

/**
 * Hero composition of MicroStudio's own sites: one desktop screen and three
 * phones, each linking to its project page. Static — nothing auto-rotates.
 */
export function WorkCollage({ desktop, phones, label }: { desktop: Item; phones: [Item, Item, Item]; label: string }) {
  return (
    <figure className="relative">
      <div className="relative aspect-[6/5]">
        <Link
          href={desktop.href}
          className="group absolute left-0 top-[4%] block w-[80%] overflow-hidden rounded-[14px] border border-white/10 bg-[#1b1e21] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)]"
        >
          <span className="flex h-7 items-center gap-1.5 border-b border-white/[0.06] px-3" aria-hidden="true">
            <span className="size-2 rounded-full bg-white/15" />
            <span className="size-2 rounded-full bg-white/15" />
            <span className="size-2 rounded-full bg-white/15" />
            <span className="mx-auto truncate text-[0.68rem] text-muted">{desktop.project.demoHost}</span>
          </span>
          <span className="sr-only">{desktop.project.name}</span>
          <span className="relative block aspect-[16/10] bg-[#f3f3f1]">
            <Image
              src={desktop.project.screenshots.desktop}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 80vw"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </span>
        </Link>
        <Phone item={phones[0]} className="right-[2%] top-0 w-[24%]" sizes="(min-width: 1024px) 12vw, 24vw" priority />
        <Phone item={phones[1]} className="bottom-0 left-[8%] w-[22%]" sizes="(min-width: 1024px) 11vw, 22vw" />
        <Phone item={phones[2]} className="bottom-[3%] left-[38%] w-[22%]" sizes="(min-width: 1024px) 11vw, 22vw" />
      </div>
      <figcaption className="mt-4 flex items-center gap-2 text-sm text-muted">
        <span className="size-1.5 rounded-full bg-lime" aria-hidden="true" />
        {label}
      </figcaption>
    </figure>
  );
}
