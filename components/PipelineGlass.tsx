"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type S = "pending" | "running" | "done";
type Run = { time: string; name: string; dur: string };

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const hhmmss = (d: Date) => d.toTimeString().slice(0, 8);

const initialRuns: Run[] = [
  { time: "09:41:02", name: "main · build-and-release", dur: "129 s" },
  { time: "09:38:57", name: "main · build-and-release", dur: "141 s" },
  { time: "09:31:14", name: "feature/ingress · build", dur: "118 s" },
];

const COLOR: Record<S, string> = { pending: "#6b645d", running: "#ffb347", done: "#3ddc97" };

function Node({
  x, y, w = 168, h = 60, title, sub, status,
}: { x: number; y: number; w?: number; h?: number; title: string; sub: string; status: S }) {
  return (
    <g>
      <rect
        x={x} y={y} width={w} height={h} rx={13}
        fill="rgba(255,255,255,0.07)"
        stroke={status === "running" ? "rgba(255,179,71,0.75)" : "rgba(255,255,255,0.16)"}
        strokeWidth={1.2}
      />
      <rect x={x} y={y} width={w} height={h} rx={13} fill="url(#nodeShine)" />
      <text x={x + 16} y={y + 26} fill="#f4efe9" fontSize="14.5" fontWeight="600" fontFamily="var(--sans)">{title}</text>
      <text x={x + 16} y={y + 45} fill="#9b9288" fontSize="11" fontFamily="var(--mono)">{sub}</text>
      <circle cx={x + w - 16} cy={y + 17} r={4} fill={COLOR[status]}>
        {status === "running" && <animate attributeName="opacity" values="1;.3;1" dur="1s" repeatCount="indefinite" />}
      </circle>
    </g>
  );
}

function Edge({ d, active, done }: { d: string; active: boolean; done: boolean }) {
  return (
    <g>
      <path d={d} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth={1.6} />
      {(active || done) && (
        <>
          <path d={d} fill="none" stroke="#ff9a3c" strokeOpacity={done ? 0.55 : 0.9} strokeWidth={2} filter="url(#glow)" />
          {active && !done && (
            <path d={d} fill="none" stroke="#fff3e0" strokeWidth={2.4} strokeLinecap="round" className="gp-flow" />
          )}
        </>
      )}
    </g>
  );
}

function Pill({ x, y, text }: { x: number; y: number; text: string }) {
  const w = text.length * 6.6 + 18;
  return (
    <g>
      <rect x={x} y={y} width={w} height={20} rx={6} fill="rgba(18,14,10,0.85)" stroke="rgba(255,255,255,0.18)" />
      <text x={x + w / 2} y={y + 14} textAnchor="middle" fill="#cfc6bb" fontSize="10.5" fontFamily="var(--mono)">{text}</text>
    </g>
  );
}

export function PipelineGlass() {
  const reduce = useReducedMotion();
  const [st, setSt] = useState<S[]>(["pending", "pending", "pending", "pending"]); // push, tests, scan, deploy
  const [pct, setPct] = useState(0);
  const [runs, setRuns] = useState<Run[]>(initialRuns);

  useEffect(() => {
    if (reduce) {
      setSt(["done", "done", "done", "done"]);
      setPct(100);
      return;
    }
    let cancelled = false;
    (async () => {
      let n = 0;
      while (!cancelled) {
        setSt(["pending", "pending", "pending", "pending"]);
        setPct(0);
        await sleep(900);
        if (cancelled) return;
        setSt(["running", "pending", "pending", "pending"]);
        setPct(8);
        await sleep(1100);
        if (cancelled) return;
        setSt(["done", "running", "running", "pending"]);
        setPct(28);
        await sleep(1700);
        if (cancelled) return;
        setSt(["done", "done", "running", "pending"]);
        setPct(54);
        await sleep(900);
        if (cancelled) return;
        setSt(["done", "done", "done", "running"]);
        setPct(78);
        await sleep(1500);
        if (cancelled) return;
        setSt(["done", "done", "done", "done"]);
        setPct(100);
        n += 1;
        setRuns((r) => [{ time: hhmmss(new Date()), name: "main · build-and-release", dur: `${112 + ((n * 17) % 46)} s` }, ...r].slice(0, 3));
        await sleep(3200);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [reduce]);

  const running = st.some((s) => s === "running");
  const allDone = st.every((s) => s === "done");

  return (
    <div className="gp" aria-label="Illustrative CI/CD pipeline dashboard">
      <div className="gp-panel">
        <div className="gp-head">
          <span className="gp-title">build-and-release</span>
          <span className="gp-sep" />
          <span className="gp-meta">4 jobs / 1 fan-in</span>
          <span className={`gp-status ${running ? "run" : allDone ? "ok" : ""}`}>{running ? "running" : allDone ? "passed" : "queued"}</span>
        </div>
        <div className="gp-pct" aria-hidden="true">{pct}%</div>

        <div className="gp-body">
          <div className="gp-tools" aria-hidden="true">
            <span>↖</span><span>＋</span><span>⑂</span>
          </div>
          <svg viewBox="0 0 616 268" className="gp-svg" role="img" aria-label="Pipeline graph: push to main fans out to tests and security scan, then deploys to staging">
            <defs>
              <linearGradient id="nodeShine" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fff" stopOpacity="0.10" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* edges: push -> tests / scan -> deploy */}
            <Edge d="M164 120 C 210 120, 206 62, 250 62" active={st[1] === "running"} done={st[1] === "done"} />
            <Edge d="M164 120 C 210 120, 206 206, 250 206" active={st[2] === "running"} done={st[2] === "done" || st[3] !== "pending"} />
            <Edge d="M418 62 C 455 62, 452 126, 490 126" active={st[3] === "running"} done={st[3] === "done"} />
            <Edge d="M418 206 C 455 206, 452 134, 490 134" active={st[3] === "running"} done={st[3] === "done"} />

            <Pill x={184} y={34} text="test" />
            <Pill x={182} y={214} text="scan" />

            <Node x={14} y={90} w={150} title="Push to main" sub="github · trigger" status={st[0]} />
            <Node x={250} y={32} w={168} title="Tests + gate" sub="sonarqube · condition" status={st[1]} />
            <Node x={250} y={176} w={168} title="Security scan" sub="trivy · images + deps" status={st[2]} />
            <Node x={490} y={100} w={118} h={60} title="Staging" sub="k3s" status={st[3]} />

            <Pill x={486} y={170} text={st[3] === "done" ? "deployed" : st[3] === "running" ? "rolling out" : "waiting on gates"} />
          </svg>
        </div>

        <div className="gp-runs">
          <div className="gp-lbl">last runs <i>(illustrative)</i></div>
          {runs.map((r, i) => (
            <div className="gp-run" key={`${r.time}-${i}`}>
              <span className="gp-dot" />
              <span className="gp-time">{r.time}</span>
              <span className="gp-name">{r.name}</span>
              <span className="gp-dur">{r.dur}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
