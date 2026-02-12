"use client";

import { motion } from "framer-motion";

export default function TopBar() {
  return (
    <div className="text-center py-3 px-5 bg-gradient-to-r from-[#22c55e] via-[#10b981] to-[#059669] font-semibold text-sm tracking-wide text-black uppercase">
      <motion.span
        animate={{ opacity: [1, 0.7, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        &#9889; Llamadas estrategicas limitadas — Solo aceptamos 10 negocios por mes
      </motion.span>
    </div>
  );
}
