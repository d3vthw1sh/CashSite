import { useEffect, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useVelocity,
  useSpring,
} from "framer-motion";
import { Link } from "react-router-dom";

/* -----------------------------------------
   Mouse Trail Component
----------------------------------------- */
function MouseTrail() {
  const [trail, setTrail] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMove = (e) => {
      setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const id = `${Date.now()}-${Math.random()}`;
      setTrail((prev) => [
        ...prev.slice(-15),
        { id, x: e.clientX, y: e.clientY },
      ]);

      setTimeout(() => {
        setTrail((prev) => prev.filter((p) => p.id !== id));
      }, 500);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {trail.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute w-1.5 h-1.5 rounded-full bg-white/40 blur-[1px]"
          style={{ left: p.x, top: p.y }}
        />
      ))}
    </div>
  );
}

/* -----------------------------------------
   Draggable Slider Gallery Component
----------------------------------------- */
function DraggableGallery() {
  const images = [
    "studiophoto.jpg",
    "studiophoto1.jpg",
    "studiophoto2.jpg",
    "studiophoto3.JPG",
    "studiophoto4.jpg",
    "studiophoto5.jpg",
  ];

  const x = useMotionValue(0);
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      // Calculate drag constraints: total scroll width - visible width
      setWidth(
        containerRef.current.scrollWidth - containerRef.current.offsetWidth
      );
    }
  }, []);

  return (
    <div className="relative w-full bg-black py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-thin tracking-tight text-white/90"
        >
          The Studio
        </motion.h2>
        <p className="mt-4 text-white/40 text-sm tracking-widest uppercase">
          Drag to Explore
        </p>
      </div>

      <motion.div
        ref={containerRef}
        className="cursor-grab active:cursor-grabbing"
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          style={{ x }}
          className="flex gap-8 px-6 md:px-20 w-max"
        >
          {images.map((img, i) => (
            <GalleryItem key={i} img={img} i={i} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

function GalleryItem({ img, i }) {
  return (
    <motion.div
      className="relative w-[80vw] md:w-[600px] h-[50vh] md:h-[60vh] rounded-2xl overflow-hidden bg-neutral-900 shadow-2xl border border-white/5 group"
      whileHover={{ scale: 0.98 }}
      transition={{ duration: 0.4 }}
    >
      <img
        src={`/assets/home/${img}`}
        alt={`Studio ${i}`}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 pointer-events-none"
      />
      <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-xs font-mono text-white/90 uppercase tracking-widest">
          View 0{i + 1}
        </span>
      </div>
    </motion.div>
  );
}

/* -----------------------------------------
   MAIN HOME COMPONENT
----------------------------------------- */
export default function Home() {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const htmlEl = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDark(htmlEl.classList.contains("dark"));
    });
    observer.observe(htmlEl, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Text Reveal Variants
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const letterVars = {
    hidden: { y: 100, opacity: 0, rotate: 10 },
    show: {
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  return (
    <main className="relative w-full min-h-screen bg-black text-white overflow-x-hidden">
      <MouseTrail />

      {/* -------------------------
           HERO SECTION
      -------------------------- */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img
              key="hero-image"
              src="/assets/assets/cash image.jpg"
              alt="Hero Background"
              className="w-full h-full object-cover opacity-60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 1.5 }}
            />
          </AnimatePresence>
          {/* Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6">
          <motion.h1
            variants={containerVars}
            initial="hidden"
            animate="show"
            className="text-[15vw] leading-none font-light tracking-tighter mix-blend-overlay text-white/90 select-none"
          >
            {"cash".split("").map((char, i) => (
              <motion.span
                key={i}
                variants={letterVars}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-8 space-y-2"
          >
            <p className="text-lg md:text-xl font-light tracking-widest uppercase text-white/70">
              Artist &bull; Producer &bull; Technologist
            </p>
            <p className="text-sm text-white/40 tracking-wide">New York City</p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest text-white/50">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0"
          />
        </motion.div>
      </section>



      {/* -------------------------
           DRAGGABLE GALLERY SECTION
      -------------------------- */}
      <DraggableGallery />

      {/* -------------------------
           FOOTER / CONTACT TEASER
      -------------------------- */}
      <section className="relative z-10 py-32 bg-black flex items-center justify-center">
        <div className="text-center px-6">
          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1 }}
            className="text-2xl md:text-4xl font-light text-white/60 max-w-2xl mx-auto leading-relaxed"
          >
            "Between noise and silence."
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <Link
              to="/contact"
              className="inline-block px-8 py-3 border border-white/20 rounded-full text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
