const tools = [
  "GitHub Actions", "Jenkins", "SonarQube", "Trivy", "Docker", "Kubernetes", "K3s", "Helm", "Argo CD",
  "Terraform", "Ansible", "Azure", "AWS", "Nginx", "Linux", "PostgreSQL", "Redis", "Python", "Bash",
];

export function Marquee() {
  const row = tools.map((t) => <span key={t}>{t}</span>);
  return (
    <div className="marquee" aria-label="Tools I work with">
      <div className="marquee-track" aria-hidden="true">
        {row}
        {tools.map((t) => (
          <span key={`b-${t}`}>{t}</span>
        ))}
      </div>
    </div>
  );
}
