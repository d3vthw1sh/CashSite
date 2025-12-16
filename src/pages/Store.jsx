// src/pages/Store.jsx
import { motion } from "framer-motion";
import storeData from "../data/store.json";

// Helper: Get YouTube ID
function getYoutubeId(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export default function Store() {
  return (
    <main className="pt-28 pb-24 px-6 min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-light tracking-tight mb-20 md:mb-32"
        >
          store
        </motion.h1>

        {/* FEED LAYOUT */}
        <div className="space-y-32 md:space-y-48">
          {storeData.releases.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col gap-8"
            >
              {/* 1. MEDIA */}
              {item.video_link && (
                 <div className="aspect-video w-full bg-black/5 dark:bg-white/5 rounded-sm overflow-hidden">
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube-nocookie.com/embed/${getYoutubeId(item.video_link)}`}
                        title={item.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    />
                 </div>
              )}

              {/* 2. DETAILS */}
              <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                  {/* Left: Header & Buy */}
                  <div className="md:w-1/3 space-y-6">
                      <div>
                          <h2 className="text-3xl font-light tracking-tight leading-none mb-2">
                              {item.title}
                          </h2>
                          <div className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
                              {item.type} // {item.artist}
                          </div>
                      </div>

                      {item.store_link && (
                          <a 
                              href={item.store_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-medium hover:opacity-80 transition-opacity"
                          >
                              Get on Gumroad ↗
                          </a>
                      )}
                  </div>

                  {/* Right: Description & Credits */}
                  <div className="md:w-2/3 space-y-8">
                       <p className="text-base md:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300 font-light">
                           {item.description}
                       </p>

                       {/* Credits Grid */}
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm text-neutral-600 dark:text-neutral-400">
                           {/* Includes */}
                           {item.content && (
                               <div className="space-y-2">
                                   <strong className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">Includes</strong>
                                   <ul className="space-y-0.5">
                                      {item.content.samples_count && <li>{item.content.samples_count} Samples</li>}
                                      {item.content.sound_design_sessions && <li>{item.content.sound_design_sessions} Design Sessions</li>}
                                   </ul>
                               </div>
                           )}

                           {/* Credits */}
                           {(item.artwork || item.collaboration) && (
                               <div className="space-y-2">
                                   <strong className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">Credits</strong>
                                   <ul className="space-y-0.5">
                                       {item.artwork?.map((a, idx) => (
                                           <li key={idx}>Art: {a.link ? <a href={a.link} target="_blank" className="hover:underline">{a.artist}</a> : a.artist}</li>
                                       ))}
                                       {item.collaboration && (
                                           <li>Label: <a href={item.collaboration.label_link} target="_blank" className="hover:underline">{item.collaboration.label}</a></li>
                                       )}
                                   </ul>
                               </div>
                           )}
                           
                           {/* Demos */}
                           {item.demo_artists && (
                               <div className="col-span-1 sm:col-span-2 space-y-2">
                                   <strong className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">Demos By</strong>
                                   <div className="flex flex-wrap gap-x-4 gap-y-1">
                                       {item.demo_artists.map((d, idx) => (
                                           <a key={idx} href={d.link} target="_blank" className="hover:text-black dark:hover:text-white transition-colors">
                                               {d.name}
                                           </a>
                                       ))}
                                   </div>
                               </div>
                           )}
                       </div>
                  </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Support Link */}
        {storeData.support && (
            <div className="mt-32 md:mt-48 pt-12 border-t border-black/5 dark:border-white/5">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-8 md:p-12 bg-neutral-100 dark:bg-neutral-900 rounded-lg text-center space-y-4"
                >
                     <h3 className="text-2xl md:text-3xl font-light">
                        Support the work
                     </h3>
                     <p className="text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto font-light">
                        If you enjoy these tools and sounds, consider joining the {storeData.support.platform} community.
                     </p>
                     <div className="pt-4">
                        <a 
                            href={storeData.support.link}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-block px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-medium hover:opacity-80 transition-opacity"
                        >
                            Join on {storeData.support.platform} ↗
                        </a>
                    </div>
                </motion.div>
            </div>
        )}
      </div>
    </main>
  );
}
