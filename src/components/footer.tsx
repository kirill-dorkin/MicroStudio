"use client";
import { memo } from "react";
import { PhoneCall } from "lucide-react";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { motion } from "motion/react";
import { ScrollView } from "./scroll-view";
import { SocialIcon } from "./social-icon";
import { useLanguage } from "./language-provider";
import { NAV_LINKS } from "@/content/nav";
import { CONTACTS } from "@/lib/contacts";

function FooterSection() {
  const { t } = useLanguage();
  const socials = [
    {
      label: `Instagram ${CONTACTS.instagramHandle} (${t.common.newTab})`,
      href: CONTACTS.instagramHref,
      icon: <SocialIcon name="instagram" className="size-6" />,
      external: true,
    },
    {
      label: `WhatsApp ${CONTACTS.phoneDisplay} (${t.common.newTab})`,
      href: CONTACTS.whatsappHref,
      icon: <SocialIcon name="whatsapp" className="size-6" />,
      external: true,
    },
    {
      label: `${t.contact.channels.phone} ${CONTACTS.phoneDisplay}`,
      href: CONTACTS.phoneHref,
      icon: <PhoneCall className="size-6" aria-hidden />,
      external: false,
    },
  ];

  return (
    <footer className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollView>
          <Link
            href="/#home"
            aria-label={t.header.homeLabel}
            className="mx-auto block size-fit rounded-md"
          >
            <Logo />
          </Link>
        </ScrollView>
        <ScrollView stagger delay={0.1}>
          <ul className="my-8 flex flex-wrap justify-center gap-6 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.key}>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      filter: "blur(0px)",
                    },
                  }}
                >
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary block rounded-sm duration-150"
                  >
                    <span>{t.header.nav[link.key]}</span>
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>
        </ScrollView>
        <ScrollView delay={0.15} viewMargin="0px 0px -20px 0px">
          <ul
            className="my-8 flex flex-wrap justify-center gap-6 text-sm"
            aria-label={t.footer.social}
          >
            {socials.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  {...(s.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  aria-label={s.label}
                  className="text-muted-foreground hover:text-primary block rounded-sm"
                >
                  {s.icon}
                </a>
              </li>
            ))}
          </ul>
        </ScrollView>
        <ScrollView delay={0.2} viewMargin="0px 0px -20px 0px">
          <p className="text-muted-foreground text-center text-sm">
            © {new Date().getFullYear()} {t.footer.rights} ·{" "}
            <a href={CONTACTS.phoneHref} className="hover:text-primary rounded-sm">
              {CONTACTS.phoneDisplay}
            </a>
          </p>
        </ScrollView>
      </div>
    </footer>
  );
}

export default memo(FooterSection);
