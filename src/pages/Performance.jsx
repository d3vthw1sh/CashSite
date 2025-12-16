// src/pages/Performance.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import performanceData from "../data/performance.json";

// Helper to extract YouTube ID
function getYoutubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

// Subcomponent for Details to reuse in both layouts
function ProjectDetails({ project }) {
  if (!project) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Video Embed */}
      {project.link && getYoutubeId(project.link) && (
        <div className="aspect-video w-full bg-black/5 dark:bg-white/5 rounded-xl overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube-nocookie.com/embed/${getYoutubeId(project.link)}`}
            title={project.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* Info Header */}
      <div className="space-y-2">
        <h2 className="text-2xl md:text-4xl font-light tracking-tight">
          {project.title}
        </h2>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs md:text-sm text-neutral-500 dark:text-neutral-400 font-mono uppercase tracking-wider">
          {project.type && <span>{project.type}</span>}
          {project.date && <span>// {project.date}</span>}
          {project.location && <span>// {project.location}</span>}
        </div>
      </div>

      {/* Description */}
      {project.description && (
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed font-light text-sm md:text-base">
          {project.description}
        </p>
      )}

      {/* Credits / Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-black/5 dark:border-white/5">
        {project.credits && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              Credits
            </h3>
            <ul className="space-y-1 text-xs md:text-sm text-neutral-600 dark:text-neutral-400">
              {Object.entries(project.credits).map(([role, name]) => (
                <li key={role}>
                  <span className="opacity-70 capitalize">
                    {role.replace(/_/g, " ")}:
                  </span>{" "}
                  {name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.tools && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              Tools
            </h3>
            <ul className="space-y-1 text-xs md:text-sm text-neutral-600 dark:text-neutral-400">
              {Object.entries(project.tools).map(([category, tools]) => (
                <li key={category}>
                  <span className="opacity-70 capitalize">
                    {category.replace(/_/g, " ")}:
                  </span>{" "}
                  {Array.isArray(tools) ? tools.join(", ") : tools}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

       {/* Roles */}
       {project.roles && (
          <div className="space-y-3 pt-4 border-t border-black/5 dark:border-white/5">
             <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              My Roles
            </h3>
             <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-neutral-600 dark:text-neutral-400">
              {project.roles.map((role, idx) => (
                  <li key={idx}>{role}</li>
              ))}
             </ul>
          </div>
       )}
    </div>
  );
}

export default function Performance() {
  const [activeTitle, setActiveTitle] = useState(performanceData.live[0]?.title || null);
  const [isMobile, setIsMobile] = useState(false);

  // Group data
  const groups = [
    { label: "Live", items: performanceData.live },
    { label: "Multimedia", items: performanceData.multimedia },
  ];

  // Helper to find project by title
  const getProject = (title) => {
    const all = [...groups[0].items, ...groups[1].items];
    return all.find((p) => p.title === title);
  };

  // Handle Resize for logic switching
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // init
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="pt-28 pb-24 px-6 min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-light tracking-tight mb-12"
        >
          performance
        </motion.h1>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
          
          {/* LEFT COLUMN: The List (Always visible) */}
          <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0 space-y-12">
            {groups.map((group) => (
              <div key={group.label} className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 border-b border-black/5 dark:border-white/5 pb-2">
                  {group.label}
                </h3>
                <ul className="flex flex-col gap-3">
                  {group.items.map((item) => {
                    const isActive = activeTitle === item.title;
                    return (
                      <div key={item.title}>
                        <motion.li
                          onClick={() => setActiveTitle(isActive ? null : item.title)}
                          className={`
                            text-lg font-light cursor-pointer select-none transition-colors duration-200
                            flex items-center justify-between group
                            ${isActive ? "text-black dark:text-white" : "text-neutral-500 dark:text-neutral-500 hover:text-black dark:hover:text-white"}
                          `}
                        >
                          <span>{item.title}</span>
                          <span className={`text-xs opacity-0 transition-opacity ${isActive ? 'opacity-100' : 'group-hover:opacity-50'}`}>
                            {isActive ? '●' : '→'}
                          </span>
                        </motion.li>

                        {/* MOBILE ACCORDION CONTENT */}
                        <AnimatePresence>
                          {isMobile && isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0, marginTop: 0 }}
                              animate={{ height: "auto", opacity: 1, marginTop: 24 }}
                              exit={{ height: 0, opacity: 0, marginTop: 0 }}
                              className="overflow-hidden border-b border-black/5 dark:border-white/5 pb-8 mb-4"
                            >
                              <ProjectDetails project={item} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN: Desktop Detail View (Hidden on Mobile) */}
          {!isMobile && (
             <div className="hidden md:block md:w-2/3 lg:w-3/4 min-h-[50vh]">
               <AnimatePresence mode="wait">
                 {activeTitle ? (
                   <motion.div
                     key={activeTitle}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                     transition={{ duration: 0.3 }}
                   >
                     <ProjectDetails project={getProject(activeTitle)} />
                   </motion.div>
                 ) : (
                   <motion.div 
                     initial={{ opacity: 0 }} 
                     animate={{ opacity: 1 }}
                     className="h-full flex items-center justify-center text-neutral-400 font-light italic"
                   >
                     Select a project to view details.
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
          )}

        </div>
      </div>
    </main>
  );
}
