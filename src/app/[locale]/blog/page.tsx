import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/config/site";
import { fmt, getDictionary } from "@/content/locales";
import { getPosts, getSeo } from "@/lib/content";
import { formatDate, href } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { readingTime } from "@/lib/reading-time";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CtaBand } from "@/components/sections/cta-band";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, path: "/blog", og: "blog", ...getSeo("blog", locale)! });
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const posts = getPosts(locale);

  return (
    <>
      <section className="container-page page-top pb-10">
        <Breadcrumbs
          label={t.common.breadcrumbs}
          items={[
            { name: t.common.home, href: href(locale) },
            { name: t.nav.blog, href: href(locale, "/blog") },
          ]}
        />
        <p className="eyebrow mb-5">{t.blog.eyebrow}</p>
        <h1 className="h1 max-w-4xl">{t.blog.title}</h1>
        <p className="lead mt-6 max-w-2xl">{t.blog.lead}</p>
      </section>

      <section aria-label={t.blog.title} className="container-page pb-16">
        <ul className="border-t border-line">
          {posts.map((post, i) => (
            <li key={post.slug} className="group relative border-b border-line">
              <article className="grid gap-3 py-8 md:grid-cols-[3rem_1fr_auto] md:gap-8">
                <span className="font-display text-sm font-semibold tabular-nums text-subtle group-hover:text-lime">
                  0{i + 1}
                </span>
                <div>
                  <p className="text-sm text-subtle">
                    {t.blog.categories[post.category]} · <time dateTime={post.date}>{formatDate(post.date, locale)}</time> ·{" "}
                    {fmt(t.blog.minutes, { count: readingTime(post.slug) })}
                  </p>
                  <h2 className="mt-2 max-w-3xl font-display text-[1.4rem] font-bold leading-tight tracking-[-0.02em] md:text-[1.75rem]">
                    <Link
                      href={href(locale, `/blog/${post.slug}`)}
                      className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-lime"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 max-w-2xl text-muted">{post.description}</p>
                </div>
                <span aria-hidden="true" className="hidden size-12 items-center justify-center rounded-full border border-line text-muted transition-all group-hover:border-lime group-hover:bg-lime group-hover:text-bg md:inline-flex">
                  <ArrowUpRight className="size-5" />
                </span>
              </article>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand locale={locale} location="blog" title={t.blog.ctaTitle} body={t.blog.ctaBody} />
    </>
  );
}
