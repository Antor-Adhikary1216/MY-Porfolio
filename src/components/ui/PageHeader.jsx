import { motion } from "framer-motion";

export default function PageHeader({ eyebrow, title, description }) {
  return (
    <header className="container-shell pb-12 pt-32 sm:pb-16 sm:pt-40">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-3xl"
      >
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-accent">
          {eyebrow}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">{description}</p>}
      </motion.div>
    </header>
  );
}
