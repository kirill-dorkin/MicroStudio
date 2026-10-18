"use client";
import { ArrowRight } from "lucide-react";
import { CustomCursorElement } from "@/components/custom-cursor-element";
import { InView } from "@/components/motion-primitives/in-view";
import { ScrollView, ScrollViewStaggerWrapper } from "@/components/scroll-view";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import { selectService, type ServiceId } from "@/lib/service-select";
import OfferCard from "./offer-card";
import Image from "next/image";
import Link from "next/link";

export default function ServicesSection2() {
  const { t } = useLanguage();
  return (
    <section className="py-16 md:py-32" id="services">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
          <ScrollView>
            <h2 className="text-balance text-4xl font-medium lg:text-5xl">
              {t.services.title}
            </h2>
          </ScrollView>
          <ScrollView delay={0.2}>
            <p className="text-pretty">{t.services.subtitle}</p>
          </ScrollView>
        </div>
        <div className="mt-12 md:mt-24">
          <div className="space-y-10">
            {t.services.items.map((service) => (
              <article
                key={service.id}
                className="group overflow-hidden border-b py-10"
                aria-labelledby={`service-${service.id}`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                  <div className="self-end lg:col-span-2">
                    <div className="flex flex-col gap-6">
                      <div className="space-y-4">
                        <ScrollView>
                          <h3
                            id={`service-${service.id}`}
                            className="text-title text-2xl font-medium"
                          >
                            {service.name}
                          </h3>
                        </ScrollView>

                        <ScrollView stagger delay={0.04}>
                          <ul className="flex flex-wrap" aria-label={service.name}>
                            {service.tags.map((tag) => (
                              <li key={tag}>
                                <ScrollViewStaggerWrapper>
                                  <Badge className="mr-2 mb-2" variant="secondary">
                                    {tag}
                                  </Badge>
                                </ScrollViewStaggerWrapper>
                              </li>
                            ))}
                          </ul>
                        </ScrollView>
                      </div>
                      <ScrollView delay={0.04}>
                        <div className="space-y-3">
                          <p>
                            <span className="sr-only">{t.services.audienceLabel}: </span>
                            {service.audience}
                          </p>
                          <p className="text-muted-foreground">
                            <span className="sr-only">{t.services.discussLabel}: </span>
                            {service.description}
                          </p>
                        </div>
                      </ScrollView>
                      <ScrollView delay={0.06}>
                        <Link
                          href="#contact"
                          onClick={() => selectService(service.id as ServiceId)}
                          className="hover:text-foreground text-foreground/80 group/link inline-flex items-center gap-2 rounded-sm text-sm font-medium underline-offset-4 hover:underline"
                        >
                          {t.services.discuss}
                          <ArrowRight
                            className="size-4 transition-transform group-hover/link:translate-x-0.5"
                            aria-hidden
                          />
                        </Link>
                      </ScrollView>
                    </div>
                  </div>
                  <div className=" lg:col-span-3">
                    <CustomCursorElement
                      cursor={
                        <div className="text-zinc-950 text-lg font-medium">
                          {t.services.cursor}
                        </div>
                      }
                    >
                      <InView
                        variants={{
                          hidden: {
                            opacity: 0,
                            y: 20,
                            filter: "blur(14px)",
                            scale: 0.5,
                            originX: 0,
                            originY: 0,
                          },
                          visible: {
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            filter: "blur(0px)",
                            transition: {
                              delay: 0.01,
                              duration: 0.5,
                              type: "tween",
                            },
                          },
                        }}
                        viewOptions={{
                          margin: "0px 0px -250px 0px",
                          once: true,
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut", type: "tween" }}
                      >
                        <Link
                          href="#contact"
                          tabIndex={-1}
                          aria-hidden
                          onClick={() => selectService(service.id as ServiceId)}
                          className="block"
                        >
                          <Image
                            src={service.img}
                            alt={service.imgAlt}
                            height={900}
                            width={1600}
                            sizes="(min-width: 1024px) 580px, 100vw"
                            className="object-cover object-top transition-all duration-500 w-full aspect-[16/9]"
                          />
                        </Link>
                      </InView>
                    </CustomCursorElement>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <OfferCard />
      </div>
    </section>
  );
}
