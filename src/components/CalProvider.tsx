"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

// Single Cal.com initializer — rendered once in page.tsx
// Prevents duplicate getCalApi("30min") calls when CTACard renders multiple times
export default function CalProvider() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", { theme: "dark", hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);
  return null;
}
