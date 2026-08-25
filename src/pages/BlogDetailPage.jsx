import { ArrowLeft, CalendarCheck, Clock3, MapPin, Phone, Siren } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { PageBanner } from "@/components/site/PageBanner";
import { site } from "@/data/site";
import { getBlogPost } from "@/data/blogs";
import { getAbsoluteUrl, siteUrl, usePageMeta } from "@/lib/usePageMeta";
import { mapBlog, usePublicItem } from "@/services/content";
import { NotFoundPage } from "@/pages/NotFoundPage";
import blogBanner from "@/assets/images/hero-hospital.jpg";

export function BlogDetailPage() {
  const { slug } = useParams();
  const [post, loaded] = usePublicItem(`/blogs/${slug}`, getBlogPost(slug), mapBlog);

  usePageMeta(
    post
      ? `${post.title} | Moryaplus Multi Speciality Hospital`
      : "Blog Not Found | Moryaplus Multi Speciality Hospital",
    post?.description || site.description,
    {
      path: post ? `/blog/${post.slug}` : "/blog",
      keywords: post
        ? `${post.title}, ${post.category} Kunjirwadi, hospital blog Pune, Morya Plus Hospital blog, healthcare tips Pune`
        : undefined,
      image: post?.image,
      type: "article",
      noindex: !post && loaded,
      schema: post
        ? {
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description || post.excerpt,
            image: post.image ? getAbsoluteUrl(post.image) : undefined,
            author: {
              "@id": `${siteUrl}/#hospital`,
            },
            publisher: {
              "@id": `${siteUrl}/#hospital`,
            },
            mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
          }
        : undefined,
    },
  );

  if (!post && loaded) {
    return <NotFoundPage />;
  }

  if (!post) return null;

  return (
    <>
      <PageBanner
        title={post.title}
        subtitle={post.excerpt}
        image={post.image || blogBanner}
        crumbs={[{ label: "Blog", to: "/blog" }, { label: post.category }]}
        imageClassName="object-center"
      />

      <section className="container-x py-16 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-brand transition hover:bg-brand-soft"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="mt-6 overflow-hidden rounded-[2rem] border border-border/70 bg-white shadow-card">
            <img
              src={post.image || blogBanner}
              alt={post.imageAlt}
              className={`h-[260px] w-full object-cover sm:h-[340px] lg:h-[420px] ${post.imageClassName || "object-center"}`}
            />

            <div className="p-8 md:p-10">
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="rounded-full bg-brand-soft px-3 py-1 font-semibold text-brand">
                  {post.category}
                </span>
                <span>{post.readTime}</span>
              </div>

              <h1 className="mt-4 font-display text-3xl font-bold text-foreground md:text-5xl">
                {post.title}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-foreground/80">{post.excerpt}</p>

              <div className="mt-8 space-y-5 text-base leading-8 text-muted-foreground">
                {post.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x pb-16">
        <div className="overflow-hidden rounded-[2rem] shadow-soft">
          <div className="grid gap-8 bg-gradient-to-r from-brand to-teal p-8 text-white md:p-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/75">
                Need Medical Guidance?
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
                Connect with our hospital team today
              </h2>
              <p className="mt-4 max-w-2xl text-white/90">
                If you need emergency support, specialist consultation, or a preventive health
                checkup, our team is ready to help you choose the right next step.
              </p>
            </div>

            <div className="rounded-3xl bg-white/12 p-6 backdrop-blur-sm">
              <div className="space-y-3 text-sm text-white/90">
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Reception: {site.phones.reception}
                </p>
                <p className="flex items-center gap-2">
                  <Siren className="h-4 w-4" />
                  Emergency: {site.phones.emergency}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {site.address.locality}
                </p>
                <p className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4" />
                  {site.hours.opd}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-brand"
                >
                  <CalendarCheck className="h-4 w-4" />
                  Contact Us
                </Link>
                <a
                  href={site.maps.profile}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/35 px-5 py-3 font-semibold text-white"
                >
                  <MapPin className="h-4 w-4" />
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
