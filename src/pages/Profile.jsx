import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { getErrorMessage } from "../api/getErrorMessage";
import DevCard from "../components/DevCard";

const EDITABLE_FIELDS = ["firstName", "lastName", "photoUrl", "age", "about", "gender"];

function toFormState(user) {
  return {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    photoUrl: user?.photoUrl || "",
    age: user?.age ?? "",
    gender: user?.gender || "",
    about: user?.about || "",
    skills: (user?.skills || []).join(", "),
  };
}

export default function Profile() {
  const { user, setUser } = useAuth();
  const [tab, setTab] = useState("edit");

  const [form, setForm] = useState(toFormState(user));
  const [editError, setEditError] = useState("");
  const [editSuccess, setEditSuccess] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

  const [pwForm, setPwForm] = useState({ currentPassword: "", newPassword: "" });
  const [pwError, setPwError] = useState("");
  const [pwSuccess, setPwSuccess] = useState("");
  const [savingPw, setSavingPw] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const previewUser = {
    ...user,
    firstName: form.firstName,
    lastName: form.lastName,
    photoUrl: form.photoUrl,
    age: form.age ? Number(form.age) : undefined,
    gender: form.gender,
    about: form.about,
    skills: form.skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setEditError("");
    setEditSuccess("");
    setSavingEdit(true);
    try {
      const payload = {};
      EDITABLE_FIELDS.forEach((key) => {
        if (form[key] !== "") payload[key] = key === "age" ? Number(form[key]) : form[key];
      });
      payload.skills = previewUser.skills;

      const res = await api.patch("/profile/edit", payload);
      setUser(res.data?.data);
      setEditSuccess(res.data?.message || "Profile updated.");
    } catch (err) {
      setEditError(getErrorMessage(err, "Couldn't update your profile."));
    } finally {
      setSavingEdit(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwError("");
    setPwSuccess("");
    setSavingPw(true);
    try {
      const res = await api.patch("/profile/password", pwForm);
      setPwSuccess(res.data?.message || "Password updated.");
      setPwForm({ currentPassword: "", newPassword: "" });
    } catch (err) {
      setPwError(getErrorMessage(err, "Couldn't update your password."));
    } finally {
      setSavingPw(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-display text-3xl font-extrabold text-ink">Your profile</h1>
      <p className="mt-1.5 text-sm text-muted">This is exactly what other developers see in their feed.</p>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,360px)_1fr]">
        {/* Live preview */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <DevCard user={previewUser} busy onIgnore={() => {}} onInterested={() => {}} />
        </div>

        {/* Editor panel */}
        <div className="panel overflow-hidden p-0">
          <div className="flex border-b border-line">
            <button
              onClick={() => setTab("edit")}
              className={
                "flex-1 border-b-2 px-4 py-3 text-sm font-semibold transition " +
                (tab === "edit" ? "border-flame text-ink" : "border-transparent text-muted hover:text-ink")
              }
            >
              Edit profile
            </button>
            <button
              onClick={() => setTab("password")}
              className={
                "flex-1 border-b-2 px-4 py-3 text-sm font-semibold transition " +
                (tab === "password" ? "border-flame text-ink" : "border-transparent text-muted hover:text-ink")
              }
            >
              Change password
            </button>
          </div>

          <div className="p-6">
            {tab === "edit" ? (
              <form onSubmit={handleSaveProfile} className="space-y-4">
                {editError && (
                  <div className="rounded-2xl border border-rose/30 bg-rose-soft px-3.5 py-2.5 text-sm text-rose">
                    {editError}
                  </div>
                )}
                {editSuccess && (
                  <div className="rounded-2xl border border-emerald/30 bg-emerald-soft px-3.5 py-2.5 text-sm text-emerald">
                    {editSuccess}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="field-label">first name</label>
                    <input className="field-input" value={form.firstName} onChange={update("firstName")} minLength={2} required />
                  </div>
                  <div>
                    <label className="field-label">last name</label>
                    <input className="field-input" value={form.lastName} onChange={update("lastName")} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="field-label">age</label>
                    <input
                      type="number"
                      min={18}
                      max={50}
                      placeholder="18–50"
                      className="field-input"
                      value={form.age}
                      onChange={update("age")}
                    />
                  </div>
                  <div>
                    <label className="field-label">gender</label>
                    <select className="field-input" value={form.gender} onChange={update("gender")}>
                      <option value="">select…</option>
                      <option value="male">male</option>
                      <option value="female">female</option>
                      <option value="others">others</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="field-label">photo url</label>
                  <input className="field-input" value={form.photoUrl} onChange={update("photoUrl")} placeholder="https://…" />
                </div>

                <div>
                  <label className="field-label">about</label>
                  <textarea
                    className="field-input min-h-[90px] resize-none"
                    value={form.about}
                    onChange={update("about")}
                    maxLength={200}
                    placeholder="200 characters max"
                  />
                </div>

                <div>
                  <label className="field-label">skills</label>
                  <input
                    className="field-input"
                    value={form.skills}
                    onChange={update("skills")}
                    placeholder="React, Node.js, MongoDB"
                  />
                  <p className="mt-1.5 text-xs text-muted">Comma-separated.</p>
                </div>

                <button type="submit" className="btn-primary w-full" disabled={savingEdit}>
                  {savingEdit ? "saving…" : "Save changes"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleChangePassword} className="max-w-sm space-y-4">
                {pwError && (
                  <div className="rounded-2xl border border-rose/30 bg-rose-soft px-3.5 py-2.5 text-sm text-rose">
                    {pwError}
                  </div>
                )}
                {pwSuccess && (
                  <div className="rounded-2xl border border-emerald/30 bg-emerald-soft px-3.5 py-2.5 text-sm text-emerald">
                    {pwSuccess}
                  </div>
                )}

                <div>
                  <label className="field-label">current password</label>
                  <input
                    type="password"
                    required
                    autoComplete="current-password"
                    className="field-input"
                    value={pwForm.currentPassword}
                    onChange={(e) => setPwForm((f) => ({ ...f, currentPassword: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="field-label">new password</label>
                  <input
                    type="password"
                    required
                    autoComplete="new-password"
                    className="field-input"
                    value={pwForm.newPassword}
                    onChange={(e) => setPwForm((f) => ({ ...f, newPassword: e.target.value }))}
                  />
                  <p className="mt-1.5 text-xs text-muted">
                    8+ characters, with upper &amp; lowercase letters, a number, and a symbol.
                  </p>
                </div>
                <button type="submit" className="btn-primary w-full" disabled={savingPw}>
                  {savingPw ? "updating…" : "Update password"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
