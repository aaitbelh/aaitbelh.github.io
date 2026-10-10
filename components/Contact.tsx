"use client";

import { useState } from "react";
import { profile } from "@/lib/data";

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  return (
    <div className="cta">
      <a className="btn primary mail-copy" href={`mailto:${profile.email}`}>
        ✉ {profile.email}
      </a>
      <button className="btn" onClick={copy} aria-live="polite">
        {copied ? "✔ copied" : "$ pbcopy < email"}
      </button>
      <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">
        linkedin ↗
      </a>
      <a className="btn" href={profile.github} target="_blank" rel="noreferrer">
        github ↗
      </a>
    </div>
  );
}
