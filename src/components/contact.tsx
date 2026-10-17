"use client";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { type FormEvent, useState } from "react";
import {
  PROJECT_TYPES,
  STUDIO,
  type ProjectType,
  whatsappLink,
} from "@/content/studio";
export default function ContactSection() {
  const [type, setType] = useState<ProjectType>("website");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    window.location.assign(
      whatsappLink(
        type,
        String(data.get("business") ?? ""),
        String(data.get("details") ?? ""),
      ),
    );
  }
  return (
    <section id="contact" className="studio-contact section-pad">
      <div className="shell contact-layout">
        <div className="studio-contact-copy">
          <p className="studio-eyebrow">
            <span className="live-dot" /> ДАВАЙТЕ НАЧНЁМ С РАЗГОВОРА
          </p>
          <h2>
            Расскажите
            <br />о <span>вашем деле.</span>
          </h2>
          <p>
            Можно без технического задания.
            <br />
            Для начала достаточно пары слов.
          </p>
          <a className="studio-contact-phone" href={STUDIO.phoneHref}>
            {STUDIO.phone}
            <ArrowUpRight size={25} />
          </a>
          <a
            className="studio-instagram"
            href={STUDIO.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            {STUDIO.instagramHandle}
            <ArrowUpRight size={15} />
          </a>
          <div className="contact-caption">
            <MessageCircle size={20} strokeWidth={1.3} />
            <span>
              Обсудим, что подойдёт именно вам.
              <br />
              Предложим варианты и объясним разницу.
            </span>
          </div>
        </div>
        <form className="studio-brief" onSubmit={submit}>
          <fieldset>
            <legend>Что вас интересует?</legend>
            <div className="studio-project-options">
              {PROJECT_TYPES.map((project) => (
                <label key={project.id}>
                  <input
                    type="radio"
                    name="projectType"
                    value={project.id}
                    checked={type === project.id}
                    onChange={() => setType(project.id)}
                  />
                  <span>{project.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <label className="studio-field" htmlFor="business">
            Чем занимаетесь? <span>необязательно</span>
          </label>
          <input
            id="business"
            name="business"
            type="text"
            maxLength={200}
            placeholder="Например, кофейня в Бишкеке"
            autoComplete="organization"
          />
          <label className="studio-field" htmlFor="details">
            Что хотите сделать? <span>необязательно</span>
          </label>
          <textarea
            id="details"
            name="details"
            maxLength={1500}
            rows={2}
            placeholder="Пара слов о задаче или ссылка на ваш сайт"
          />
          <button className="studio-button button-lime" type="submit">
            Продолжить в WhatsApp <ArrowUpRight size={20} />
          </button>
          <p className="studio-form-note">
            Откроется WhatsApp с готовым текстом.
            <br />
            Сообщение отправите вы — после проверки.
          </p>
          <noscript>
            <a href={STUDIO.whatsapp}>Написать напрямую в WhatsApp</a>
          </noscript>
        </form>
      </div>
    </section>
  );
}
