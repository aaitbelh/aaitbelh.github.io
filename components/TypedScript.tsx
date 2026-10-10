"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Prompt } from "./Terminal";

export type Tone = "plain" | "ok" | "dim" | "warn" | "info" | "err";
export type Step =
  | { kind: "cmd"; text: string; pause?: number }
  | { kind: "out"; lines: string[]; tone?: Tone; gap?: number };

type Line = { kind: "cmd" | "out"; text: string; tone?: Tone };

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function flatten(steps: Step[]): Line[] {
  const out: Line[] = [];
  for (const s of steps) {
    if (s.kind === "cmd") out.push({ kind: "cmd", text: s.text });
    else for (const text of s.lines) out.push({ kind: "out", text, tone: s.tone });
  }
  return out;
}

export function TypedScript({
  steps,
  speed = 34,
  minHeight,
}: {
  steps: Step[];
  speed?: number;
  minHeight?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const [lines, setLines] = useState<Line[]>([]);
  const [typing, setTyping] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    setLines([]);
    setTyping(null);
    setDone(false);

    if (reduce) {
      setLines(flatten(steps));
      setDone(true);
      return;
    }

    let cancelled = false;
    (async () => {
      await sleep(350);
      for (const step of steps) {
        if (cancelled) return;
        if (step.kind === "cmd") {
          for (let i = 1; i <= step.text.length; i++) {
            if (cancelled) return;
            setTyping(step.text.slice(0, i));
            await sleep(speed + Math.random() * 40);
          }
          await sleep(step.pause ?? 280);
          if (cancelled) return;
          setLines((l) => [...l, { kind: "cmd", text: step.text }]);
          setTyping(null);
        } else {
          for (const text of step.lines) {
            if (cancelled) return;
            setLines((l) => [...l, { kind: "out", text, tone: step.tone }]);
            await sleep(step.gap ?? 140);
          }
          await sleep(260);
        }
      }
      if (!cancelled) setDone(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [inView, reduce, steps, speed]);

  return (
    <div ref={ref} style={{ minHeight }} aria-live="polite">
      {lines.map((l, i) =>
        l.kind === "cmd" ? (
          <div className="ln" key={i}>
            <Prompt /> <span className="cm">{l.text}</span>
          </div>
        ) : (
          <div className={`ln out ${l.tone ?? "plain"}`} key={i}>
            {l.text || " "}
          </div>
        ),
      )}
      {typing !== null && (
        <div className="ln">
          <Prompt /> <span className="cm">{typing}</span>
          <span className="caret" />
        </div>
      )}
      {done && (
        <div className="ln">
          <Prompt /> <span className="caret" />
        </div>
      )}
    </div>
  );
}
