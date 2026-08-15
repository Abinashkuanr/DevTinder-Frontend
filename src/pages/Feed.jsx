import { useCallback, useEffect, useState } from "react";
import api from "../api/axios";
import { getErrorMessage } from "../api/getErrorMessage";
import DevCard from "../components/DevCard";
import EmptyState from "../components/EmptyState";
import Loader from "../components/Loader";

export default function Feed() {
  const [queue, setQueue] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [exiting, setExiting] = useState(null);
  const [error, setError] = useState("");

  const loadPage = useCallback(async (pageToLoad) => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/feed", { params: { page: pageToLoad, limit: 20 } });
      const data = res.data?.data || [];
      setQueue((q) => [...q, ...data]);
      setHasMore(data.length > 0);
    } catch (err) {
      setError(getErrorMessage(err, "Couldn't load the feed."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPage(1);
  }, [loadPage]);

  const current = queue[0];

  const act = async (status) => {
    if (!current || busy) return;
    setBusy(true);
    setExiting(status === "interested" ? "approve" : "reject");
    setError("");
    try {
      await api.post(`/request/send/${status}/${current._id}`);
      setTimeout(() => {
        setQueue((q) => {
          const rest = q.slice(1);
          if (rest.length === 0 && hasMore) {
            const nextPage = page + 1;
            setPage(nextPage);
            loadPage(nextPage);
          }
          return rest;
        });
        setExiting(null);
        setBusy(false);
      }, 220);
    } catch (err) {
      setError(getErrorMessage(err, "That action didn't go through."));
      setExiting(null);
      setBusy(false);
    }
  };

  useEffect(() => {
    const onKey = (e) => {
      if (!current || busy) return;
      if (e.key === "ArrowRight") act("interested");
      if (e.key === "ArrowLeft") act("ignored");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, busy]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-display text-3xl font-extrabold text-ink">Find your next collaborator</h1>
      <p className="mt-1.5 max-w-lg text-sm text-muted">
        Pass on profiles that aren't a fit, or show interest to open a connection. Use{" "}
        <kbd className="rounded-md border border-line bg-white px-1.5 py-0.5 font-mono text-xs">←</kbd> /{" "}
        <kbd className="rounded-md border border-line bg-white px-1.5 py-0.5 font-mono text-xs">→</kbd> too.
      </p>

      {error && (
        <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-rose/30 bg-rose-soft px-3.5 py-2.5 text-sm text-rose">
          {error}
        </div>
      )}

      <div className="relative mx-auto mt-8 flex min-h-[560px] max-w-sm items-start justify-center">
        {loading && queue.length === 0 ? (
          <Loader label="Fetching your feed" />
        ) : current ? (
          <div className="relative w-full">
            {/* Depth cards peeking behind the active one */}
            {queue[2] && (
              <div className="absolute inset-x-4 top-4 -z-10 aspect-[3/4] scale-[0.94] rounded-[28px] border border-line bg-white/70" />
            )}
            {queue[1] && (
              <div className="absolute inset-x-2 top-2 -z-10 aspect-[3/4] scale-[0.97] rounded-[28px] border border-line bg-white/90" />
            )}
            <DevCard
              key={current._id}
              user={current}
              busy={busy}
              exiting={exiting}
              onIgnore={() => act("ignored")}
              onInterested={() => act("interested")}
            />
            <p className="mt-4 text-center text-xs font-medium text-muted">
              {queue.length} profile{queue.length === 1 ? "" : "s"} queued
            </p>
          </div>
        ) : (
          <EmptyState
            title="You're all caught up"
            body="You've been through everyone available right now. Check back later, or review requests you've already sent."
          />
        )}
      </div>
    </div>
  );
}
