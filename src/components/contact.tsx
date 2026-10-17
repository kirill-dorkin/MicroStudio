"use client";
import React from "react";
import { ArrowUpRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ScrollView } from "./scroll-view";
import { SocialIcon } from "./social-icon";
import { useLanguage } from "./language-provider";
import { CONTACTS, whatsappLink } from "@/lib/contacts";
import {
  SERVICE_IDS,
  onServiceSelected,
  type ServiceId,
} from "@/lib/service-select";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<"service" | "task", string>>;

export default function ContactSection() {
  const { t } = useLanguage();
  const f = t.contact.form;
  const [service, setService] = React.useState<ServiceId | "">("");
  const [business, setBusiness] = React.useState("");
  const [task, setTask] = React.useState("");
  const [errors, setErrors] = React.useState<Errors>({});
  const [openedUrl, setOpenedUrl] = React.useState<string | null>(null);
  const serviceRef = React.useRef<HTMLSelectElement>(null);
  const taskRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(
    () =>
      onServiceSelected((id) => {
        setService(id);
        setErrors((prev) => ({ ...prev, service: undefined }));
      }),
    []
  );

  const buildMessage = () => {
    const m = t.contact.message;
    const lines = [
      m.greeting,
      "",
      `${m.service}: ${service ? t.contact.services[service] : ""}`,
    ];
    if (business.trim()) lines.push(`${m.business}: ${business.trim()}`);
    lines.push(`${m.task}: ${task.trim()}`);
    return lines.join("\n");
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: Errors = {};
    if (!service) next.service = f.errors.service;
    if (!task.trim()) next.task = f.errors.task;
    setErrors(next);
    if (next.service) return serviceRef.current?.focus();
    if (next.task) return taskRef.current?.focus();

    const url = whatsappLink(buildMessage());
    setOpenedUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const channels = [
    {
      key: "whatsapp",
      label: t.contact.channels.whatsapp,
      value: CONTACTS.phoneDisplay,
      href: CONTACTS.whatsappHref,
      icon: <SocialIcon name="whatsapp" />,
      external: true,
    },
    {
      key: "phone",
      label: t.contact.channels.phone,
      value: CONTACTS.phoneDisplay,
      href: CONTACTS.phoneHref,
      icon: <PhoneCall className="size-5" aria-hidden />,
      external: false,
    },
    {
      key: "instagram",
      label: t.contact.channels.instagram,
      value: CONTACTS.instagramHandle,
      href: CONTACTS.instagramHref,
      icon: <SocialIcon name="instagram" />,
      external: true,
    },
  ];

  return (
    <section
      className="py-16 md:py-32 bg-gray-50 dark:bg-transparent"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-12 lg:grid-cols-5 lg:gap-24">
          <div className="lg:col-span-2">
            <div className="md:pr-6 lg:pr-0">
              <ScrollView>
                <h2
                  id="contact-title"
                  className="text-balance text-4xl font-semibold lg:text-5xl"
                >
                  {t.contact.title}
                </h2>
              </ScrollView>
              <ScrollView>
                <p className="mt-6 text-pretty">{t.contact.subtitle}</p>
              </ScrollView>
            </div>
            <ScrollView delay={0.2}>
              <ul className="mt-8 divide-y border-y">
                {channels.map((c) => (
                  <li key={c.key}>
                    <a
                      href={c.href}
                      {...(c.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      aria-label={`${c.label}: ${c.value}${c.external ? ` (${t.common.newTab})` : ""}`}
                      className="hover:text-accent-foreground group flex items-center gap-3 rounded-sm py-3"
                    >
                      {c.icon}
                      <span className="text-muted-foreground w-24 shrink-0 text-sm">
                        {c.label}
                      </span>
                      <span className="font-medium">{c.value}</span>
                      {c.external && (
                        <>
                          <ArrowUpRight
                            className="ml-auto size-4 opacity-50 transition-opacity group-hover:opacity-100"
                            aria-hidden
                          />
                        </>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </ScrollView>
          </div>
          <div className="lg:col-span-3">
            <ScrollView>
              <Card className="mx-auto mt-4 w-full max-w-lg p-8 shadow-md sm:p-12 md:mt-12">
                <div>
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                  <p className="mt-4 text-sm">{f.description}</p>
                </div>

                <form
                  noValidate
                  onSubmit={onSubmit}
                  className="mt-6 space-y-6 *:space-y-3"
                >
                  <div>
                    <Label htmlFor="contact-service">{f.service}</Label>
                    <div className="relative">
                      <select
                        ref={serviceRef}
                        id="contact-service"
                        name="service"
                        value={service}
                        onChange={(e) => {
                          setService(e.target.value as ServiceId);
                          setErrors((prev) => ({ ...prev, service: undefined }));
                        }}
                        aria-invalid={errors.service ? true : undefined}
                        aria-describedby={errors.service ? "contact-service-error" : undefined}
                        className={cn(
                          "border-input dark:bg-input/30 h-11 w-full cursor-pointer appearance-none rounded-md border bg-transparent px-3 pr-10 text-base shadow-xs outline-none transition-[color,box-shadow] md:text-sm",
                          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                          "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
                          !service && "text-muted-foreground"
                        )}
                      >
                        <option value="" disabled>
                          {f.servicePlaceholder}
                        </option>
                        {SERVICE_IDS.map((id) => (
                          <option key={id} value={id} className="text-foreground">
                            {t.contact.services[id]}
                          </option>
                        ))}
                      </select>
                      <svg
                        aria-hidden
                        viewBox="0 0 24 24"
                        className="text-muted-foreground pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                    {errors.service && (
                      <p id="contact-service-error" className="text-destructive text-sm">
                        {errors.service}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="contact-business">
                      {f.business}
                      <span className="text-muted-foreground font-normal">
                        ({f.optional})
                      </span>
                    </Label>
                    <Input
                      id="contact-business"
                      name="business"
                      autoComplete="organization"
                      className="h-11"
                      placeholder={f.businessPlaceholder}
                      value={business}
                      onChange={(e) => setBusiness(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="contact-task">{f.task}</Label>
                    <Textarea
                      ref={taskRef}
                      id="contact-task"
                      name="task"
                      rows={4}
                      className="min-h-28"
                      placeholder={f.taskPlaceholder}
                      value={task}
                      onChange={(e) => {
                        setTask(e.target.value);
                        if (e.target.value.trim())
                          setErrors((prev) => ({ ...prev, task: undefined }));
                      }}
                      aria-invalid={errors.task ? true : undefined}
                      aria-describedby={errors.task ? "contact-task-error" : undefined}
                    />
                    {errors.task && (
                      <p id="contact-task-error" className="text-destructive text-sm">
                        {errors.task}
                      </p>
                    )}
                  </div>

                  <div>
                    <Button type="submit" size="lg" className="w-full rounded-xl sm:w-auto">
                      <SocialIcon name="whatsapp" className="size-4" />
                      {f.submit}
                    </Button>
                    <div aria-live="polite" className="text-sm">
                      {openedUrl && (
                        <p className="text-muted-foreground">
                          {f.opened}{" "}
                          <span>{f.notOpened} </span>
                          <a
                            href={openedUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground font-medium underline underline-offset-4"
                          >
                            {f.openManually}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                </form>

                <p className="text-muted-foreground border-t pt-6 text-sm">
                  {f.fallback}{" "}
                  <a
                    href={CONTACTS.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground font-medium underline-offset-4 hover:underline"
                  >
                    WhatsApp {CONTACTS.phoneDisplay}
                  </a>
                </p>
              </Card>
            </ScrollView>
          </div>
        </div>
      </div>
    </section>
  );
}
