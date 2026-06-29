import { DEFAULT_SKILL_ICON, getCapabilityLabel, SKILL_ICONS } from "../data/skills";

export default function SkillMark({ skill, categoryMeta, compact = false }) {
  const Icon = SKILL_ICONS[skill.name?.toLowerCase()] || DEFAULT_SKILL_ICON;

  return (
    <div
      className={`group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-ink-950/45 transition duration-200 hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.045] ${
        compact ? "p-2.5" : "p-3"
      }`}
    >
      <span
        className={`grid shrink-0 place-items-center rounded-lg ${categoryMeta.badge} ${
          compact ? "size-8" : "size-10"
        }`}
      >
        <Icon className={compact ? "size-4" : "size-5"} aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className={`block truncate font-medium text-white ${compact ? "text-xs" : "text-sm"}`}>
          {skill.name}
        </span>
        {!compact && (
          <span className="mt-0.5 block text-[0.67rem] font-semibold uppercase tracking-[0.14em] text-slate-500">
            {getCapabilityLabel(skill.level)}
          </span>
        )}
      </span>
    </div>
  );
}
