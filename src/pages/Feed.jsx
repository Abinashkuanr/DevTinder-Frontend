import { useCallback, useEffect, useRef, useState } from "react";
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

  const loadingPage = useRef(false);

  // Load feed page
  const loadPage = useCallback(async (pageToLoad) => {
    if (loadingPage.current) return;

    loadingPage.current = true;
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/feed", {
        params: {
          page: pageToLoad,
          limit: 20,
        },
      });

      const data = Array.isArray(response.data?.data)
        ? response.data.data
        : [];

      setQueue((previousQueue) => {
        if (pageToLoad === 1) {
          return data;
        }

        return [...previousQueue, ...data];
      });

      setHasMore(data.length === 20);
      setPage(pageToLoad);
    } catch (err) {
      console.error("Feed API error:", err);

      setError(
        getErrorMessage(
          err,
          "Couldn't load the feed. Please login again and try."
        )
      );
    } finally {
      setLoading(false);
      loadingPage.current = false;
    }
  }, []);

  // Load first page
  useEffect(() => {
    loadPage(1);
  }, [loadPage]);

  const current = queue[0];

  // Remove current profile and show next profile
  const removeCurrentProfile = useCallback(() => {
    setQueue((previousQueue) => {
      const remaining = previousQueue.slice(1);

      return remaining;
    });

    setExiting(null);
    setBusy(false);
  }, []);

  // Send request / ignore profile
  const act = async (status) => {
    if (!current || busy) return;

    const currentUserId = current._id;

    setBusy(true);
    setExiting(status === "interested" ? "approve" : "reject");
    setError("");

    try {
      await api.post(
        `/request/send/${status}/${currentUserId}`
      );

      // Successfully processed
      setTimeout(() => {
        removeCurrentProfile();
      }, 220);
    } catch (err) {
      console.error("Request action error:", err);

      /*
       * IMPORTANT:
       * If the connection request already exists,
       * remove this profile from the queue and show next one.
       */
      if (
        err.response?.status === 400 &&
        err.response?.data?.message === "Connection Request Exists!!"
      ) {
        setTimeout(() => {
          removeCurrentProfile();
        }, 220);

        return;
      }

      // Other errors should remain visible
      setError(
        getErrorMessage(
          err,
          "That action didn't go through. Please try again."
        )
      );

      setExiting(null);
      setBusy(false);
    }
  };

  /*
   * When queue becomes empty, load next page.
   */
  useEffect(() => {
    if (
      !loading &&
      queue.length === 0 &&
      hasMore &&
      page >= 1
    ) {
      loadPage(page + 1);
    }
  }, [queue.length, loading, hasMore, page, loadPage]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!current || busy) return;

      if (event.key === "ArrowRight") {
        act("interested");
      }

      if (event.key === "ArrowLeft") {
        act("ignored");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [current, busy]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">

      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-extrabold text-ink">
          Find your next collaborator
        </h1>

        <p className="mt-1.5 max-w-lg text-sm text-muted">
          Pass on profiles that aren't a fit, or show interest to open a
          connection. Use{" "}
          <kbd className="rounded-md border border-line bg-white px-1.5 py-0.5 font-mono text-xs">
            ←
          </kbd>{" "}
          /{" "}
          <kbd className="rounded-md border border-line bg-white px-1.5 py-0.5 font-mono text-xs">
            →
          </kbd>{" "}
          too.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-rose/30 bg-rose-soft px-3.5 py-2.5 text-sm text-rose">
          {error}
        </div>
      )}

      {/* Feed */}
      <div className="relative mx-auto mt-8 flex min-h-[560px] max-w-sm items-start justify-center">

        {/* Loading */}
        {loading && queue.length === 0 ? (
          <Loader label="Fetching your feed" />
        ) : current ? (
          <div className="relative w-full">

            {/* Third card */}
            {queue[2] && (
              <div className="absolute inset-x-4 top-4 -z-10 aspect-[3/4] scale-[0.94] rounded-[28px] border border-line bg-white/70" />
            )}

            {/* Second card */}
            {queue[1] && (
              <div className="absolute inset-x-2 top-2 -z-10 aspect-[3/4] scale-[0.97] rounded-[28px] border border-line bg-white/90" />
            )}

            {/* Current card */}
            <DevCard
              key={current._id}
              user={current}
              busy={busy}
              exiting={exiting}
              onIgnore={() => act("ignored")}
              onInterested={() => act("interested")}
            />

            {/* Queue count */}
            <p className="mt-4 text-center text-xs font-medium text-muted">
              {queue.length} profile
              {queue.length === 1 ? "" : "s"} queued
            </p>

            {/* Loading more */}
            {loading && queue.length > 0 && (
              <p className="mt-2 text-center text-xs text-muted">
                Loading more profiles...
              </p>
            )}
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