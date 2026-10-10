"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Terminal } from "./Terminal";
import { projects } from "@/lib/data";

export function Projects() {
  const [sel, setSel] = useState(0);
  const reduce = useReducedMotion();
  const p = projects[sel];

  return (
    <div className="proj">
      <Terminal title="kubectl get projects -o wide">
        <div className="row head" aria-hidden="true">
          <span>NAME</span>
          <span>KIND</span>
          <span className="col3">STATUS</span>
        </div>
        {projects.map((x, i) => (
          <button
            key={x.id}
            className="row"
            aria-pressed={sel === i}
            onClick={() => setSel(i)}
            onMouseEnter={() => setSel(i)}
            onFocus={() => setSel(i)}
          >
            <span>{x.id}</span>
            <span style={{ color: "var(--muted)" }}>{x.kind}</span>
            <span className="status col3">
              <span className={`pulse ${x.status === "Running" ? "run" : "done"}`} />
              {x.status}
            </span>
          </button>
        ))}
        <p className="note" style={{ marginBottom: 0 }}>
          hover or focus a row to describe it
        </p>
      </Terminal>

      <Terminal title={`kubectl describe project ${p.id}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={p.id}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            <div className="kv">
              <span className="k">Name:</span>
              <span>{p.name}</span>
              <span className="k">Kind:</span>
              <span>{p.kind}</span>
              <span className="k">Status:</span>
              <span className="status">
                <span className={`pulse ${p.status === "Running" ? "run" : "done"}`} />
                {p.status}
              </span>
              <span className="k">Stack:</span>
              <span className="tags">
                {p.stack.map((s) => (
                  <span className="tag" key={s}>
                    {s}
                  </span>
                ))}
              </span>
            </div>
            <div className="ln out dim" style={{ marginTop: 12 }}>
              Description:
            </div>
            <div className="ln out" style={{ marginBottom: 8 }}>
              {p.summary}
            </div>
            <div className="ln out dim">Highlights:</div>
            <ul className="pl">
              {p.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
            <div className="ln" style={{ marginTop: 12 }}>
              {p.repo ? (
                <a href={p.repo} target="_blank" rel="noreferrer">
                  → {p.repo.replace("https://", "")}
                </a>
              ) : (
                <span className="out dim">repo: private / coursework</span>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </Terminal>
    </div>
  );
}
