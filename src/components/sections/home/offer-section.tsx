import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { whatsappLink } from "@/content/studio";
export default function OfferSection() {
  return (
    <section id="offer" className="studio-offer section-pad">
      <div className="shell offer-layout">
        <div className="offer-copy">
          <p className="studio-eyebrow">04 / ДЛЯ ПЕРВОГО ШАГА</p>
          <h2>
            Начните просто.
            <br />
            <span className="quiet">Развивайте дальше.</span>
          </h2>
          <p>
            Нужна страница с услугами и контактами? Необязательно начинать с
            большого проекта.
          </p>
          <div className="offer-detail">
            <Sparkles size={23} strokeWidth={1.2} />
            <p>
              Нужны запись, каталог или другие функции?
              <br />
              <b>Подберём состав под ваш бизнес.</b>
            </p>
          </div>
        </div>
        <article className="studio-price-card">
          <div className="price-card-top">
            <span>ОДНОСТРАНИЧНЫЙ САЙТ</span>
            <span className="live-dot" />
          </div>
          <div className="studio-price">
            1 500 <span>сом</span>
          </div>
          <p>
            Всё главное о вас.
            <br />
            На одной странице.
          </p>
          <ul>
            {[
              "Готовая основа с вашими материалами",
              "Услуги, предложение и контакты",
              "Адаптация для телефона",
              "Кнопка звонка или мессенджера",
            ].map((item) => (
              <li key={item}>
                <Check size={15} />
                {item}
              </li>
            ))}
          </ul>
          <a
            className="studio-button button-solid"
            href={whatsappLink("basic")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Хочу обсудить этот вариант <ArrowUpRight size={19} />
          </a>
          <small>
            Состав согласуем до начала. Домен, дополнительные функции, настройка
            рекламы и рекламный бюджет — отдельно. Поддержка по желанию.
          </small>
        </article>
      </div>
    </section>
  );
}
