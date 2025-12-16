import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import portfolioData from "../data/portfolio_full.json";
import { LuX, LuExternalLink, LuPlus } from "react-icons/lu";
import AsciiText from "../components/AsciiText";

/* -----------------------------------------
   Embed Component
----------------------------------------- */
function EmbedPlayer({ work }) {
  const { type, embedId, link, isTrack } = work;

  if (!embedId) {
    return (
      <div className="w-full h-32 border border-black/5 dark:border-white/5 flex flex-col items-center justify-center gap-2 rounded-lg bg-black/5 dark:bg-white/5">
        <p className="font-mono text-[10px] opacity-40 uppercase">Audio Preview Unavailable</p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[10px] uppercase underline hover:no-underline opacity-60"
        >
          [ Open External Link ]
        </a>
      </div>
    );
  }

  const iframeStyle = "w-full rounded-lg shadow-sm";

  if (type === "spotify") {
    return (
      <iframe
        src={`https://open.spotify.com/embed/${isTrack ? "track" : "album"}/${embedId}?utm_source=generator&theme=0`}
        width="100%"
        height="152"
        frameBorder="0"
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className={iframeStyle}
      />
    );
  }

  if (type === "youtube") {
    return (
      <div className="aspect-video w-full rounded-lg overflow-hidden shadow-sm">
        <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${embedId}?controls=0&modestbranding=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
        />
      </div>
    );
  }

  if (type === "bandcamp") {
    return (
      <iframe
        style={{ border: 0, width: "100%", height: "120px" }}
        src={`https://bandcamp.com/EmbeddedPlayer/album=${embedId}/size=large/bgcol=ffffff/linkcol=333333/tracklist=false/artwork=small/transparent=true/`}
        seamless
        className="rounded-lg shadow-sm dark:invert"
      >
        <a href={link}>{work.title}</a>
      </iframe>
    );
  }

  return null;
}

/* -----------------------------------------
   Filter Categories
----------------------------------------- */
const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "production", label: "Production", keywords: ["production", "composition", "sound design"] },
  { id: "mixing", label: "Mixing", keywords: ["mixing"] },
  { id: "mastering", label: "Mastering", keywords: ["mastering"] },
  { id: "immersive", label: "Immersive", keywords: ["immersive", "dolby", "spatial"] },
];

/* -----------------------------------------
   Works Page Component
----------------------------------------- */
export default function Works() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedWork, setSelectedWork] = useState(null);

  // Filter Logic
  const filteredWorks = useMemo(() => {
    if (activeFilter === "all") return portfolioData;
    const category = CATEGORIES.find((c) => c.id === activeFilter);
    if (!category) return portfolioData;

    return portfolioData.filter((work) => {
      if (!work.tags) return false;
      return work.tags.some((tag) =>
        category.keywords.some((keyword) => tag.toLowerCase().includes(keyword))
      );
    });
  }, [activeFilter]);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedWork ? "hidden" : "unset";
  }, [selectedWork]);

  return (
    <main className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] text-black dark:text-white pt-28 pb-20 px-6 md:px-12 font-mono transition-colors duration-500">
      
      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* Header Section - Clean & Minimal */}
        <div className="flex flex-col items-center justify-center mb-24 gap-6">
            <div className="relative overflow-hidden">
                <h1 className="text-sm md:text-base font-medium tracking-[0.2em] uppercase">
                    [ <AsciiText text="WORKS_INDEX" enableOnHover={true} /> ]
                </h1>
            </div>

            {/* Filters - Clean Row */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-xs tracking-widest uppercase">
                 {CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveFilter(cat.id)}
                        className={`
                            transition-all duration-300 relative py-1
                            ${activeFilter === cat.id 
                                ? "text-black dark:text-white opacity-100" 
                                : "text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"}
                        `}
                    >
                         {activeFilter === cat.id && (
                            <motion.span 
                                layoutId="dot"
                                className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-1 bg-black dark:bg-white rounded-full"
                            />
                         )}
                         {cat.label}
                    </button>
                ))}
            </div>
        </div>

        {/* Grid Layout - Clean & Floated */}
        <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 lg:gap-y-24"
        >
            <AnimatePresence mode="popLayout">
                {filteredWorks.map((work, i) => (
                    <motion.div
                        layout
                        key={work.title + i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="group cursor-pointer flex flex-col gap-4"
                        onClick={() => setSelectedWork(work)}
                    >
                         {/* Image Container */}
                        <div className="relative aspect-square overflow-hidden rounded-md bg-neutral-100 dark:bg-neutral-900 shadow-sm transition-all duration-500 group-hover:shadow-md">
                            {work.img ? (
                                <img 
                                    src={work.img} 
                                    className="w-full h-full object-cover grayscale-[100%] contrast-[1.1] brightness-[1.1] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center opacity-10 text-[10px] tracking-widest">
                                    [ NO_IMG ]
                                </div>
                            )}

                            {/* Minimal Hover Overlay */}
                            <div className="absolute inset-0 bg-white/20 dark:bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                         {/* Minimal Details Below */}
                        <div className="flex flex-col items-center text-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                             <h3 className="text-xs uppercase tracking-widest font-medium">
                                <AsciiText text={work.title} enableOnHover={true} />
                            </h3>
                             <p className="text-[10px] uppercase tracking-wider opacity-60">{work.artist}</p>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>

        {filteredWorks.length === 0 && (
            <div className="py-32 text-center text-xs tracking-widest opacity-40 uppercase">
                [ No Entries Found ]
            </div>
        )}
      </div>

      {/* Modal - Clean & Pretty */}
      <AnimatePresence>
        {selectedWork && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/95 dark:bg-[#050505]/95 backdrop-blur-sm"
                    onClick={() => setSelectedWork(null)}
                />
                
                <motion.div
                    initial={{ scale: 0.98, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.98, opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full max-w-4xl bg-white dark:bg-[#0A0A0A] border border-black/5 dark:border-white/5 rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[85vh]"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Image Section */}
                    <div className="md:w-5/12 bg-neutral-50 dark:bg-neutral-900/50 p-6 flex flex-col justify-center relative">
                        <div className="aspect-square w-full rounded-lg overflow-hidden shadow-lg border border-black/5 dark:border-white/5 relative z-10">
                            {selectedWork.img ? (
                                <img src={selectedWork.img} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-black/5 flex items-center justify-center text-[10px]">{`{ IMG_VOID }`}</div>
                            )}
                        </div>
                        {/* Background Blurred Image */}
                        {selectedWork.img && (
                            <div className="absolute inset-0 overflow-hidden opacity-30 dark:opacity-10 blur-3xl pointer-events-none">
                                <img src={selectedWork.img} className="w-full h-full object-cover scale-150" />
                            </div>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="md:w-7/12 p-8 md:p-10 flex flex-col overflow-y-auto">
                        <div className="flex justify-between items-start mb-8">
                             <div>
                                <h2 className="text-xl md:text-2xl uppercase tracking-wider font-medium mb-1">
                                    <AsciiText text={selectedWork.title} />
                                </h2>
                                <p className="text-xs uppercase tracking-widest opacity-50">{selectedWork.artist}</p>
                             </div>
                             <button 
                                onClick={() => setSelectedWork(null)}
                                className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
                            >
                                <LuX size={18} className="opacity-60" />
                            </button>
                        </div>

                        <div className="space-y-8 flex-1">
                             <div className="flex flex-wrap gap-2">
                                {selectedWork.tags?.map((tag) => (
                                    <span key={tag} className="text-[10px] uppercase tracking-wider border border-black/10 dark:border-white/10 px-2 py-1 rounded-full opacity-60">
                                        {tag}
                                    </span>
                                ))}
                             </div>

                             <EmbedPlayer work={selectedWork} />

                             {selectedWork.awards && (
                                <div className="pt-4 border-t border-black/5 dark:border-white/5">
                                    <p className="text-[10px] uppercase tracking-widest opacity-40 mb-3">Recognition</p>
                                    <ul className="space-y-2">
                                        {selectedWork.awards.map((award, i) => (
                                            <li key={i} className="text-xs opacity-70 flex gap-2">
                                                <span>✦</span> {award}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                             )}
                        </div>

                        <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/5 flex justify-between items-center text-[10px] uppercase tracking-widest">
                            <span className="opacity-40">PLATFORM: {selectedWork.type || "N/A"}</span>
                            <a 
                                href={selectedWork.link} 
                                target="_blank" 
                                rel="noreferrer"
                                className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
                            >
                                Open Link <LuExternalLink size={12} />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

    </main>
  );
}
