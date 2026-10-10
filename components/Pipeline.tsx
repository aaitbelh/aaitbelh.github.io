"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Terminal } from "./Terminal";
import { stages } from "@/lib/data";

type Status = "pending" | "running" | "passed";
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export function Pipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();
  const [run, setRun] = useState(0);
  const [status, setStatus] = useState<Status[]>(stages.map(() => "pending"));
  const [log, setLog] = useState<{ stage: string; text: string }[]>([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!inView) return;

    setStatus(stages.map(() => "pending"));
    setLog([]);
    setFinished(false);

    if (reduce) {
      setStatus(stages.map(() => "passed"));
      setLog(stages.flatMap((s) => s.log.map((text) => ({ stage: s.id, text }))));
      setFinished(true);
      return;
    }

    let cancelled = false;
    (async () => {
      await sleep(400);
      for (let i = 0; i < stages.length; i++) {
        if (cancelled) return;
        setStatus((s) => s.map((v, idx) => (idx === i ? "running" : v)));
        for (const text of stages[i].log) {
          if (cancelled) return;
          setLog((l) => [...l, { stage: stages[i].id, text }].slice(-9));
          await sleep(480);
        }
        setStatus((s) => s.map((v, idx) => (idx === i ? "passed" : v)));
        await sleep(260);
      }
      if (!cancelled) setFinished(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [inView, run, reduce]);

  return (
    <div ref={ref}>
      <div className="pipe-top">
        <p className="note" style={{ margin: 0 }}>
          illustrative run of the pipeline structure I operate
        </p>
        <button className="btn" onClick={() => setRun((r) => r + 1)} aria-label="Replay pipeline run">
          ↻ replay run
        </button>
      </div>

      <ol className="stages" style={{ listStyle: "none", padding: 0, margin: "0 0 18px" }}>
        {stages.map((s, i) => (
          <li key={s.id} className={`stage ${status[i]}`}>
            <span className="ico" aria-hidden="true">
              {status[i] === "passed" ? "✓" : i + 1}
            </span>
            <b>{s.label}</b>
            <small>{status[i]}</small>
          </li>
        ))}
      </ol>

      <Terminal title="workflow: build-and-release" className="pipe-log">
        {log.map((l, i) => (
          <div className="ln out" key={`${l.stage}-${i}-${l.text}`}>
            <span className="out info">[{l.stage}]</span> {l.text}
          </div>
        ))}
        {finished && <div className="ln out ok">✔ release complete — all gates passed</div>}
        {!finished && inView && <div className="ln"><span className="caret" /></div>}
      </Terminal>
    </div>
  );
}
