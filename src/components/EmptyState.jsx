export default function EmptyState({ glyph = "✦", title, body }) {
  return (
    <div className="panel mx-auto flex max-w-md flex-col items-center gap-3 px-8 py-14 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-flame-soft text-2xl text-flame">
        {glyph}
      </div>
      <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
      <p className="text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}
