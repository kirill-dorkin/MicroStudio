import { Plus } from "lucide-react";
import type { FaqItem } from "@/lib/schemas";

/** Native disclosure widgets: keyboard and screen-reader friendly without JS. */
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex min-h-16 items-center justify-between gap-6 py-5 text-left font-display text-[1.05rem] font-semibold tracking-[-0.01em] transition-colors hover:text-lime md:text-lg">
            <span>{item.question}</span>
            <Plus
              aria-hidden="true"
              className="size-5 shrink-0 text-muted transition-transform duration-300 group-open:rotate-45 group-open:text-lime"
            />
          </summary>
          <p className="max-w-3xl pb-6 text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
