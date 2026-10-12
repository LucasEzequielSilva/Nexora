"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/* Las animaciones de framer-motion respetan la preferencia "reducir movimiento"
   del sistema; sin esa preferencia no cambia nada. */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
