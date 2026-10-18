"use client";
import { Check, Heart, MessageCircle } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

/** Small interface sketches laid over the service artwork. */
export function ServiceVisual({ id }: { id: string }) {
  const { t } = useLanguage();
  const v = t.services.visual;
  const card =
    "rounded-[4cqw] bg-white/95 text-zinc-950 shadow-2xl shadow-black/20 backdrop-blur";
  const bar = "rounded-full bg-zinc-200";

  if (id === "new") {
    return (
      <div className={`${card} w-[66%] overflow-hidden`}>
        <div className="flex items-center gap-[1cqw] border-b border-zinc-100 px-[3cqw] py-[2cqw]">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-[1.6cqw] rounded-full bg-zinc-300" />
          ))}
          <span className={`${bar} ml-[2cqw] h-[2cqw] w-[30%] bg-zinc-100`} />
        </div>
        <div className="grid grid-cols-5 gap-[3cqw] p-[4cqw]">
          <div className="col-span-3 space-y-[1.6cqw]">
            <span className={`${bar} block h-[3cqw] w-[90%] bg-zinc-800`} />
            <span className={`${bar} block h-[3cqw] w-[65%] bg-zinc-800`} />
            <span className={`${bar} block h-[1.6cqw] w-full`} />
            <span className={`${bar} block h-[1.6cqw] w-[80%]`} />
            <span className="mt-[2cqw] block h-[4cqw] w-[45%] rounded-full bg-zinc-950" />
          </div>
          <div className="col-span-2 rounded-[2cqw] bg-linear-to-br from-emerald-200 to-amber-100" />
        </div>
      </div>
    );
  }

  if (id === "improve") {
    return (
      <div className="flex w-[74%] gap-[3cqw]">
        {[v.before, v.after].map((label, i) => (
          <div key={label} className={`${card} flex-1 p-[3cqw]`}>
            <span className="text-[2.2cqw] font-medium text-zinc-500">{label}</span>
            {i === 0 ? (
              <div className="mt-[2cqw] space-y-[1.4cqw] opacity-70">
                <span className={`${bar} block h-[2.4cqw] w-[70%] -rotate-2 bg-zinc-400`} />
                <span className={`${bar} ml-[4cqw] block h-[1.4cqw] w-[85%]`} />
                <span className={`${bar} block h-[1.4cqw] w-[40%]`} />
                <span className="block h-[8cqw] w-full rounded-[1cqw] bg-zinc-200" />
                <span className="ml-auto block h-[2.6cqw] w-[30%] rounded bg-zinc-400" />
              </div>
            ) : (
              <div className="mt-[2cqw] space-y-[1.4cqw]">
                <span className={`${bar} block h-[2.4cqw] w-[80%] bg-zinc-800`} />
                <span className={`${bar} block h-[1.4cqw] w-full`} />
                <span className={`${bar} block h-[1.4cqw] w-[70%]`} />
                <span className="block h-[8cqw] w-full rounded-[1.6cqw] bg-linear-to-br from-sky-200 to-blue-100" />
                <span className="block h-[3cqw] w-[50%] rounded-full bg-zinc-950" />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (id === "ads") {
    return (
      <div className={`${card} w-[42%] p-[2.5cqw]`}>
        <div className="flex items-center gap-[1.6cqw]">
          <span className="size-[4.5cqw] rounded-full bg-linear-to-br from-indigo-400 to-amber-300" />
          <div className="flex-1 space-y-[0.8cqw]">
            <span className={`${bar} block h-[1.4cqw] w-[60%] bg-zinc-700`} />
            <span className="block text-[1.8cqw] text-zinc-500">{v.sponsored}</span>
          </div>
        </div>
        <div className="mt-[2cqw] aspect-square rounded-[2cqw] bg-linear-to-br from-indigo-500 via-blue-400 to-amber-300" />
        <div className="mt-[2cqw] flex items-center gap-[2cqw] text-zinc-700">
          <Heart className="size-[3cqw]" />
          <MessageCircle className="size-[3cqw]" />
          <span className="ml-auto rounded-full bg-zinc-950 px-[2.4cqw] py-[0.8cqw] text-[1.8cqw] font-medium text-white">
            {v.adCta}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`${card} w-[56%] p-[3.5cqw]`}>
      <ul className="space-y-[2.2cqw]">
        {v.updates.map((item) => (
          <li key={item} className="flex items-center gap-[2cqw] text-[2.4cqw] font-medium">
            <span className="flex size-[4cqw] shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
              <Check className="size-[2.4cqw]" strokeWidth={3} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
