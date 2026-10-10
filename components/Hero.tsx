"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Terminal } from "./Terminal";
import { TypedScript, type Step } from "./TypedScript";
import { profile } from "@/lib/data";

const steps: Step[] = [
  { kind: "cmd", text: "whoami" },
  { kind: "out", lines: ["ayoub-ait-belhaj"], tone: "ok" },
  { kind: "cmd", text: "cat role.txt" },
  {
    kind: "out",
    lines: ["DevOps / Platform Engineer", "pipelines · kubernetes · iac · secure edge"],
  },
  { kind: "cmd", text: "terraform plan" },
  {
    kind: "out",
    lines: ["No changes. Infrastructure matches the configuration.", "Plan: 0 to add, 0 to change, 0 to destroy."],
    tone: "dim",
  },
  { kind: "cmd", text: "./status.sh" },
  {
    kind: "out",
    lines: ["✔ pipelines green", "✔ cluster healthy", "✔ certificates valid", "✔ open to new opportunities"],
    tone: "ok",
    gap: 220,
  },
];

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
      <div className="orb" aria-hidden="true">
        <div className="ring" />
        <div className="ring2" />
        <div className="core" />
      </div>

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

        <motion.div {...fade(0.5)}>
          <Terminal title="ayoub@devops: ~ — zsh" className="glass spot">
            <TypedScript steps={steps} minHeight={290} />
          </Terminal>
        </motion.div>
      </section>
    </div>
  );
}
