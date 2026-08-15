import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../api/getErrorMessage";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: "", lastName: "", emailId: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup(form);
      navigate("/");
    } catch (err) {
      setError(getErrorMessage(err, "Signup failed. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 animate-blob rounded-full bg-indigo/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 animate-blob-delay rounded-full bg-flame-pink/20 blur-3xl" />

      <div className="relative mx-auto w-full max-w-md">
        <div className="mb-7 flex flex-col items-center text-center">
          <span className="text-4xl">👨‍💻</span>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-ink">
            Join <span className="bg-flame bg-clip-text text-transparent">DevTinder</span>
          </h1>
          <p className="mt-1.5 text-sm text-muted">Ship a profile, get matched by stack.</p>
        </div>

        <form onSubmit={handleSubmit} className="panel space-y-4 p-7">
          {error && (
            <div className="rounded-2xl border border-rose/30 bg-rose-soft px-3.5 py-2.5 text-sm text-rose">
              {error}
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="field-label" htmlFor="firstName">
                First name
              </label>
              <input
                id="firstName"
                required
                minLength={2}
                placeholder="Ada"
                className="field-input"
                value={form.firstName}
                onChange={update("firstName")}
              />
            </div>
            <div>
              <label className="field-label" htmlFor="lastName">
                Last name
              </label>
              <input
                id="lastName"
                required
                placeholder="Lovelace"
                className="field-input"
                value={form.lastName}
                onChange={update("lastName")}
              />
            </div>
          </div>
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
              value={form.emailId}
              onChange={update("emailId")}
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
              autoComplete="new-password"
              placeholder="••••••••"
              className="field-input"
              value={form.password}
              onChange={update("password")}
            />
            <p className="mt-1.5 text-xs text-muted">
              8+ characters, with upper &amp; lowercase letters, a number, and a symbol.
            </p>
          </div>
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? "Creating…" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-flame hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
