"use client";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollView } from "@/components/scroll-view";
import { useLanguage } from "@/components/language-provider";
import { selectService } from "@/lib/service-select";

export default function OfferCard() {
  const { t } = useLanguage();
  const offer = t.offer;

  return (
    <ScrollView>
      <Card
        id="offer"
        aria-labelledby="offer-title"
        className="relative overflow-hidden p-8 shadow-md sm:p-12"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-[url(/images/abstract-2.webp)] bg-cover opacity-30 blur-2xl dark:opacity-20"
        />
        <div className="relative grid gap-10 md:grid-cols-2 md:gap-12">
          <div className="flex flex-col">
            <span className="text-muted-foreground text-sm font-medium">
              {offer.eyebrow}
            </span>
            <h3 id="offer-title" className="mt-3 text-2xl font-medium">
              {offer.title}
            </h3>
            <p className="mt-4 text-5xl font-semibold tracking-tight">
              {offer.price}
            </p>
            <p className="mt-6 text-pretty">{offer.description}</p>
            <div className="mt-8 md:mt-auto md:pt-8">
              <Button asChild size="lg" className="h-auto min-h-10 whitespace-normal rounded-xl px-5 py-2.5 text-center">
                <Link href="#contact" onClick={() => selectService("onepage")}>
                  {offer.cta}
                </Link>
              </Button>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium">{offer.includesTitle}</h4>
            <ul className="mt-4 space-y-3">
              {offer.includes.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className="mt-0.5 size-5 shrink-0" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground mt-6 border-t pt-6 text-sm">
              {offer.note}
            </p>
          </div>
        </div>
      </Card>
    </ScrollView>
  );
}
