import { ArrowUpRight, Check, MapPin, Monitor, Phone } from "lucide-react";
function ProjectPreview() {
  return (
    <div
      className="project-preview"
      aria-label="Оформленная презентация сайта BestElectronics"
    >
      <span className="project-giant" aria-hidden="true">
        BE.
      </span>
      <div className="project-browser">
        <div className="project-browser-bar">
          <span>
            <i />
            <i />
            <i />
          </span>
          <span>be-lending.vercel.app</span>
          <ArrowUpRight size={10} />
        </div>
        <div className="project-page">
          <div className="project-brand">
            <b>BE</b>
            <span>
              BestElectronics<small>Сервисный центр · Бишкек</small>
            </span>
          </div>
          <div className="project-page-hero">
            <span>РЕМОНТ И ОБСЛУЖИВАНИЕ</span>
            <h3>
              Нужна помощь
              <br />с техникой?
            </h3>
            <p>Позвоните или напишите нам в WhatsApp.</p>
            <div className="project-buttons">
              <span>
                <Phone size={11} /> Позвонить
              </span>
              <span>WhatsApp ↗</span>
            </div>
          </div>
          <div className="project-mini-grid">
            <div>
              <Monitor size={18} />
              <b>Ноутбуки</b>
              <span>Ремонт и диагностика</span>
            </div>
            <div>
              <Monitor size={18} strokeWidth={1.4} />
              <b>Компьютеры</b>
              <span>Настройка и апгрейд</span>
            </div>
          </div>
          <div className="project-address">
            <MapPin size={10} /> Бишкек, Кулатова 8/1 <span>→</span>
          </div>
        </div>
      </div>
      <div className="project-mobile">
        <span className="phone-island" />
        <div className="phone-brand">
          BE <span>BestElectronics</span>
        </div>
        <b className="phone-title">
          Нужна
          <br />
          помощь
          <br />с техникой?
        </b>
        <p>
          Выберите удобный
          <br />
          способ связаться с нами.
        </p>
        <span className="phone-blue">Позвонить ↗</span>
        <span className="phone-green">WhatsApp ↗</span>
        <div className="phone-location">
          Мы в Бишкеке
          <br />
          <b>Кулатова 8/1</b>
        </div>
      </div>
      <span className="project-device-label">DESKTOP + MOBILE ↗</span>
    </div>
  );
}
export default function PortfolioSection() {
  return (
    <section id="portfolio" className="studio-portfolio shell section-pad">
      <div className="section-top">
        <div>
          <p className="studio-eyebrow">03 / ПОСМОТРИТЕ В ДЕЛЕ</p>
          <h2>
            Вместо обещаний —<br />
            <span className="quiet">реальный сайт.</span>
          </h2>
        </div>
        <a
          className="small-arrow-link"
          href="https://be-lending.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Открыть проект <ArrowUpRight size={19} />
        </a>
      </div>
      <div className="project-case">
        <ProjectPreview />
        <div className="project-summary">
          <div className="case-meta">
            <span>СЕРВИСНЫЙ ЦЕНТР</span>
            <span>01 / ЛЕНДИНГ</span>
          </div>
          <h3>BestElectronics</h3>
          <p>
            Когда техника не работает, человеку нужно быстро понять: помогут ли
            здесь и как связаться.
          </p>
          <ul>
            <li>
              <Check size={15} /> Услуги на одной странице
            </li>
            <li>
              <Check size={15} /> Звонок и WhatsApp в один шаг
            </li>
            <li>
              <Check size={15} /> Адрес и просмотр с телефона
            </li>
          </ul>
          <a
            className="studio-button button-solid"
            href="https://be-lending.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Посмотреть сайт <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
      <p className="project-footnote">
        Изображение — презентация проекта. По ссылке открывается работающий
        сайт.
      </p>
    </section>
  );
}
