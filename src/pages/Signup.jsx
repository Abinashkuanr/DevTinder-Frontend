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
    <div className="mx-auto flex min-h-[calc(100vh-56px)] max-w-md flex-col justify-center px-4 py-12">
      <p className="mb-1 font-mono text-xs text-indigo">$ devtinder auth --signup</p>
      <h1 className="font-display text-3xl font-semibold text-ink">Create your account</h1>
      <p className="mt-1.5 text-sm text-muted">Ship a profile, get matched by stack.</p>

      <form onSubmit={handleSubmit} className="panel mt-6 space-y-4 p-6">
        {error && (
          <div className="rounded-lg border border-rose/30 bg-rose-soft px-3.5 py-2.5 text-sm text-rose">
            {error}
          </div>
        )}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="field-label" htmlFor="firstName">
              first name
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
              last name
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
            email
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
            password
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
          {loading ? "creating…" : "Create account"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-indigo hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
