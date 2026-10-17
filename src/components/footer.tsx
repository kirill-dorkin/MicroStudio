import Link from "next/link";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { Logo } from "./logo";
import { STUDIO } from "@/content/studio";
import { NAV_LINKS } from "@/content/nav";
export default function FooterSection() {
  return (
    <footer className="studio-footer shell">
      <div className="footer-main">
        <Link
          href="/"
          className="studio-brand"
          aria-label="MicroStudio — главная"
        >
          <Logo />
          <span>
            micro<span>studio</span>
          </span>
        </Link>
        <p>
          Сайты. Реклама. Развитие.
          <br />
          <span>С вниманием к вашему бизнесу.</span>
        </p>
        <a href={STUDIO.whatsapp} target="_blank" rel="noopener noreferrer">
          Начнём с разговора <ArrowUpRight size={23} />
        </a>
      </div>
      <div className="footer-nav">
        {NAV_LINKS.map((link) => (
          <Link href={link.href} key={link.href}>
            {link.title}
          </Link>
        ))}
        <a href={STUDIO.instagram} target="_blank" rel="noopener noreferrer">
          Instagram <ArrowUpRight size={13} />
        </a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} MicroStudio</span>
        <span>Кыргызстан · Работаем онлайн</span>
        <Link href="/#home">
          Наверх <ArrowUp size={13} />
        </Link>
      </div>
    </footer>
  );
}
