import { Terminal } from "./Terminal";
import { TypedScript, type Step } from "./TypedScript";
import { Reveal } from "./Reveal";
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

export function Hero() {
  return (
    <section className="wrap hero" id="top">
      <div>
        <Reveal y={16}>
          <p className="eyebrow">{profile.role}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1>
            Ayoub
            <br />
            <span className="grad">Ait Belhaj</span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="lead">
            I build and run the pipelines, Kubernetes platforms and secure infrastructure that let software ship
            safely. I own a production platform end to end, from the first commit to the TLS certificate on the edge.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
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
        </Reveal>
      </div>

      <Reveal delay={0.2} y={32}>
        <Terminal title="ayoub@devops: ~ — zsh">
          <TypedScript steps={steps} minHeight={290} />
        </Terminal>
      </Reveal>
    </section>
  );
}
