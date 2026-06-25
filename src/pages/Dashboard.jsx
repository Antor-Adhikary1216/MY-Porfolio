import {
  BookOpenText,
  FolderKanban,
  Gauge,
  Home,
  LogOut,
  Mail,
  Menu,
  PlusCircle,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const links = [
  { label: "Overview", to: "/dashboard", icon: Gauge, end: true },
  { label: "Add project", to: "/dashboard/projects/new", icon: PlusCircle },
  { label: "Manage projects", to: "/dashboard/projects", icon: FolderKanban },
  { label: "Add skill", to: "/dashboard/skills/new", icon: PlusCircle },
  { label: "Manage skills", to: "/dashboard/skills", icon: Sparkles },
  { label: "Add blog", to: "/dashboard/blogs/new", icon: PlusCircle },
  { label: "Manage blogs", to: "/dashboard/blogs", icon: BookOpenText },
  { label: "Messages", to: "/dashboard/messages", icon: Mail },
];

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const sidebar = (
    <>
      <div className="flex h-18 items-center justify-between border-b border-white/8 px-5">
        <Link className="font-semibold text-white" to="/dashboard">
          Antor<span className="text-cyan-accent">.</span> Admin
        </Link>
        <button className="p-2 lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
          <X className="size-5" />
        </button>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-4" aria-label="Dashboard navigation">
        {links.map(({ label, to, icon: Icon, end }) => (
          <NavLink
            end={end}
            key={to}
            to={to}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                isActive
                  ? "bg-gradient-to-r from-blue-500/18 to-purple-500/12 text-white"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <Icon className="size-4" aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-white/8 p-4">
        <p className="truncate px-3 text-xs text-slate-500">{user?.email}</p>
        <button
          className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition hover:bg-rose-400/8 hover:text-rose-300"
          type="button"
          onClick={logout}
        >
          <LogOut className="size-4" aria-hidden="true" />
          Sign out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-ink-950">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-68 flex-col border-r border-white/8 bg-ink-900/92 backdrop-blur-xl lg:flex">
        {sidebar}
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-black/70"
            aria-label="Close dashboard menu"
            onClick={() => setOpen(false)}
          />
          <aside className="relative flex h-full w-72 flex-col border-r border-white/8 bg-ink-900">
            {sidebar}
          </aside>
        </div>
      )}

      <div className="lg:pl-68">
        <header className="sticky top-0 z-30 flex h-18 items-center justify-between border-b border-white/8 bg-ink-950/80 px-4 backdrop-blur-xl sm:px-7">
          <button
            className="rounded-lg p-2 text-slate-300 lg:hidden"
            type="button"
            aria-label="Open dashboard menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="size-5" />
          </button>
          <p className="hidden text-sm text-slate-500 sm:block">Portfolio content management</p>
          <Link
            className="inline-flex items-center gap-2 rounded-xl border border-white/8 px-3.5 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
            to="/"
          >
            <Home className="size-4" aria-hidden="true" />
            View site
          </Link>
        </header>
        <main className="p-4 sm:p-7 lg:p-10">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
