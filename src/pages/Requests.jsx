import { useEffect, useState } from "react";
import api from "../api/axios";
import { getErrorMessage } from "../api/getErrorMessage";
import EmptyState from "../components/EmptyState";
import Loader from "../components/Loader";

export default function Requests() {
  const [requests, setRequests] = useState(null);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const load = async () => {
    try {
      const res = await api.get("/user/requests/received");
      setRequests(res.data?.data || []);
    } catch (err) {
      setError(getErrorMessage(err, "Couldn't load your requests."));
      setRequests([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const review = async (status, requestId) => {
    setBusyId(requestId);
    setError("");
    try {
      await api.post(`/request/review/${status}/${requestId}`);
      setRequests((rs) => rs.filter((r) => r._id !== requestId));
    } catch (err) {
      setError(getErrorMessage(err, "That review didn't go through."));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="font-display text-3xl font-extrabold text-ink">Open requests</h1>
      <p className="mt-1.5 text-sm text-muted">Developers who want to connect with you.</p>

      {error && (
        <div className="mt-5 rounded-2xl border border-rose/30 bg-rose-soft px-3.5 py-2.5 text-sm text-rose">
          {error}
        </div>
      )}

      <div className="mt-6">
        {requests === null ? (
          <Loader label="fetching requests" />
        ) : requests.length === 0 ? (
          <EmptyState
            glyph="◌"
            title="No open requests"
            body="Nobody's sent an interest yet — head to the feed to get discovered too."
          />
        ) : (
          <ul className="space-y-3">
            {requests.map((r) => {
              const from = r.fromUserId;
              return (
                <li key={r._id} className="panel flex items-center gap-4 p-4">
                  <img
                    src={from?.photoUrl}
                    alt={from?.firstName}
                    referrerPolicy="no-referrer"
                    className="h-12 w-12 shrink-0 rounded-full border-2 border-flame-soft object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display font-bold text-ink">
                      {from?.firstName} {from?.lastName}
                    </p>
                    <p className="truncate text-sm text-muted">
                      {from?.about || (from?.skills || []).join(", ") || "wants to connect"}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-line bg-white text-ink transition hover:border-rose hover:text-rose disabled:opacity-50"
                      title="Reject"
                      disabled={busyId === r._id}
                      onClick={() => review("rejected", r._id)}
                    >
                      ✕
                    </button>
                    <button
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-flame text-white transition hover:brightness-105 disabled:opacity-50"
                      title="Accept"
                      disabled={busyId === r._id}
                      onClick={() => review("accepted", r._id)}
                    >
                      ♥
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
