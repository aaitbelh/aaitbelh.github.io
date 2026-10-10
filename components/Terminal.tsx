import type { ReactNode } from "react";

export function Terminal({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`term ${className}`}>
      <div className="term-bar" aria-hidden="true">
        <span className="dot r" />
        <span className="dot y" />
        <span className="dot g" />
        <span className="term-title">{title}</span>
      </div>
      <div className="term-body">{children}</div>
    </div>
  );
}

export function Prompt({ path = "~" }: { path?: string }) {
  return (
    <span className="ps">
      ayoub<span className="at">@</span>devops:{path}$
    </span>
  );
}
