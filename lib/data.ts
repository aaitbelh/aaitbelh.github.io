export const profile = {
  name: "Ayoub Ait Belhaj",
  handle: "ayoub",
  role: "DevOps / Platform Engineer",
  location: "Morocco",
  email: "aitbelhajayoub566@gmail.com",
  github: "https://github.com/aaitbelh",
  linkedin: "https://www.linkedin.com/in/aitbelhaj-ayoub-799515241",
};

export type Project = {
  id: string;
  name: string;
  kind: string;
  status: "Running" | "Completed";
  summary: string;
  points: string[];
  stack: string[];
  repo?: string;
};

export const projects: Project[] = [
  {
    id: "inception-of-things",
    name: "Inception-of-Things",
    kind: "Kubernetes · GitOps",
    status: "Running",
    summary:
      "A small Kubernetes lab built from scratch: a two-node K3s cluster, host-based ingress, and continuous delivery driven by Git.",
    points: [
      "Two K3s nodes (server + agent) provisioned with Vagrant; the agent joins using a token shared from the server.",
      "Three apps behind one Ingress, routed by Host header, one scaled to 3 replicas.",
      "Argo CD syncs manifests from Git into K3d with auto-prune, so Git is the source of truth.",
      "Bonus: self-hosted GitLab deployed with Helm.",
    ],
    stack: ["K3s", "K3d", "Vagrant", "Argo CD", "Helm", "Ingress"],
    repo: "https://github.com/aaitbelh/Inception-of-things-Devops-",
  },
  {
    id: "cloud-1-azure",
    name: "cloud-1 on Azure",
    kind: "Infrastructure as code",
    status: "Running",
    summary:
      "From an empty Azure subscription to a running WordPress stack with one Terraform apply and one Ansible run.",
    points: [
      "Terraform builds the resource group, VNet, subnet, NSG, static public IP and an Ubuntu VM with SSH-key-only login.",
      "Ansible installs Docker and Compose, creates volume directories and starts the stack.",
      "README documents the trade-offs I would fix for production: SSH scope, remote state, secrets handling.",
    ],
    stack: ["Terraform", "Azure", "Ansible", "Docker Compose"],
    repo: "https://github.com/aaitbelh/Wordpress_Azure-Cloud-1-",
  },
  {
    id: "badass-vxlan",
    name: "BADASS: VXLAN lab",
    kind: "Networking",
    status: "Completed",
    summary:
      "Network emulation with GNS3 and Docker. I implemented the VXLAN part of the project.",
    points: [
      "Static and dynamic VXLAN overlays.",
      "Multicast behaviour and traffic encapsulation over a Layer 3 network.",
    ],
    stack: ["GNS3", "Docker", "VXLAN", "BGP"],
    repo: "https://github.com/aaitbelh/Bgp-At-Doors-of-Autonomous-Systems-is-Simple",
  },
  {
    id: "binary-exploitation",
    name: "Binary exploitation",
    kind: "Security",
    status: "Completed",
    summary:
      "Audited protected binaries for memory-safety flaws and rebuilt their source from observed behaviour. Passed with bonus.",
    points: [
      "Buffer overflows, format strings and ret2libc.",
      "Reverse engineering with GDB and x86 assembly.",
    ],
    stack: ["C", "x86 asm", "GDB"],
  },
  {
    id: "minishell",
    name: "Minishell",
    kind: "Systems programming",
    status: "Completed",
    summary:
      "A Unix shell written in C: parsing, pipes, redirections, environment handling and signals.",
    points: ["Process management with fork and exec.", "Quoting, expansion and heredocs."],
    stack: ["C", "POSIX"],
    repo: "https://github.com/aaitbelh/Minishell",
  },
  {
    id: "webserve",
    name: "WebServe",
    kind: "Systems programming",
    status: "Completed",
    summary: "An HTTP server in C++ that handles many connections and serves static and dynamic content.",
    points: ["Non-blocking sockets and I/O multiplexing.", "Configurable virtual servers."],
    stack: ["C++", "Sockets", "HTTP"],
    repo: "https://github.com/aaitbelh/WebServe",
  },
];

export type Commit = {
  hash: string;
  type: string;
  scope: string;
  msg: string;
  body: string[];
  date: string;
  head?: boolean;
};

export const commits: Commit[] = [
  {
    hash: "a3f9c21",
    type: "feat",
    scope: "ci",
    msg: "own the delivery pipeline end to end",
    body: [
      "GitHub Actions + Jenkins: automated tests, SonarQube quality gates,",
      "Trivy image and dependency scans, performance checks on every change.",
      "Promotion through test, staging and production.",
    ],
    date: "2025 – now",
    head: true,
  },
  {
    hash: "7be04d8",
    type: "feat",
    scope: "platform",
    msg: "containerise the platform and run it on K3s",
    body: [
      "Next.js, Prisma, PostgreSQL and Redis/BullMQ workers as Docker services.",
      "Deployments, rollbacks and environment configuration.",
    ],
    date: "2025 – now",
  },
  {
    hash: "c18a5f0",
    type: "feat",
    scope: "edge",
    msg: "harden the production edge",
    body: ["Nginx reverse proxy, Let's Encrypt/Certbot TLS automation,", "rate limiting and security headers."],
    date: "2025 – now",
  },
  {
    hash: "e402b97",
    type: "fix",
    scope: "storage",
    msg: "restore document uploads blocked by a firewall",
    body: [
      "Traced failures across network, storage and application layers on",
      "S3-compatible storage (SeaweedFS/MinIO) and restored submissions.",
    ],
    date: "2025 – now",
  },
  {
    hash: "5d77a13",
    type: "feat",
    scope: "iac",
    msg: "make staging and production reproducible",
    body: ["Terraform and Ansible provision and configure environments."],
    date: "2025 – now",
  },
  {
    hash: "09c6e4b",
    type: "docs",
    scope: "team",
    msg: "runbooks, code review and mentoring",
    body: ["Supervise interns: onboarding, task planning, review.", "Maintain platform documentation."],
    date: "2025 – now",
  },
  {
    hash: "1f3d8aa",
    type: "init",
    scope: "1337",
    msg: "systems foundation at 1337 (42 Network)",
    body: [
      "Kubernetes from scratch, Ansible-automated cloud deployments,",
      "binary exploitation, networking. Level 17.77.",
    ],
    date: "2021 – now",
  },
];

export const skillGroups: { key: string; items: string[] }[] = [
  { key: "ci_cd", items: ["GitHub Actions", "Jenkins", "SonarQube", "Trivy", "Automated testing"] },
  { key: "containers", items: ["Docker", "Podman", "Kubernetes (K3s, K3d)", "Helm", "Argo CD", "Vagrant"] },
  { key: "iac_cloud", items: ["Terraform", "Ansible", "Azure", "AWS", "Linux"] },
  { key: "edge_security", items: ["Nginx", "Certbot / TLS", "Rate limiting", "Security headers", "Binary auditing"] },
  { key: "data", items: ["PostgreSQL", "Redis / BullMQ", "SeaweedFS", "MinIO (S3)"] },
  { key: "languages", items: ["Python", "Bash", "TypeScript", "C", "C++", "SQL"] },
];

export const stages = [
  {
    id: "commit",
    label: "Commit",
    log: ["push to main", "workflow triggered: build-and-release"],
  },
  {
    id: "test",
    label: "Test",
    log: ["install dependencies", "run unit and integration tests", "performance checks"],
  },
  {
    id: "quality",
    label: "Quality gate",
    log: ["sonarqube analysis", "quality gate: PASSED"],
  },
  {
    id: "scan",
    label: "Security scan",
    log: ["trivy image scan", "trivy dependency scan", "no blocking vulnerabilities"],
  },
  {
    id: "staging",
    label: "Staging",
    log: ["deploy to K3s (staging)", "rollout complete, smoke tests ok"],
  },
  {
    id: "prod",
    label: "Production",
    log: ["promote build", "rolling update", "health checks green"],
  },
];
