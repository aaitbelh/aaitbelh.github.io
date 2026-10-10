"use client";

import { useEffect, useState } from "react";

const items = [
  { id: "pipeline", label: "~/pipeline" },
  { id: "experience", label: "~/log" },
  { id: "projects", label: "~/projects" },
  { id: "skills", label: "~/skills" },
  { id: "terminal", label: "~/try-it" },
  { id: "contact", label: "~/contact" },
];

export function Nav() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header className="nav">
      <div className="wrap nav-in">
        <a className="brand" href="#top">
          <b>&gt;</b> ayoub<b>_</b>
        </a>
        <nav className="links" aria-label="Sections">
          {items.map((i) => (
            <a key={i.id} href={`#${i.id}`} className={active === i.id ? "on" : ""}>
              {i.label}
            </a>
          ))}
        </nav>
        <div className="nav-right">
          <span className="pill"><i /> pipelines green</span>
          <a className="btn primary sm" href="#contact">Hire me</a>
        </div>
      </div>
    </header>
  );
}
