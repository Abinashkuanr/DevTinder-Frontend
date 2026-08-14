export default function EmptyState({ glyph = "{ }", title, body }) {
  return (
    <div className="panel mx-auto flex max-w-md flex-col items-center gap-3 px-8 py-14 text-center">
      <div className="font-mono text-3xl text-line">{glyph}</div>
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      <p className="text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}
