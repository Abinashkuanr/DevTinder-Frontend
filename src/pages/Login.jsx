import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../api/getErrorMessage";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(emailId, password);
      navigate("/");
    } catch (err) {
      setError(getErrorMessage(err, "Login failed. Check your credentials."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 animate-blob rounded-full bg-flame-pink/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 animate-blob-delay rounded-full bg-indigo/20 blur-3xl" />

      <div className="relative mx-auto w-full max-w-md">
        <div className="mb-7 flex flex-col items-center text-center">
          <span className="text-4xl">👨‍💻</span>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-ink">
            Welcome back to <span className="bg-flame bg-clip-text text-transparent">DevTinder</span>
          </h1>
          <p className="mt-1.5 text-sm text-muted">Sign in to pick up your session.</p>
        </div>

        <form onSubmit={handleSubmit} className="panel space-y-4 p-7">
          {error && (
            <div className="rounded-2xl border border-rose/30 bg-rose-soft px-3.5 py-2.5 text-sm text-rose">
              {error}
            </div>
          )}
          <div>
            <label className="field-label" htmlFor="emailId">
              Email
            </label>
            <input
              id="emailId"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="field-input"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>
          <div>
            <label className="field-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="field-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          New to DevTinder?{" "}
          <Link to="/signup" className="font-semibold text-flame hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
