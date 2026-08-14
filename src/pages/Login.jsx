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
    <div className="mx-auto flex min-h-[calc(100vh-56px)] max-w-md flex-col justify-center px-4 py-12">
      <p className="mb-1 font-mono text-xs text-indigo">$ devtinder auth --login</p>
      <h1 className="font-display text-3xl font-semibold text-ink">Welcome back</h1>
      <p className="mt-1.5 text-sm text-muted">Sign in to pick up your session.</p>

      <form onSubmit={handleSubmit} className="panel mt-6 space-y-4 p-6">
        {error && (
          <div className="rounded-lg border border-rose/30 bg-rose-soft px-3.5 py-2.5 text-sm text-rose">
            {error}
          </div>
        )}
        <div>
          <label className="field-label" htmlFor="emailId">
            email
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
            password
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
          {loading ? "signing in…" : "Sign in"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-muted">
        New to DevTinder?{" "}
        <Link to="/signup" className="font-medium text-indigo hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
