import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosSecure from "../api/axiosSecure";
import { getErrorMessage, getPayload } from "../api/response";
import { PageLoader } from "../components/ui/AsyncStates";
import FormShell from "./FormShell";

const emptyProject = {
  title: "",
  summary: "",
  description: "",
  technologies: "",
  imageUrl: "",
  liveUrl: "",
  githubUrl: "",
  featured: false,
};

export default function AddProject() {
  const { id } = useParams();
  const editing = Boolean(id);
  const [form, setForm] = useState(emptyProject);
  const [loading, setLoading] = useState(editing);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ success: "", error: "" });

  useEffect(() => {
    if (!id) return;
    axiosSecure
      .get(`/projects/${id}`)
      .then((response) => {
        const project = getPayload(response, {});
        setForm({
          ...emptyProject,
          ...project,
          technologies: (project.technologies || []).join(", "),
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
      technologies: form.technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    try {
      if (editing) {
        await axiosSecure.patch(`/projects/${id}`, payload);
      } else {
        await axiosSecure.post("/projects", payload);
        setForm(emptyProject);
      }
      setStatus({
        success: editing ? "Project updated successfully." : "Project added successfully.",
        error: "",
      });
    } catch (error) {
      setStatus({ success: "", error: getErrorMessage(error) });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <PageLoader label="Loading project..." />;

  return (
    <FormShell
      title={editing ? "Update project" : "Add a new project"}
      description="Share the problem, implementation, links, and technologies behind the work."
      backTo="/dashboard/projects"
      onSubmit={handleSubmit}
      submitting={submitting}
      success={status.success}
      error={status.error}
      submitLabel={editing ? "Update project" : "Add project"}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Project title" value={form.title} onChange={(value) => update("title", value)} required />
        <Field label="Image URL" type="url" value={form.imageUrl} onChange={(value) => update("imageUrl", value)} />
      </div>
      <Field label="Short summary" value={form.summary} onChange={(value) => update("summary", value)} required />
      <TextArea label="Full description" value={form.description} onChange={(value) => update("description", value)} required />
      <Field label="Technologies (comma separated)" value={form.technologies} onChange={(value) => update("technologies", value)} required />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Live URL" type="url" value={form.liveUrl} onChange={(value) => update("liveUrl", value)} />
        <Field label="GitHub URL" type="url" value={form.githubUrl} onChange={(value) => update("githubUrl", value)} />
      </div>
      <label className="flex items-center gap-3 text-sm text-slate-300">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(event) => update("featured", event.target.checked)}
          className="size-4 accent-cyan-400"
        />
        Feature this project on the home page
      </label>
    </FormShell>
  );
}

function Field({ label, value, onChange, type = "text", required = false }) {
  return (
    <label className="block text-sm text-slate-300">
      {label}
      <input className="field mt-2" type={type} value={value || ""} onChange={(event) => onChange(event.target.value)} required={required} />
    </label>
  );
}

function TextArea({ label, value, onChange, required = false }) {
  return (
    <label className="block text-sm text-slate-300">
      {label}
      <textarea className="field mt-2 min-h-40" value={value || ""} onChange={(event) => onChange(event.target.value)} required={required} />
    </label>
  );
}
