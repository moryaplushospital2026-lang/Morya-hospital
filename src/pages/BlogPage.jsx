import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PageBanner } from "@/components/site/PageBanner";
import { blogPosts } from "@/data/blogs";
import { usePageMeta } from "@/lib/usePageMeta";
import { mapBlog, usePublicList } from "@/services/content";
import blogBanner from "@/assets/images/hero-hospital.jpg";

export function BlogPage() {
  const posts = usePublicList("/blogs", blogPosts, mapBlog);

  usePageMeta(
    "Healthcare Blog | Moryaplus Multi Speciality Hospital, Kunjirwadi Pune",
    "Read SEO-friendly healthcare blogs from Morya Plus Hospital on emergency care, preventive health checkups, and women and child healthcare in Kunjirwadi, Pune.",
    {
      path: "/blog",
      keywords:
        "healthcare blog Kunjirwadi, hospital health tips Pune, emergency care blog Pune, preventive health checkup Kunjirwadi, women and child healthcare Pune",
      schema: {
        "@type": "Blog",
        name: "Morya Plus Hospital Healthcare Blog",
        url: "https://moryaplushospital.com/blog",
        publisher: {
          "@id": "https://moryaplushospital.com/#hospital",
        },
      },
    },
  );

  return (
    <>
      <PageBanner
        title="Healthcare Blog"
        subtitle="Helpful, patient-focused articles on emergency care, preventive health, and family wellness in Kunjirwadi, Pune."
        image={blogBanner}
        crumbs={[{ label: "Blog" }]}
      />

      <section className="container-x py-16 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">
            Health Insights
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
            Expert-backed blogs for patients and families
          </h2>
          <p className="mt-4 text-muted-foreground">
            Explore practical healthcare articles written to answer common patient questions and
            help local families make informed treatment decisions.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="overflow-hidden rounded-[2rem] border border-border/70 bg-white shadow-card"
            >
              <img
                src={post.image || blogBanner}
                alt={post.imageAlt}
                className={`h-52 w-full object-cover ${post.imageClassName || "object-center"}`}
              />
              <div className="p-7">
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                    {post.category}
                  </span>
                  <span className="text-sm text-muted-foreground">{post.readTime}</span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold text-foreground">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="mt-5 inline-flex items-center gap-2 font-semibold text-brand hover:text-teal"
                >
                  Read article <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
