import BlogCard from "../components/BlogCard";
import { CardSkeleton, EmptyState, ErrorState } from "../components/ui/AsyncStates";
import PageHeader from "../components/ui/PageHeader";
import useApiResource from "../hooks/useApiResource";

export default function Blog() {
  const { data: posts, loading, error, reload } = useApiResource("/blogs", []);

  return (
    <>
      <PageHeader
        eyebrow="Developer journal"
        title="Notes from building."
        description="Practical lessons, technical walkthroughs, and observations from the craft of full-stack development."
      />
      <section className="container-shell pb-24">
        {loading && <CardSkeleton count={6} />}
        {!loading && error && <ErrorState message={error} onRetry={reload} />}
        {!loading && !error && !posts.length && (
          <EmptyState
            title="No articles published yet"
            description="New writing from the dashboard will appear here."
          />
        )}
        {!loading && !error && posts.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard post={post} key={post._id} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
