import { CustomCursorElement } from "@/components/custom-cursor-element";
import { InView } from "@/components/motion-primitives/in-view";
import { ScrollView, ScrollViewStaggerWrapper } from "@/components/scroll-view";
import { Badge } from "@/components/ui/badge";
import { SERVICES_LIST } from "@/content/services";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";

export default function ServicesSection2() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.slice(0, 2) as "en" | "ru" | "es";
  const services = SERVICES_LIST[lang];

  return (
    <section className="py-16 md:py-32" id="services">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
          <ScrollView>
            <h2 className="text-4xl font-medium lg:text-5xl">
              {t("services.title")}
            </h2>
          </ScrollView>
          <ScrollView delay={0.2}>
            <p
              dangerouslySetInnerHTML={{ __html: t("services.subtitle") }}
            />
          </ScrollView>
        </div>
        <div className="mt-12 md:mt-24">
          <div className="space-y-10">
            {services.map((service) => (
              <div
                key={service.name}
                className="group overflow-hidden border-b py-10"
              >
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                  <div className="self-end lg:col-span-2">
                    <div className="flex flex-col gap-8 ">
                      <div className="space-y-4">
                        <ScrollView>
                          <h3 className="text-title text-2xl font-medium">
                            {service.name}
                          </h3>
                        </ScrollView>

                        <ScrollView stagger delay={0.04}>
                          <div>
                            {service.tags.map((tag, index) => (
                              <div key={index} className="inline-block">
                                <ScrollViewStaggerWrapper>
                                  <Badge
                                    className="mr-2 mb-2"
                                    variant="secondary"
                                  >
                                    {tag}
                                  </Badge>
                                </ScrollViewStaggerWrapper>
                              </div>
                            ))}
                          </div>
                        </ScrollView>
                      </div>
                      <ScrollView delay={0.04}>
                        <p className="text-muted-foreground">
                          {service.description}
                        </p>
                      </ScrollView>
                    </div>
                  </div>
                  <div className=" lg:col-span-3">
                    <CustomCursorElement
                      cursor={
                        <div className="text-zinc-950 text-lg font-medium">
                          {t("services.view")}
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
                        <Link href={service.url}>
                          <Image
                            src={service.img}
                            alt={service.name}
                            height={480}
                            width={720}
                            loading="lazy"
                            className=" object-cover object-top  transition-all duration-500 w-full  aspect-[16/9]"
                          />
                        </Link>
                      </InView>
                    </CustomCursorElement>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
