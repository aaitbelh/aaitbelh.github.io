"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Terminal, Prompt } from "./Terminal";
import { commits } from "@/lib/data";

export function GitLog() {
  const reduce = useReducedMotion();
  return (
    <Terminal title="git log --graph --stat">
      <div className="ln">
        <Prompt path="~/career" /> <span className="cm">git log --graph --stat</span>
      </div>
      <div className="git">
        {commits.map((c, i) => (
          <motion.div
            key={c.hash}
            initial={reduce ? false : { opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            style={{ marginTop: 10 }}
          >
            <div className="ln">
              <span className="graph">*</span>
              <span>
                <span className="hash">{c.hash}</span>{" "}
                {c.head && <span className="refs">(HEAD -&gt; main) </span>}
                <span className={`ctype ${c.type}`}>
                  {c.type}({c.scope})
                </span>
                : {c.msg}
              </span>
              <span className="cdate">{c.date}</span>
            </div>
            {c.body.map((b) => (
              <div className="ln gbody" key={b}>
                │ {b}
              </div>
            ))}
          </motion.div>
        ))}
      </div>
      <p className="note" style={{ marginBottom: 0 }}>
        commit hashes are decorative · the current platform is private
      </p>
    </Terminal>
  );
}
