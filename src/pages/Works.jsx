import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import portfolioData from "../data/portfolio.json";
import { LuX, LuExternalLink, LuPlay } from "react-icons/lu";
import AsciiText from "../components/AsciiText";

/* -----------------------------------------
   Embed Component
----------------------------------------- */
function EmbedPlayer({ work }) {
  const { type, embedId, link, isTrack } = work;

  if (!embedId) {
    return (
      <div className="w-full h-40 bg-neutral-100 dark:bg-neutral-900 rounded-lg flex flex-col items-center justify-center gap-3 border border-black/5 dark:border-white/5">
        <p className="text-black/40 dark:text-white/40 text-sm">No preview available</p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-full text-xs uppercase tracking-widest hover:opacity-80 transition-opacity"
        >
          <span>Listen on {type || "Web"}</span>
          <LuExternalLink />
        </a>
      </div>
    );
  }

  if (type === "spotify") {
    return (
      <iframe
        style={{ borderRadius: "12px" }}
        src={`https://open.spotify.com/embed/${isTrack ? "track" : "album"}/${embedId}?utm_source=generator&theme=0`}
        width="100%"
        height="352"
        frameBorder="0"
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="bg-transparent"
      />
    );
  }

  if (type === "youtube") {
    return (
      <div className="aspect-video w-full rounded-xl overflow-hidden">
        <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${embedId}`}
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
        src={`https://bandcamp.com/EmbeddedPlayer/album=${embedId}/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/`}
        seamless
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
  { id: "engineering", label: "Engineering", keywords: ["recording", "engineering", "tracking"] },
  { id: "immersive", label: "Immersive", keywords: ["immersive", "dolby", "spatial"] },
  { id: "scoring", label: "Scoring", keywords: ["scoring", "film", "picture"] },
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
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-28 pb-20 px-6 md:px-12 relative transition-colors duration-300">
      
      {/* Subtle Noise Texture Background (Dark Mode Only) */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay hidden dark:block" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-4 uppercase">
                    <AsciiText text="Selected Works" />
                </h1>
                <p className="text-black/40 dark:text-white/40 text-lg max-w-xl leading-relaxed">
                    A curated collection of production, mixing, and mastering projects.
                </p>
            </motion.div>

            {/* Filters */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-2 lg:justify-end max-w-2xl"
            >
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveFilter(cat.id)}
                        className={`
                            px-4 py-2 rounded-lg text-xs uppercase tracking-widest transition-all duration-300 border
                            ${activeFilter === cat.id 
                                ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white font-medium" 
                                : "bg-black/5 text-black/60 border-transparent hover:bg-black/10 hover:text-black dark:bg-white/5 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"}
                        `}
                    >
                        {cat.label}
                    </button>
                ))}
            </motion.div>
        </div>

        {/* Grid Layout */}
        <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16"
        >
            <AnimatePresence mode="popLayout">
                {filteredWorks.map((work, i) => (
                    <motion.div
                        layout
                        key={work.title + i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="group cursor-pointer flex flex-col gap-4"
                        onClick={() => setSelectedWork(work)}
                    >
                        {/* Image Container */}
                        <div className="relative aspect-square overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900 shadow-lg border border-black/5 dark:border-white/5">
                            {work.img ? (
                                <img 
                                    src={work.img} 
                                    alt={work.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-neutral-200 dark:bg-neutral-800">
                                    <span className="text-black/20 dark:text-white/20 text-xs uppercase tracking-widest">No Cover</span>
                                </div>
                            )}
                            
                            {/* Play Icon Overlay */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-black shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                                    <LuPlay className="fill-current ml-1" size={20} />
                                </div>
                            </div>
                        </div>

                        {/* Info Below Image */}
                        <div className="flex flex-col gap-1">
                            <h3 className="text-lg font-medium text-black/90 dark:text-white/90 leading-tight group-hover:text-black dark:group-hover:text-white transition-colors">
                                <AsciiText text={work.title} enableOnHover={true} />
                            </h3>
                            <p className="text-sm text-black/50 dark:text-white/50">
                                {work.artist}
                            </p>
                            
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mt-2">
                                {work.tags?.slice(0, 3).map((tag, idx) => (
                                    <span 
                                        key={idx} 
                                        className="text-[10px] uppercase tracking-wider text-black/40 bg-black/5 dark:text-white/40 dark:bg-white/5 px-2 py-1 rounded-md"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>

        {filteredWorks.length === 0 && (
            <div className="py-32 text-center text-black/30 dark:text-white/30 uppercase tracking-widest">
                No works found.
            </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedWork && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-10 bg-white/80 dark:bg-black/80 backdrop-blur-xl"
                onClick={() => setSelectedWork(null)}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden max-w-5xl w-full max-h-[90vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl"
                >
                    {/* Image Side */}
                    <div className="md:w-5/12 bg-neutral-100 dark:bg-neutral-950 p-8 flex flex-col justify-center items-center relative overflow-hidden">
                        {/* Blurry Background */}
                        {selectedWork.img && (
                            <img 
                                src={selectedWork.img} 
                                className="absolute inset-0 w-full h-full object-cover opacity-20 blur-2xl scale-150" 
                            />
                        )}
                        
                        <div className="relative z-10 w-full aspect-square max-w-sm shadow-2xl rounded-lg overflow-hidden border border-black/10 dark:border-white/10">
                             {selectedWork.img ? (
                                <img src={selectedWork.img} className="w-full h-full object-cover" />
                             ) : (
                                <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800" />
                             )}
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="md:w-7/12 p-8 md:p-12 bg-white dark:bg-neutral-900 flex flex-col">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-light mb-2 text-black dark:text-white">
                                    <AsciiText text={selectedWork.title} />
                                </h2>
                                <p className="text-black/50 dark:text-white/50 text-lg">{selectedWork.artist}</p>
                            </div>
                            <button 
                                onClick={() => setSelectedWork(null)}
                                className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors text-black dark:text-white"
                            >
                                <LuX size={24} />
                            </button>
                        </div>

                        <div className="flex-wrap gap-2 mb-8 hidden md:flex">
                            {selectedWork.tags?.map((tag, idx) => (
                                <span key={idx} className="px-3 py-1 bg-black/5 dark:bg-white/5 rounded-full text-xs uppercase tracking-wider text-black/60 dark:text-white/60">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex-1 flex flex-col">
                             {selectedWork.awards && (
                                <div className="mb-8">
                                    <p className="text-xs uppercase tracking-widest text-yellow-600 dark:text-yellow-500/80 mb-2">Recognition</p>
                                    <ul className="space-y-1">
                                        {selectedWork.awards.map((award, i) => (
                                            <li key={i} className="text-sm text-black/90 dark:text-white/90 border-l-2 border-yellow-500/50 pl-3">
                                                {award}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                             )}
                             
                             <div className="mt-auto">
                                <EmbedPlayer work={selectedWork} />
                             </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
