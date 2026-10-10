import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ayoub Ait Belhaj | DevOps / Platform Engineer",
  description:
    "DevOps and platform engineer: CI/CD with security gates, Kubernetes, infrastructure as code and a hardened edge. Based in Morocco, open to relocation and remote work.",
  openGraph: {
    title: "Ayoub Ait Belhaj | DevOps / Platform Engineer",
    description: "CI/CD with security gates, Kubernetes, infrastructure as code, hardened edge.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
