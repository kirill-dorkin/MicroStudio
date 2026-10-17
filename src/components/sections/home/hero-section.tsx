import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import StudioBackdrop from "@/components/studio-backdrop";

export default function HeroSection() {
  return (
    <section id="home" className="studio-hero">
      <div className="hero-artwork" aria-hidden="true">
        <Image
          src="/images/abstract-1.png"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={70}
        />
        <StudioBackdrop />
        <div className="hero-artwork-wash" />
      </div>
      <div className="hero-content shell">
        <p className="studio-eyebrow hero-eyebrow">
          <span className="live-dot" /> MICROSTUDIO · САЙТЫ И РЕКЛАМА
        </p>
        <h1>
          Ваш бизнес.
          <br />
          <span>В лучшем виде.</span>
        </h1>
        <p className="hero-subtitle">
          Покажем, почему стоит выбрать вас.
          <br />
          Сайт, понятное предложение и реклама —<br className="mobile-only" />{" "}
          под задачи вашего дела.
        </p>
        <div className="studio-actions">
          <Link className="studio-button button-solid" href="#contact">
            Обсудить мой проект <ArrowUpRight size={19} />
          </Link>
          <Link className="studio-button button-outline" href="#portfolio">
            Смотреть работу <ArrowDown size={17} />
          </Link>
        </div>
        <Link href="#offer" className="hero-offer-pill">
          <span>Простой старт</span> Одностраничный сайт за 1500 сом{" "}
          <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="hero-bottom shell">
        <span>ДИЗАЙН С ХАРАКТЕРОМ. САЙТ С ПОНЯТНОЙ ЗАДАЧЕЙ.</span>
        <a href="#about" aria-label="Узнать о студии">
          <ArrowDown size={17} />
        </a>
        <span>КЫРГЫЗСТАН · РАБОТАЕМ ОНЛАЙН</span>
      </div>
    </section>
  );
}
