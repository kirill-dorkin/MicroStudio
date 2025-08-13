import { Circle } from "lucide-react";
import { ScrollView } from "./scroll-view";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function ContentSection() {
  const { t } = useTranslation();
  const ourPrinciples = t("about.principles", {
    returnObjects: true,
  }) as { title: string; description: string }[];

  return (
    <section className="py-16 md:py-32" id="about">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
        <div className="mx-auto max-w-xl space-y-6 text-center md:space-y-12">
          <ScrollView>
            <h2 className="text-balance text-4xl font-medium lg:text-5xl">
              {t("about.title")}
            </h2>
          </ScrollView>
          <ScrollView>
            <p>{t("about.description")}</p>
          </ScrollView>
        </div>
        <ScrollView>
          <Image
            className="rounded-(--radius) grayscale-75 object-cover aspect-[16/9] w-full"
            src="/images/office.jpeg"
            alt={t("about.imageAlt")}
            height="480"
            width="720"
            priority
          />
        </ScrollView>
        <ScrollView>
          <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4">
            {ourPrinciples.map((principle, index) => (
              <div className="space-y-3" key={index}>
                <div className="flex items-center gap-2">
                  <Circle className="size-4" />
                  <h3 className="text-sm font-medium">{principle.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </ScrollView>
      </div>
    </section>
  );
}
