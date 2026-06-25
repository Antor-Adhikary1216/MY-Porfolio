import { ArrowLeft, CalendarDays } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { ErrorState, PageLoader } from "../components/ui/AsyncStates";
import useApiResource from "../hooks/useApiResource";

const formatDate = (date) =>
  date
    ? new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(date))
    : "Recently published";

export default function BlogDetails() {
  const { id } = useParams();
  const { data: post, loading, error, reload } = useApiResource(`/blogs/${id}`, null);

  if (loading) return <div className="container-shell pt-28"><PageLoader label="Loading article..." /></div>;
  if (error) {
    return (
      <div className="container-shell pb-24 pt-32">
        <ErrorState message={error} onRetry={reload} />
      </div>
    );
  }
  if (!post) return null;

  const paragraphs = String(post.content || "")
    .split(/\n\s*\n/)
    .filter(Boolean);

  return (
    <article className="container-shell pb-24 pt-32 sm:pt-40">
      <div className="mx-auto max-w-3xl">
        <Link
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-cyan-accent"
          to="/blog"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to journal
        </Link>
        <div className="mt-10 flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays className="size-4" aria-hidden="true" />
          {formatDate(post.publishedAt)}
        </div>
        <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-400">{post.excerpt}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {(post.tags || []).map((tag) => (
            <span className="rounded-full bg-blue-400/8 px-3 py-1 text-xs text-blue-200" key={tag}>
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {post.coverImageUrl && (
        <img
          src={post.coverImageUrl}
          alt=""
          className="mx-auto mt-10 max-h-[34rem] w-full max-w-5xl rounded-[2rem] object-cover"
        />
      )}

      <div className="prose-content glass-card mx-auto mt-10 max-w-3xl rounded-2xl p-7 text-[1.05rem] leading-8 text-slate-300 sm:p-10">
        {paragraphs.map((paragraph, index) => (
          <p key={`${paragraph.slice(0, 20)}-${index}`}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
