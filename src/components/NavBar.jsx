// components/NavBar.jsx
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { LuSun, LuMoon } from "react-icons/lu";
import AsciiText from "./AsciiText";

export function NavBar({ dark, setDark }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  /* -------------------------------------------------------
     Prevent background scroll when mobile menu is open
  ------------------------------------------------------- */
  useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = open ? "hidden" : prev || "";
    return () => (root.style.overflow = prev || "");
  }, [open]);

  /* Close mobile menu on navigation */
  useEffect(() => setOpen(false), [location.pathname]);

  const links = [
    { label: "works", to: "/works" },
    { label: "music", to: "/music" },
    { label: "contact", to: "/contact" },
    { label: "links", to: "/link" },
  ];

  /* -------------------------------------------------------
     JSX → New Cash Header Design
  ------------------------------------------------------- */
  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-[9999] border-b transition-all duration-300",
        "h-14 bg-white/70 dark:bg-black/70 backdrop-blur-xl",
        open ? "border-transparent" : "border-black/5 dark:border-white/5",
      ].join(" ")}
    >
      {/* Top nav bar */}
      <div className="relative z-[10000] flex h-14 w-full items-center px-4 sm:px-5 md:px-6">
        {/* ---------- CASH logo ---------- */}
        <Link
          to="/"
          className="group flex items-center gap-1 text-[17px] font-light tracking-tight outline-none"
        >
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-1"
          >
            <AsciiText text="cash" className="tracking-wide font-mono" />
            <span className="text-neutral-400 text-[12px] font-mono">/</span>
          </motion.div>
        </Link>

        {/* DESKTOP NAV */}
        <div className="ml-auto hidden items-center gap-6 md:flex">
          {/* Links */}
          <nav className="flex items-center gap-5 text-[13px] font-light">
            {links.map((l) => (
              <NavItem
                key={l.to}
                to={l.to}
                active={normalize(location.pathname) === normalize(l.to)}
              >
                {l.label}
              </NavItem>
            ))}
          </nav>

          {/* New modern toggle */}
          <button
            onClick={() => setDark((d) => !d)}
            className="
              inline-flex items-center justify-center
              h-8 w-8 rounded-full border border-black/10 dark:border-white/10
              hover:bg-neutral-200/50 dark:hover:bg-neutral-800/80
              transition-all active:scale-95
            "
            aria-label="Toggle theme"
          >
            {dark ? (
              <LuSun size={16} className="text-neutral-200" />
            ) : (
              <LuMoon size={16} className="text-neutral-600" />
            )}
          </button>
        </div>

        {/* MOBILE */}
        <div className="ml-auto flex items-center gap-2 md:hidden">
          {/* New modern toggle */}
          <button
            onClick={() => setDark((d) => !d)}
            className="
              inline-flex h-9 w-9 items-center justify-center rounded-full 
              border border-black/10 dark:border-white/10
              hover:bg-neutral-200/50 dark:hover:bg-neutral-800/80
              transition-all active:scale-95
            "
          >
            {dark ? (
              <LuSun size={16} className="text-neutral-200" />
            ) : (
              <LuMoon size={16} className="text-neutral-600" />
            )}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle Menu"
            className="
              inline-flex h-9 w-9 items-center justify-center rounded-full 
              border border-black/10 dark:border-white/10
              hover:bg-neutral-200/50 dark:hover:bg-neutral-800/80
              transition-all active:scale-95 relative
            "
          >
            {/* bars / X */}
            <span
              className="absolute block h-[2px] w-4 rounded-full bg-current transition-transform duration-200"
              style={{
                transform: open
                  ? "translateY(0) rotate(45deg)"
                  : "translateY(-3px) rotate(0deg)",
              }}
            />
            <span
              className="absolute block h-[2px] w-4 rounded-full bg-current transition-transform duration-200"
              style={{
                transform: open
                  ? "translateY(0) rotate(-45deg)"
                  : "translateY(3px) rotate(0deg)",
              }}
            />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.nav
            key="mobile-menu"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.24 }}
            className="
              fixed inset-0 z-[9998] h-[100dvh] w-screen
              bg-white dark:bg-black flex flex-col items-center justify-center md:hidden
            "
            style={{ paddingTop: "3.5rem" }}
          >
            <ul className="flex flex-col items-center gap-8 text-2xl font-light">
              {links.map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05 }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="block p-2 hover:text-neutral-500 dark:hover:text-neutral-300 transition-colors"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

/* -------------------------------------------------------
   Subcomponents
------------------------------------------------------- */

function NavItem({ to, children, active }) {
  return (
    <Link
      to={to}
      className="
        relative px-2 py-1 rounded-md text-neutral-600 dark:text-neutral-400
        hover:text-black dark:hover:text-white transition-colors
      "
    >
      <motion.span
        className="relative z-10"
        whileHover={{ y: -1 }}
        transition={{ type: "spring", stiffness: 240, damping: 18 }}
      >
        {children}
      </motion.span>

      <AnimatePresence>
        {active && (
          <motion.span
            layoutId="nav-pill"
            className="
              absolute inset-0 rounded-md bg-black/5 dark:bg-white/10 -z-[1]
            "
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>
    </Link>
  );
}

function normalize(p) {
  if (!p) return "/";
  return p.endsWith("/") && p !== "/" ? p.slice(0, -1) : p;
}

export default NavBar;
