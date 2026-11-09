"use client";

import { useEffect, useRef } from "react";
const BUILD_YEAR = 2026;
export default function CurrentYear() {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = String(new Date().getFullYear());
    }
  }, []);
  return <span ref={ref}>{BUILD_YEAR}</span>;
}
