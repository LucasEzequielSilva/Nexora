"use client";

import { motion } from "framer-motion";

const CAL_LINK = "nexoragrowth/30min";

export default function TopBar() {
  return (
    <button
      data-cal-namespace="30min"
      data-cal-link={CAL_LINK}
      data-cal-config='{"layout":"month_view"}'
      className="w-full text-center py-3 px-5 bg-gradient-to-r from-[#22c55e] via-[#10b981] to-[#059669] font-semibold text-sm tracking-wide text-black uppercase cursor-pointer hover:brightness-110 transition-all duration-200"
    >
      <motion.span
        animate={{ opacity: [1, 0.7, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        &#9889; Solo quedan 3 cupos este mes &mdash; +127 negocios ya generan clientes con Nexora
      </motion.span>
    </button>
  );
}
