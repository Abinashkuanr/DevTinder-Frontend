import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const TABS = [
  { to: "/", label: "Discover", end: true },
  { to: "/requests", label: "Requests" },
  { to: "/connections", label: "Matches" },
  { to: "/profile", label: "Profile" },
];

export default function Navbar() {
  const { user, status, logout } = useAuth();
  const navigate = useNavigate();

  if (status !== "authenticated") return null;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center gap-1 px-4 py-3">
        <div className="brand-mark mr-4 shrink-0">
          <span className="text-xl">👨‍💻</span>
          <span className="brand-text">DevTinder</span>
        </div>

        <nav className="flex flex-1 items-center gap-1 overflow-x-auto">
          {TABS.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.end}
              className={({ isActive }) =>
                "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-semibold transition " +
                (isActive
                  ? "bg-flame text-white shadow-pop"
                  : "text-muted hover:bg-flame-soft hover:text-flame")
              }
            >
              {t.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <img
            src={user?.photoUrl}
            alt={user?.firstName}
            referrerPolicy="no-referrer"
            className="h-8 w-8 rounded-full border-2 border-flame-soft object-cover"
          />
          <span className="text-sm font-semibold text-ink">{user?.firstName}</span>
        </div>
        <button
          onClick={handleLogout}
          className="ml-2 rounded-full border border-line px-3.5 py-1.5 text-sm font-semibold text-muted transition hover:border-rose/50 hover:text-rose"
        >
          Log out
        </button>
      </div>
    </header>
  );
}
