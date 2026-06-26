import { LayoutDashboard, LogIn, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Skills", to: "/skills" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b transition duration-300 ${
        scrolled || open
          ? "border-white/8 bg-ink-950/82 shadow-lg shadow-black/15 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
      aria-label="Main navigation"
    >
      <div className="container-shell flex h-18 items-center justify-between">
        <Link
          className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl transition hover:brightness-110"
          to="/"
          aria-label="Code with Antor home"
        >
          <img
            src="/code-with-antor-logo.png"
            alt="Code with Antor"
            className="absolute -top-2 left-0 size-24 max-w-none object-contain"
          />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm transition hover:bg-white/5 hover:text-white ${
                  isActive ? "text-cyan-accent" : "text-slate-400"
                }`
              }
              end={item.to === "/"}
              key={item.label}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            className="ml-3 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-cyan-accent/40 hover:bg-cyan-accent/8"
            to={user ? "/dashboard" : "/login"}
          >
            {user ? (
              <LayoutDashboard className="size-4" aria-hidden="true" />
            ) : (
              <LogIn className="size-4" aria-hidden="true" />
            )}
            {user ? "Dashboard" : "Admin"}
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-slate-300 hover:bg-white/5 lg:hidden"
          type="button"
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="container-shell border-t border-white/8 pb-5 pt-3 lg:hidden">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2.5 text-sm hover:bg-white/5 hover:text-white ${
                  isActive ? "text-cyan-accent" : "text-slate-300"
                }`
              }
              end={item.to === "/"}
              key={item.label}
              onClick={() => setOpen(false)}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            className="mt-2 flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2.5 text-sm font-medium text-cyan-accent"
            onClick={() => setOpen(false)}
            to={user ? "/dashboard" : "/login"}
          >
            {user ? <LayoutDashboard className="size-4" /> : <LogIn className="size-4" />}
            {user ? "Dashboard" : "Admin login"}
          </Link>
        </div>
      )}
    </nav>
  );
}
