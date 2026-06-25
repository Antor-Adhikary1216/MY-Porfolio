import { ArrowUpRight, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const formatDate = (date) => {
  if (!date) return "Recently published";
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
};

export default function BlogCard({ post }) {
  const tags = Array.isArray(post.tags) ? post.tags : [];

  return (
    <motion.article
      whileHover={{ y: -5 }}
      className="glass-card group flex h-full flex-col overflow-hidden rounded-2xl"
    >
      {post.coverImageUrl ? (
        <img src={post.coverImageUrl} alt="" className="h-44 w-full object-cover" />
      ) : (
        <div className="h-44 bg-gradient-to-br from-purple-500/15 via-blue-500/12 to-cyan-400/10" />
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <CalendarDays className="size-3.5" aria-hidden="true" />
          {formatDate(post.publishedAt)}
        </div>
        <h2 className="mt-3 text-xl font-semibold text-white">{post.title}</h2>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-slate-400">{post.excerpt}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <span className="text-xs text-blue-300" key={tag}>
              #{tag}
            </span>
          ))}
        </div>
        <Link
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-accent"
          to={`/blog/${post._id}`}
        >
          Read article
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </motion.article>
  );
}
