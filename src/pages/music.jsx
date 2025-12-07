// src/pages/Music.jsx
import { useState } from "react";
import { motion } from "framer-motion";

// Categories
const categories = [
  { name: "cash" },
  { name: "miocene memorial garden" },
  { name: "bye, son" },
  { name: "radio" },
];

// Animations
const fade = {
  hidden: { opacity: 0, y: 10 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" },
  }),
};

const panelFade = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Music() {
  const [active, setActive] = useState(null);

  return (
    <main className="pt-28 pb-24 px-6 min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-light tracking-tight mb-12"
        >
          music
        </motion.h1>

        {/* Layout */}
        <div className="flex flex-col md:flex-row gap-12">
          {/* LEFT: Vertical Category List */}
          <ul className="flex flex-col gap-6 md:gap-8 md:w-1/3">
            {categories.map((item, i) => (
              <motion.li
                key={item.name}
                custom={i}
                initial="hidden"
                animate="show"
                variants={fade}
                onClick={() => setActive(item.name)}
                className={`
                  text-xl md:text-3xl font-light cursor-pointer select-none transition-colors duration-300
                  ${
                    active === item.name
                      ? "text-black dark:text-white"
                      : "text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                  }
                `}
              >
                {item.name}
              </motion.li>
            ))}
          </ul>

          {/* RIGHT: Dynamic Panel */}
          <div className="md:w-2/3">
            {active ? (
              <motion.div
                key={active}
                initial="hidden"
                animate="show"
                variants={panelFade}
                className="space-y-4"
              >
                <h2 className="text-3xl md:text-4xl font-light tracking-tight">
                  {active}
                </h2>

                <p className="text-neutral-500 dark:text-neutral-400 text-sm italic">
                  content coming soon
                </p>
              </motion.div>
            ) : (
              <p className="text-neutral-500 dark:text-neutral-400 text-lg font-light">
                Select a category.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
