import { motion, AnimatePresence } from "framer-motion";
import ServiceContent from "./ServiceContent";

export default function ServiceCard({ service, isOpen, onToggle }) {
  return (
    <motion.div
      layout
      onClick={onToggle}
      className="
        w-full border-b border-neutral-800 py-6 cursor-pointer
        text-neutral-300 select-none
      "
    >
      <motion.div layout className="flex justify-between items-center">
        <h2 className="text-2xl md:text-3xl font-light">{service.name}</h2>
        <span className="opacity-50">{isOpen ? "×" : ">"}</span>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden pt-6"
            onClick={(e) => e.stopPropagation()}
          >
            <ServiceContent service={service} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
