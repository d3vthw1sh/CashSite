// src/App.jsx
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";

import Home from "./pages/Home";
import Works from "./pages/Works";
import Contact from "./pages/Contact";
import Music from "./pages/music";
import Performance from "./pages/Performance";
import Store from "./pages/Store";

export default function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    dark ? html.classList.add("dark") : html.classList.remove("dark");
  }, [dark]);

  return (
    <div
      className={
        (dark
          ? "dark bg-neutral-950 text-neutral-100"
          : "bg-neutral-50 text-neutral-900") + " min-h-dvh flex flex-col"
      }
    >
      <NavBar dark={dark} setDark={setDark} />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<Works />} />
          <Route path="/music" element={<Music />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/store" element={<Store />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>

      <footer className="border-t border-black/5 dark:border-white/5 py-8 text-center text-xs text-neutral-500 dark:text-neutral-400">
        © {new Date().getFullYear()} Cash. All rights reserved.
      </footer>
    </div>
  );
}
