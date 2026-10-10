"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PipelineGlass } from "./PipelineGlass";
import { Streams } from "./Streams";
import { profile } from "@/lib/data";

const line1 = ["Pipelines", "that", "ship."];
const line2 = ["Platforms", "that", "hold."];

function Words({ words, base = 0, dim = false }: { words: string[]; base?: number; dim?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <>
      {words.map((w, i) => (
        <span className="word" key={w + i} style={{ marginRight: ".22em" }}>
          <motion.span
            className={dim ? "dim" : undefined}
            initial={reduce ? false : { y: "110%", rotate: 4 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: base + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const fade = (d: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="hero-wrap" id="top">
      <Streams />

      <section className="wrap hero" style={{ paddingTop: 40 }}>
        <div>
          <motion.span className="kicker" {...fade(0)}>
            <i /> available for new roles · {profile.role}
          </motion.span>
          <h1 aria-label="Pipelines that ship. Platforms that hold.">
            <span aria-hidden="true">
              <Words words={line1} base={0.1} />
              <br />
              <Words words={line2} base={0.45} dim />
            </span>
          </h1>
          <motion.p className="lead" {...fade(0.8)}>
            I&apos;m <b style={{ color: "var(--text)" }}>Ayoub Ait Belhaj</b>. I build and run CI/CD pipelines, Kubernetes
            platforms and secure infrastructure as code, and I own a production platform end to end.
          </motion.p>
          <motion.div {...fade(0.95)}>
            <div className="cta">
              <a className="btn primary" href="#projects">
                $ ls projects/
              </a>
              <a className="btn" href="#contact">
                $ ./contact.sh
              </a>
            </div>
            <div className="chips">
              <span className="chip">Morocco</span>
              <span className="chip">open to relocation &amp; remote</span>
              <span className="chip">English</span>
            </div>
          </motion.div>
        </div>

        <motion.div className="hero-right" {...fade(0.4)}>
          <PipelineGlass />
        </motion.div>
      </section>
    </div>
  );
}
