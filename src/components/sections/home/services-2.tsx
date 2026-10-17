import { ArrowUpRight, Code2, MousePointer2, ScanLine } from "lucide-react";
import { SERVICES, whatsappLink } from "@/content/studio";
const icons = [Code2, ScanLine, MousePointer2];
export default function ServicesSection() {
  return (
    <section className="studio-services section-pad" id="services">
      <div className="shell">
        <div className="section-top">
          <div>
            <p className="studio-eyebrow">02 / ЧЕМ ПОМОЖЕМ</p>
            <h2>
              Точка роста —<br />
              <span className="quiet">у каждого своя.</span>
            </h2>
          </div>
          <p>
            Запускаете новое дело или развиваете готовый проект? Начнём с вашей
            ситуации.
          </p>
        </div>
        <div className="studio-service-grid">
          {SERVICES.map((service, index) => {
            const Icon = icons[index];
            return (
              <article className="studio-service" key={service.id}>
                <div className="service-top">
                  <span>{service.number}</span>
                  <Icon size={25} strokeWidth={1.2} />
                </div>
                <span className="service-tag">{service.tag}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-features">
                  {service.features.map((feature) => (
                    <span key={feature}>{feature}</span>
                  ))}
                </div>
                <a
                  href={whatsappLink(service.id)}
                  className="service-cta"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Обсудить задачу <ArrowUpRight size={20} />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
