import { Background } from "@/components/Background";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { Pipeline } from "@/components/Pipeline";
import { GitLog } from "@/components/GitLog";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { InteractiveTerminal } from "@/components/InteractiveTerminal";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Background />
      <Nav />
      <main>
        <Hero />

        <section className="wrap" id="pipeline">
          <Reveal>
            <p className="eyebrow">how I ship</p>
            <h2>Every change passes the same gates.</h2>
            <p className="sub">
              This is the delivery path I designed and run: tests, a code-quality gate, a security scan, then staged
              promotion. Watch a run, or replay it.
            </p>
          </Reveal>
          <Pipeline />
        </section>

        <section className="wrap" id="experience">
          <Reveal>
            <p className="eyebrow">experience</p>
            <h2>My work, as a git log.</h2>
            <p className="sub">
              DevOps engineer on a production web platform since 2025, on top of a systems background from 1337 (42
              Network).
            </p>
          </Reveal>
          <GitLog />
        </section>

        <section className="wrap" id="projects">
          <Reveal>
            <p className="eyebrow">projects</p>
            <h2>Public work you can read.</h2>
            <p className="sub">
              The production code is private, so these repositories show the same practices: Kubernetes, GitOps,
              infrastructure as code and low-level security.
            </p>
          </Reveal>
          <Projects />
        </section>

        <section className="wrap" id="skills">
          <Reveal>
            <p className="eyebrow">skills</p>
            <h2>Toolbox.</h2>
          </Reveal>
          <Skills />
        </section>

        <section className="wrap" id="terminal">
          <Reveal>
            <p className="eyebrow">try it</p>
            <h2>Ask the terminal.</h2>
            <p className="sub">
              It is a real prompt. Type <code>help</code>, press Tab to complete, ↑ for history, or click a command.
            </p>
          </Reveal>
          <InteractiveTerminal />
        </section>

        <section className="wrap contact" id="contact">
          <Reveal>
            <p className="eyebrow">contact</p>
            <h2>Let&apos;s talk about your platform.</h2>
            <p className="sub">
              I am looking for a DevOps, platform or SRE role. If you are hiring, I would like to hear from you.
            </p>
            <Contact />
          </Reveal>
        </section>
      </main>

      <footer className="status-bar">
        <div className="wrap status-in">
          <span className="seg g">● main ✓</span>
          <span className="seg">ayoub@devops</span>
          <span className="seg">pipelines: green</span>
          <span className="seg">© {new Date().getFullYear()} Ayoub Ait Belhaj</span>
        </div>
      </footer>
    </>
  );
}
