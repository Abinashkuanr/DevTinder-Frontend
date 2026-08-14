import { useEffect, useState } from "react";
import api from "../api/axios";
import { getErrorMessage } from "../api/getErrorMessage";
import EmptyState from "../components/EmptyState";
import Loader from "../components/Loader";

export default function Connections() {
  const [connections, setConnections] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/user/connections")
      .then((res) => setConnections(res.data?.data || []))
      .catch((err) => {
        setError(getErrorMessage(err, "Couldn't load your connections."));
        setConnections([]);
      });
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <p className="font-mono text-xs text-indigo">$ devtinder connections --merged</p>
      <h1 className="mt-1 font-display text-3xl font-semibold text-ink">Your connections</h1>
      <p className="mt-1.5 text-sm text-muted">Developers you've matched with.</p>

      {error && (
        <div className="mt-5 rounded-lg border border-rose/30 bg-rose-soft px-3.5 py-2.5 text-sm text-rose">
          {error}
        </div>
      )}

      <div className="mt-6">
        {connections === null ? (
          <Loader label="fetching connections" />
        ) : connections.length === 0 ? (
          <EmptyState
            glyph="⎇"
            title="No connections yet"
            body="Accept a request or get matched from the feed to see people here."
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {connections.map((c) => (
              <div key={c._id} className="panel p-5">
                <img
                  src={c.photoUrl}
                  alt={c.firstName}
                  referrerPolicy="no-referrer"
                  className="h-14 w-14 rounded-full border border-line object-cover"
                />
                <h4 className="mt-3 font-display font-semibold text-ink">
                  {c.firstName} {c.lastName}
                </h4>
                <p className="mt-1 line-clamp-2 text-sm text-muted">
                  {(c.skills || []).slice(0, 3).join(", ") || c.about}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
