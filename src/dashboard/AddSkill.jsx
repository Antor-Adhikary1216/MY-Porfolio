import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosSecure from "../api/axiosSecure";
import { getErrorMessage, getPayload } from "../api/response";
import { PageLoader } from "../components/ui/AsyncStates";
import FormShell from "./FormShell";

const emptySkill = { name: "", category: "frontend", level: 80 };

export default function AddSkill() {
  const { id } = useParams();
  const editing = Boolean(id);
  const [form, setForm] = useState(emptySkill);
  const [loading, setLoading] = useState(editing);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ success: "", error: "" });

  useEffect(() => {
    if (!id) return;
    axiosSecure
      .get(`/skills/${id}`)
      .then((response) => setForm({ ...emptySkill, ...getPayload(response, {}) }))
      .catch((error) => setStatus({ success: "", error: getErrorMessage(error) }))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ success: "", error: "" });

    try {
      const payload = { ...form, level: Number(form.level) };
      if (editing) {
        await axiosSecure.patch(`/skills/${id}`, payload);
      } else {
        await axiosSecure.post("/skills", payload);
        setForm(emptySkill);
      }
      setStatus({
        success: editing ? "Skill updated successfully." : "Skill added successfully.",
        error: "",
      });
    } catch (error) {
      setStatus({ success: "", error: getErrorMessage(error) });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <PageLoader label="Loading skill..." />;

  return (
    <FormShell
      title={editing ? "Update skill" : "Add a new skill"}
      description="Add technologies to the categorized skills section on your home page."
      backTo="/dashboard/skills"
      onSubmit={handleSubmit}
      submitting={submitting}
      success={status.success}
      error={status.error}
      submitLabel={editing ? "Update skill" : "Add skill"}
    >
      <label className="block text-sm text-slate-300">
        Skill name
        <input
          className="field mt-2"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          required
        />
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm text-slate-300">
          Category
          <select
            className="field mt-2"
            value={form.category}
            onChange={(event) => setForm({ ...form, category: event.target.value })}
          >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="database">Database</option>
            <option value="tools">Tools</option>
          </select>
        </label>
        <label className="block text-sm text-slate-300">
          Proficiency ({form.level}%)
          <input
            className="mt-4 w-full accent-cyan-400"
            type="range"
            min="10"
            max="100"
            value={form.level}
            onChange={(event) => setForm({ ...form, level: event.target.value })}
          />
        </label>
      </div>
    </FormShell>
  );
}
