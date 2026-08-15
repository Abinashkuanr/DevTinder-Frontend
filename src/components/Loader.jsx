export default function Loader({ label = "loading" }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3">
      <span className="animate-heartbeat text-3xl text-flame">♥</span>
      <p className="text-sm font-medium text-muted">{label}…</p>
    </div>
  );
}
