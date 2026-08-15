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
  return LANG_DOTS[skill?.toLowerCase?.()] || "#7C5CFC";
}

export default function DevCard({ user, onIgnore, onInterested, busy, exiting }) {
  const { firstName, lastName, age, gender, about, skills, photoUrl } = user || {};

  return (
    <div
      className={
        "relative w-full max-w-sm " +
        (exiting === "approve"
          ? "animate-swipe-approve"
          : exiting === "reject"
          ? "animate-swipe-reject"
          : "animate-card-in")
      }
    >
      <div className="panel relative aspect-[3/4] w-full overflow-hidden">
        <img
          src={photoUrl}
          alt={firstName}
          referrerPolicy="no-referrer"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-scrim" />

        <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-emerald backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
          Open to connect
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <h3 className="flex items-baseline gap-2 font-display text-2xl font-extrabold drop-shadow-sm">
            {firstName} {lastName}
            {age ? <span className="font-display text-xl font-semibold text-white/85">{age}</span> : null}
          </h3>
          {gender ? <p className="mt-0.5 text-sm text-white/75">{gender}</p> : null}

          <p className="mt-2.5 line-clamp-2 text-[14.5px] leading-relaxed text-white/90">
            {about || "This developer hasn't written a bio yet."}
          </p>

          {!!skills?.length && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {skills.slice(0, 6).map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-xs font-mono text-white backdrop-blur"
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: dotColor(s) }} />
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-6">
        <button className="fab-reject" onClick={onIgnore} disabled={busy} aria-label="Pass">
          ✕
        </button>
        <button className="fab-approve" onClick={onInterested} disabled={busy} aria-label="Interested">
          ♥
        </button>
      </div>
    </div>
  );
}
