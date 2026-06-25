import ResourceTable from "./ResourceTable";

export default function ManageBlogs() {
  return (
    <ResourceTable
      title="Manage blogs"
      description="Edit or remove articles from your developer journal."
      endpoint="/blogs"
      addTo="/dashboard/blogs/new"
      editBase="/dashboard/blogs"
      itemLabel="article"
      renderMeta={(post) =>
        post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "No publish date"
      }
    />
  );
}
