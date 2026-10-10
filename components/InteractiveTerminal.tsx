"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Terminal, Prompt } from "./Terminal";
import { commits, profile, projects, skillGroups } from "@/lib/data";

type Out = { tone?: "ok" | "dim" | "warn" | "info" | "err"; node: ReactNode };
type Entry = { cmd: string; out: Out[] };

const text = (t: string, tone?: Out["tone"]): Out => ({ node: t, tone });
const link = (label: string, href: string): Out => ({
  node: (
    <a href={href} target="_blank" rel="noreferrer">
      {label}
    </a>
  ),
});

const COMMANDS = [
  "help", "whoami", "about", "ls", "projects", "skills", "experience", "contact",
  "kubectl get pods", "docker ps", "terraform plan", "git log", "open github", "open linkedin",
  "date", "clear",
];

function run(raw: string): Out[] | "clear" {
  const input = raw.trim();
  const [cmd, ...args] = input.split(/\s+/);
  const rest = args.join(" ");

  switch (cmd) {
    case "":
      return [];
    case "help":
      return [
        text("available commands:", "dim"),
        text("  whoami            who I am"),
        text("  about             short bio"),
        text("  ls [projects]     list files / projects"),
        text("  cat <project-id>  describe a project"),
        text("  skills            my toolbox"),
        text("  experience        recent work"),
        text("  contact           how to reach me"),
        text("  kubectl get pods  (demo) the stack I operate"),
        text("  docker ps         (demo) running services"),
        text("  terraform plan    (demo)"),
        text("  open github|linkedin"),
        text("  clear"),
      ];
    case "whoami":
      return [text("ayoub-ait-belhaj — DevOps / Platform Engineer", "ok")];
    case "about":
      return [
        text("I build and run delivery pipelines, Kubernetes platforms and secure"),
        text("infrastructure as code. I own a production platform end to end and"),
        text("came up through 1337 (42 Network): K3s from scratch, Ansible-automated"),
        text("cloud deployments and binary exploitation."),
        text(`Based in ${profile.location}. Open to relocation and remote roles.`, "dim"),
      ];
    case "ls":
      if (rest === "projects" || rest === "projects/")
        return projects.map((p) => text(p.id, "info"));
      return [text("projects/   skills.yaml   experience.log   contact.txt", "info")];
    case "cat": {
      const p = projects.find((x) => x.id === rest);
      if (p)
        return [
          text(`${p.name} — ${p.kind}`, "ok"),
          text(p.summary),
          ...p.points.map((pt) => text(`  • ${pt}`)),
          text(`stack: ${p.stack.join(", ")}`, "dim"),
          p.repo ? link(p.repo.replace("https://", ""), p.repo) : text("repo: private / coursework", "dim"),
        ];
      if (rest === "skills.yaml") return run("skills");
      if (rest === "experience.log") return run("experience");
      if (rest === "contact.txt") return run("contact");
      return [text(`cat: ${rest || "(missing)"}: no such file. try: ls projects`, "err")];
    }
    case "projects":
      return projects.map((p) => text(`${p.id.padEnd(22)} ${p.kind}`));
    case "skills":
      return skillGroups.map((g) => text(`${g.key.padEnd(14)} ${g.items.join(", ")}`));
    case "experience":
    case "git":
      if (cmd === "git" && rest !== "log" && rest !== "log --oneline")
        return [text("usage: git log", "dim")];
      return commits.slice(0, 6).map((c) => text(`${c.hash} ${c.type}(${c.scope}): ${c.msg}`));
    case "contact":
      return [
        text(`email     ${profile.email}`),
        link("github    github.com/aaitbelh", profile.github),
        link("linkedin  linkedin.com/in/aitbelhaj-ayoub", profile.linkedin),
      ];
    case "kubectl":
      if (rest === "get pods")
        return [
          text("NAME                      READY   STATUS    AGE", "dim"),
          text("web-6f7c9d8b5-x2k4p       1/1     Running   —"),
          text("worker-5d4b8c7f9-q8m2n    1/1     Running   —"),
          text("postgres-0                1/1     Running   —"),
          text("redis-0                   1/1     Running   —"),
          text("nginx-7c6d5b4f8-z9w3t     1/1     Running   —"),
          text("(demo output — the shape of the stack I run, not live data)", "dim"),
        ];
      return [text("usage: kubectl get pods", "dim")];
    case "docker":
      if (rest === "ps")
        return [
          text("CONTAINER   IMAGE         STATUS         PORTS", "dim"),
          text("a1b2c3d4e5   web:release   Up (healthy)   3000"),
          text("f6a7b8c9d0   worker        Up (healthy)   —"),
          text("0e1f2a3b4c   postgres      Up (healthy)   5432"),
          text("(demo output)", "dim"),
        ];
      return [text("usage: docker ps", "dim")];
    case "terraform":
      return [
        text("No changes. Infrastructure matches the configuration.", "ok"),
        text("Plan: 0 to add, 0 to change, 0 to destroy.", "dim"),
      ];
    case "date":
      return [text(new Date().toString())];
    case "open":
      if (rest === "github") {
        window.open(profile.github, "_blank", "noopener");
        return [text("opening github…", "dim")];
      }
      if (rest === "linkedin") {
        window.open(profile.linkedin, "_blank", "noopener");
        return [text("opening linkedin…", "dim")];
      }
      return [text("usage: open github|linkedin", "dim")];
    case "sudo":
      if (rest.startsWith("hire"))
        return [
          text("[sudo] permission granted.", "ok"),
          text("preparing offer letter… just kidding."),
          text(`the real way: ${profile.email}`, "warn"),
        ];
      return [text("ayoub is not in the sudoers file. This incident will be reported.", "err")];
    case "rm":
      return [text("nice try. read-only portfolio.", "warn")];
    case "clear":
      return "clear";
    default:
      return [text(`command not found: ${cmd}. type 'help'`, "err")];
  }
}

export function InteractiveTerminal() {
  const [history, setHistory] = useState<Entry[]>([
    { cmd: "", out: [text("Welcome. Type 'help' or click a command below.", "dim")] },
  ]);
  const [value, setValue] = useState("");
  const [past, setPast] = useState<string[]>([]);
  const [idx, setIdx] = useState(-1);
  const input = useRef<HTMLInputElement>(null);
  const body = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = body.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history]);

  function exec(cmd: string) {
    const res = run(cmd);
    if (res === "clear") {
      setHistory([]);
    } else {
      setHistory((h) => [...h, { cmd, out: res }]);
    }
    if (cmd.trim()) setPast((p) => [...p, cmd]);
    setIdx(-1);
    setValue("");
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") exec(value);
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const n = Math.min(past.length - 1, idx + 1);
      if (n >= 0) {
        setIdx(n);
        setValue(past[past.length - 1 - n]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const n = idx - 1;
      setIdx(n);
      setValue(n >= 0 ? past[past.length - 1 - n] : "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const m = COMMANDS.filter((c) => c.startsWith(value) && value);
      if (m.length === 1) setValue(m[0]);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
    }
  }

  return (
    <>
    <div className="term it" onClick={() => input.current?.focus()}>
      <div className="term-bar" aria-hidden="true">
        <span className="dot r" />
        <span className="dot y" />
        <span className="dot g" />
        <span className="term-title">ayoub@devops: ~ — interactive</span>
      </div>
      <div className="term-body" ref={body}>
        {history.map((h, i) => (
          <div key={i}>
            {h.cmd && (
              <div className="ln">
                <Prompt /> <span className="cm">{h.cmd}</span>
              </div>
            )}
            {h.out.map((o, j) => (
              <div className={`ln out ${o.tone ?? ""}`} key={j}>
                {o.node}
              </div>
            ))}
          </div>
        ))}
        <div className="inrow">
          <Prompt />
          <input
            ref={input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKey}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            aria-label="Terminal command input"
            placeholder="type a command…"
          />
        </div>
      </div>
    </div>
    <div className="sugg" aria-label="Quick commands">
      {["help", "about", "ls projects", "skills", "kubectl get pods", "contact", "sudo hire ayoub"].map((c) => (
        <button key={c} onClick={() => exec(c)}>
          $ {c}
        </button>
      ))}
    </div>
    </>
  );
}
