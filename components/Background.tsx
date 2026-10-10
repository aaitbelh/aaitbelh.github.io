"use client";

import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function Background() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        root.style.setProperty("--mx", `${e.clientX}px`);
        root.style.setProperty("--my", `${e.clientY}px`);
        root.style.setProperty("--px", `${(e.clientX / window.innerWidth - 0.5) * 2}`);
        root.style.setProperty("--py", `${(e.clientY / window.innerHeight - 0.5) * 2}`);
        const spot = (e.target as HTMLElement | null)?.closest<HTMLElement>(".spot, .term, .stage");
        if (spot) {
          const r = spot.getBoundingClientRect();
          spot.style.setProperty("--sx", `${e.clientX - r.left}px`);
          spot.style.setProperty("--sy", `${e.clientY - r.top}px`);
        }
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="bg" aria-hidden="true" />
      <motion.div className="progress" style={{ scaleX }} aria-hidden="true" />
    </>
  );
}
