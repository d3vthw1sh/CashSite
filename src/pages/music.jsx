// src/pages/Music.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SoundCloudEmbed from "../components/SoundCloudEmbed";
import musicData from "../data/music.json";

const categories = [
  { name: "cash", key: "cash" },
  { name: "miocene memorial garden", key: "miocene_memorial_garden" },
  { name: "bye, son", key: "bye_son" },
  { name: "radio", key: "radio" },
];

export default function Music() {
  const [activeKey, setActiveKey] = useState("cash");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Helper to render content for a specific category key
  const renderContent = (key) => {
    const data = musicData[key];
    if (!data) return null;

    return (
      <div className="space-y-12">
        {/* Description */}
        <div className="space-y-4">
            {data.description && (
                <p className="text-lg md:text-xl font-light leading-relaxed text-neutral-700 dark:text-neutral-300">
                    {data.description}
                </p>
            )}
            
            {/* Members / Host */}
            {data.members && (
                <p className="text-sm font-mono text-neutral-500">
                    Members: {data.members.join(", ")}
                </p>
            )}
            {data.host && (
                 <p className="text-sm font-mono text-neutral-500">
                    Host: {data.host} | Frequency: {data.frequency} | Platform: {data.platform}
                 </p>
            )}
        </div>

        {/* Releases List */}
        <div className="space-y-8">
            {/* 1. Cash & General Releases */}
            {data.releases && data.releases.map((rel, i) => (
                <div key={i} className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 border-b border-black/10 dark:border-white/10 pb-2">
                        <h3 className="text-2xl font-light">{rel.title}</h3>
                        <span className="text-xs font-mono text-neutral-500 uppercase">
                            {rel.type} &bull; {rel.release_date}
                        </span>
                    </div>
                    {/* Embed */}
                    {rel.links?.soundcloud && (
                         <div className="w-full">
                            <SoundCloudEmbed url={rel.links.soundcloud} />
                         </div>
                    )}
                    {/* Other Links */}
                     <div className="flex gap-4 text-sm font-mono text-neutral-400">
                        {rel.links?.bandcamp && <a href={rel.links.bandcamp} target="_blank" className="hover:text-black dark:hover:text-white transition-colors">Bandcamp ↗</a>}
                        {rel.links?.youtube && <a href={rel.links.youtube} target="_blank" className="hover:text-black dark:hover:text-white transition-colors">YouTube ↗</a>}
                     </div>
                </div>
            ))}

            {/* 2. Tracks (Simple List) */}
            {data.tracks && data.tracks.map((trackUrl, i) => (
                 <div key={i} className="w-full">
                    <SoundCloudEmbed url={trackUrl} />
                 </div>
            ))}

            {/* 3. Episodes (Radio) */}
            {data.episodes && data.episodes.map((epUrl, i) => (
                 <div key={i} className="w-full">
                    <SoundCloudEmbed url={epUrl} />
                 </div>
            ))}
            
            {/* 4. Generic Links (MMG) */}
             {Array.isArray(data.links) && data.links.map((link, i) => ( // MMG uses array of strings
                <div key={i} className="w-full">
                    {link.includes("soundcloud") ? (
                        <SoundCloudEmbed url={link} />
                    ) : (
                        <a href={link} target="_blank" className="block py-2 text-blue-500 underline">{link}</a>
                    )}
                </div>
            ))}
        </div>
        
        {/* Singles & Features (Cash) */}
        {data.singles_and_features && (
            <div className="space-y-8 pt-8 border-t border-black/10 dark:border-white/10">
                <h3 className="text-xl font-light uppercase tracking-widest text-neutral-500">Singles & Features</h3>
                {data.singles_and_features.map((url, i) => (
                    <div key={i} className="w-full">
                        <SoundCloudEmbed url={url} />
                    </div>
                ))}
            </div>
        )}

      </div>
    );
  };

  return (
    <main className="pt-28 pb-24 px-6 min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-light tracking-tight mb-12"
        >
          music
        </motion.h1>

        {isMobile ? (
          /* MOBILE: Accordion Layout */
          <div className="flex flex-col border-t border-black/10 dark:border-white/10">
            {categories.map((cat) => {
              const isOpen = activeKey === cat.key;
              return (
                <div key={cat.key} className="border-b border-black/10 dark:border-white/10">
                  <button
                    onClick={() => setActiveKey(isOpen ? null : cat.key)}
                    className="w-full flex items-center justify-between py-6 text-left outline-none"
                  >
                    <span className={`text-2xl font-light transition-colors duration-300 ${isOpen ? "text-black dark:text-white" : "text-neutral-400"}`}>
                      {cat.name}
                    </span>
                    <span className="text-xl font-light text-neutral-400">
                        {isOpen ? "—" : "+"}
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 pt-2">
                          {renderContent(cat.key)}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ) : (
          /* DESKTOP: Split Layout */
          <div className="flex gap-16 items-start">
            <div className="w-1/3 sticky top-32 space-y-6">
               {categories.map((cat, i) => (
                 <motion.button
                    key={cat.key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setActiveKey(cat.key)}
                    className={`block text-3xl font-light text-left transition-colors duration-300 ${
                        activeKey === cat.key 
                        ? "text-black dark:text-white scale-105 origin-left" 
                        : "text-neutral-400 hover:text-black dark:hover:text-white"
                    }`}
                 >
                    {cat.name}
                 </motion.button>
               ))}
            </div>
            
            <div className="w-2/3 min-h-[50vh]">
                 <AnimatePresence mode="wait">
                    <motion.div
                        key={activeKey}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                    >
                        {renderContent(activeKey)}
                    </motion.div>
                 </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
