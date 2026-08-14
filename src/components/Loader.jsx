export default function Loader({ label = "loading" }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-2">
      <p className="font-mono text-sm text-muted">
        {label}
        <span className="animate-blink">_</span>
      </p>
    </div>
  );
}
