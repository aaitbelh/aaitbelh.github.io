"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Terminal, Prompt } from "./Terminal";
import { skillGroups } from "@/lib/data";

export function Skills() {
  const reduce = useReducedMotion();
  return (
    <Terminal title="cat skills.yaml">
      <div className="ln">
        <Prompt path="~/profile" /> <span className="cm">cat skills.yaml</span>
      </div>
      <div className="ln yp">---</div>
      <div className="ycols">
      {skillGroups.map((g, gi) => (
        <motion.div
          key={g.key}
          initial={reduce ? false : { opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: gi * 0.06 }}
        >
          <div className="ln">
            <span className="yk">{g.key}</span>
            <span className="yp">:</span>
          </div>
          {g.items.map((it) => (
            <div className="ln" key={it}>
              <span className="yp">{"  - "}</span>
              <span className="ys">{it}</span>
            </div>
          ))}
        </motion.div>
      ))}
      </div>
    </Terminal>
  );
}
