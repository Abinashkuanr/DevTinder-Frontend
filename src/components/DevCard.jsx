const LANG_DOTS = {
  javascript: "#F1C40F",
  typescript: "#3B82F6",
  react: "#22D3EE",
  "node.js": "#84CC16",
  nodejs: "#84CC16",
  python: "#3776AB",
  java: "#EA580C",
  go: "#22D3EE",
  rust: "#DC7633",
  css: "#8B5CF6",
  html: "#F97316",
};

function dotColor(skill) {
  return LANG_DOTS[skill?.toLowerCase?.()] || "#6366F1";
}

export default function DevCard({ user, onIgnore, onInterested, busy, exiting }) {
  const { firstName, lastName, age, gender, about, skills, photoUrl } = user || {};
  const handle = (firstName || "dev").toLowerCase().replace(/\s+/g, "-");

  return (
    <div
      className={
        "panel w-full max-w-sm overflow-hidden " +
        (exiting === "approve"
          ? "animate-swipe-approve"
          : exiting === "reject"
          ? "animate-swipe-reject"
          : "animate-card-in")
      }
    >
      {/* PR header bar */}
      <div className="flex items-center gap-2 border-b border-line bg-titlebar px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-rose/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald/80" />
        <span className="ml-2 truncate font-mono text-xs text-white/60">
          pull-request · devtinder/{handle}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start gap-4">
          <img
            src={photoUrl}
            alt={firstName}
            referrerPolicy="no-referrer"
            className="h-16 w-16 shrink-0 rounded-xl border border-line object-cover"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="skill-chip !border-emerald/30 !bg-emerald-soft !text-emerald">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
                open
              </span>
              {age ? <span className="font-mono text-xs text-muted">age {age}</span> : null}
              {gender ? <span className="font-mono text-xs text-muted">· {gender}</span> : null}
            </div>
            <h3 className="mt-1.5 truncate font-display text-xl font-semibold text-ink">
              {firstName} {lastName}
            </h3>
          </div>
        </div>

        <p className="mt-4 line-clamp-3 text-[14.5px] leading-relaxed text-ink/80">
          {about || "This developer hasn't written a bio yet."}
        </p>

        {!!skills?.length && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {skills.slice(0, 6).map((s) => (
              <span key={s} className="skill-chip">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: dotColor(s) }}
                />
                {s}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 border-t border-line bg-paper/60 p-4">
        <button className="btn-reject" onClick={onIgnore} disabled={busy}>
          <span aria-hidden>✕</span> Request changes
        </button>
        <button className="btn-approve" onClick={onInterested} disabled={busy}>
          <span aria-hidden>✓</span> Approve
        </button>
      </div>
    </div>
  );
}
