const steps = [
  {
    title: "Разбираемся в задаче",
    description:
      "Расскажите о бизнесе и клиентах. Покажите примеры, если они есть. Поможем определить, что нужно.",
  },
  {
    title: "Согласуем решение",
    description:
      "Обсудим состав, стоимость и сроки. До начала работы вы понимаете, за что платите.",
  },
  {
    title: "Собираем и запускаем",
    description:
      "Показываем сайт, проверяем детали и публикуем. Дальше можно подключить рекламу и поддержку.",
  },
];
export default function ProcessSection() {
  return (
    <section className="studio-process shell section-pad">
      <div className="section-top">
        <div>
          <p className="studio-eyebrow">05 / КАК ВСЁ ПРОЙДЁТ</p>
          <h2>
            От первого сообщения
            <br />
            <span className="quiet">до «вот ваша ссылка».</span>
          </h2>
        </div>
      </div>
      <div className="studio-steps">
        {steps.map((step, index) => (
          <article key={step.title}>
            <div>
              <span>0{index + 1}</span>
              <span aria-hidden="true">↗</span>
            </div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
