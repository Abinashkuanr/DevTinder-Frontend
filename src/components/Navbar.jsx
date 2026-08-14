import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const TABS = [
  { to: "/", label: "feed.jsx", end: true },
  { to: "/requests", label: "requests.jsx" },
  { to: "/connections", label: "connections.jsx" },
  { to: "/profile", label: "profile.jsx" },
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
    <header className="sticky top-0 z-20 bg-titlebar text-white">
      <div className="mx-auto flex max-w-5xl items-center gap-1 px-4 py-2.5">
        <div className="mr-3 flex items-center gap-1.5 font-display text-[15px] font-semibold">
          <span className="text-indigo">&lt;/&gt;</span>
          👩🏻‍💻DevTinder
        </div>

        <nav className="flex flex-1 items-center gap-1 overflow-x-auto">
          {TABS.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.end}
              className={({ isActive }) =>
                "shrink-0 rounded-md px-3 py-1.5 font-mono text-xs transition " +
                (isActive ? "bg-white/10 text-white" : "text-white/50 hover:text-white/80")
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
            className="h-7 w-7 rounded-full border border-white/15 object-cover"
          />
          <span className="font-mono text-xs text-white/70">{user?.firstName}</span>
        </div>
        <button
          onClick={handleLogout}
          className="ml-2 rounded-md border border-white/15 px-3 py-1.5 font-mono text-xs text-white/70 transition hover:border-rose/50 hover:text-rose"
        >
          logout
        </button>
      </div>
    </header>
  );
}
