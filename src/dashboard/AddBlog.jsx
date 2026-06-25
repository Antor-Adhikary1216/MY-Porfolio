import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosSecure from "../api/axiosSecure";
import { getErrorMessage, getPayload } from "../api/response";
import { PageLoader } from "../components/ui/AsyncStates";
import FormShell from "./FormShell";

const emptyPost = {
  title: "",
  excerpt: "",
  content: "",
  coverImageUrl: "",
  tags: "",
  publishedAt: "",
};

export default function AddBlog() {
  const { id } = useParams();
  const editing = Boolean(id);
  const [form, setForm] = useState(emptyPost);
  const [loading, setLoading] = useState(editing);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ success: "", error: "" });

  useEffect(() => {
    if (!id) return;
    axiosSecure
      .get(`/blogs/${id}`)
      .then((response) => {
        const post = getPayload(response, {});
        setForm({
          ...emptyPost,
          ...post,
          tags: (post.tags || []).join(", "),
          publishedAt: post.publishedAt ? String(post.publishedAt).slice(0, 10) : "",
        });
      })
      .catch((error) => setStatus({ success: "", error: getErrorMessage(error) }))
      .finally(() => setLoading(false));
  }, [id]);

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ success: "", error: "" });
    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      publishedAt: form.publishedAt || new Date().toISOString(),
    };

    try {
      if (editing) {
        await axiosSecure.patch(`/blogs/${id}`, payload);
      } else {
        await axiosSecure.post("/blogs", payload);
        setForm(emptyPost);
      }
      setStatus({
        success: editing ? "Article updated successfully." : "Article published successfully.",
        error: "",
      });
    } catch (error) {
      setStatus({ success: "", error: getErrorMessage(error) });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <PageLoader label="Loading article..." />;

  return (
    <FormShell
      title={editing ? "Update article" : "Add a blog article"}
      description="Publish safe, plain-text articles with paragraphs separated by a blank line."
      backTo="/dashboard/blogs"
      onSubmit={handleSubmit}
      submitting={submitting}
      success={status.success}
      error={status.error}
      submitLabel={editing ? "Update article" : "Publish article"}
    >
      <label className="block text-sm text-slate-300">
        Article title
        <input className="field mt-2" value={form.title} onChange={(event) => update("title", event.target.value)} required />
      </label>
      <label className="block text-sm text-slate-300">
        Excerpt
        <textarea className="field mt-2 min-h-24" value={form.excerpt} onChange={(event) => update("excerpt", event.target.value)} required />
      </label>
      <label className="block text-sm text-slate-300">
        Article content
        <textarea className="field mt-2 min-h-72" value={form.content} onChange={(event) => update("content", event.target.value)} required />
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm text-slate-300">
          Cover image URL
          <input className="field mt-2" type="url" value={form.coverImageUrl} onChange={(event) => update("coverImageUrl", event.target.value)} />
        </label>
        <label className="block text-sm text-slate-300">
          Publish date
          <input className="field mt-2" type="date" value={form.publishedAt} onChange={(event) => update("publishedAt", event.target.value)} />
        </label>
      </div>
      <label className="block text-sm text-slate-300">
        Tags (comma separated)
        <input className="field mt-2" value={form.tags} onChange={(event) => update("tags", event.target.value)} />
      </label>
    </FormShell>
  );
}
