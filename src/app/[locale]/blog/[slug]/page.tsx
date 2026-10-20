import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Locale } from "@/config/site";
import { fmt, getDictionary } from "@/content/locales";
import { getService } from "@/content/services";
import { getPost, getPosts } from "@/lib/content";
import { formatDate, href, locales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd, blogPostingLd } from "@/lib/jsonld";
import { readingTime } from "@/lib/reading-time";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CtaBand } from "@/components/sections/cta-band";
import { WhatsappCta } from "@/components/ui/whatsapp-cta";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => getPosts(locale).map((p) => ({ locale, slug: p.slug })));
}

const relatedService = { websites: "websites", planning: "strategy", advertising: "marketing" } as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(locale, slug);
  if (!post) return {};
  return pageMetadata({
    locale,
    path: `/blog/${slug}`,
    alternatePaths: { ru: `/blog/${post.ruSlug}`, en: `/blog/${post.enSlug}` },
    og: `blog-${post.ruSlug}`,
    title: `${post.title} — MicroStudio`,
    description: post.description,
    type: "article",
    publishedTime: post.date,
  });
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  const post = getPost(locale, slug);
  if (!post) notFound();
  const t = getDictionary(locale);
  const { default: Content } = await import(`@/content/blog/${slug}.mdx`);
  const service = getService(locale, relatedService[post.category])!;
  const others = getPosts(locale).filter((p) => p.slug !== slug);
  const path = href(locale, `/blog/${slug}`);

  return (
    <>
      <JsonLd
        data={blogPostingLd({
          title: post.title,
          description: post.description,
          path,
          date: post.date,
          locale,
          image: `/og/blog-${post.ruSlug}-${locale}.jpg`,
        })}
      />
      <article>
        <header className="container-page page-top pb-10">
          <Breadcrumbs
            label={t.common.breadcrumbs}
            items={[
              { name: t.common.home, href: href(locale) },
              { name: t.nav.blog, href: href(locale, "/blog") },
              { name: post.title, href: path },
            ]}
          />
          <p className="text-sm text-subtle">
            {t.blog.categories[post.category]} · {t.blog.published}{" "}
            <time dateTime={post.date}>{formatDate(post.date, locale)}</time> · {fmt(t.blog.minutes, { count: readingTime(slug) })}
          </p>
          <h1 className="mt-4 max-w-[22ch] font-display text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.03em]">
            {post.title}
          </h1>
          <p className="lead mt-6 max-w-2xl">{post.description}</p>
        </header>

        <div className="container-page grid gap-12 border-t border-line pb-16 pt-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16 lg:pt-12">
          <div className="prose-ms max-w-[68ch]">
            <Content />
          </div>
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="card p-5">
              <p className="label">{t.blog.related}</p>
              <p className="mt-2 font-display text-lg font-semibold">{service.title}</p>
              <p className="mt-1.5 text-sm text-muted">{service.lead}</p>
              <Link
                href={href(locale, `/services/${service.slug}`)}
                className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-lime hover:underline"
              >
                {t.blog.relatedAction}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="rounded-[20px] border border-line p-5">
              <p className="font-semibold">{t.blog.askTitle}</p>
              <p className="mt-1.5 text-sm text-muted">{t.blog.askBody}</p>
              <WhatsappCta locale={locale} intent={{ kind: "service", slug: service.slug }} location={`blog_${post.ruSlug}`} size="sm" className="mt-4 w-full" />
            </div>
          </aside>
        </div>
      </article>

      <section aria-labelledby="other-posts" className="section-tight border-t border-line">
        <div className="container-page">
          <h2 id="other-posts" className="label">
            {t.blog.otherPosts}
          </h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={href(locale, `/blog/${o.slug}`)}
                  className="group flex h-full min-h-14 items-center justify-between gap-4 rounded-[16px] border border-line px-5 py-4 font-semibold transition-colors hover:border-line-strong hover:bg-white/[0.03]"
                >
                  {o.title}
                  <ArrowRight className="size-5 shrink-0 text-muted group-hover:text-lime" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <Link href={href(locale, "/blog")} className="mt-8 inline-flex min-h-11 items-center gap-2 text-muted hover:text-text">
            <ArrowLeft className="size-4" aria-hidden="true" />
            {t.blog.back}
          </Link>
        </div>
      </section>

      <CtaBand locale={locale} location={`blog_${post.ruSlug}`} title={t.blog.ctaTitle} body={t.blog.ctaBody} />
    </>
  );
}
