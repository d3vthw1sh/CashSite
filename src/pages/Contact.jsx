// src/pages/Contact.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className="pt-32 pb-24 px-6 min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={show ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-3xl mx-auto text-center"
      >
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-10">
          contact
        </h1>

        {/* Contact Info */}
        <div className="space-y-4 text-lg font-light text-neutral-600 dark:text-neutral-300">
          <p>
            ig:{" "}
            <span className="font-normal text-black dark:text-white">
              @isthiscash
            </span>
          </p>
          <p>
            tw:{" "}
            <span className="font-normal text-black dark:text-white">
              @isthiscash
            </span>
          </p>
          <p>
            bsky:{" "}
            <span className="font-normal text-black dark:text-white">
              @isthis.cash
            </span>
          </p>

          <p className="pt-2">
            email:{" "}
            <a
              href="mailto:isthiscash@proton.me"
              className="underline underline-offset-4 decoration-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            >
              isthiscash@proton.me
            </a>
          </p>

          <p>
            discord:{" "}
            <span className="font-normal text-black dark:text-white">
              @isthiscash
            </span>
          </p>

          <p className="pt-2">
            vgen:{" "}
            <a
              href="https://vgen.co/isthiscash"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            >
              isthiscash
            </a>
          </p>
          <p>
            patreon:{" "}
            <a
              href="https://www.patreon.com/isthiscash"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            >
              isthiscash
            </a>
          </p>
        </div>

        {/* Footer message */}
        <p className="mt-10 text-sm italic text-neutral-500 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
          please do not hesitate to contact me regarding inquiries for
          collaborations & commissioned work.
        </p>
      </motion.div>
    </main>
  );
}
