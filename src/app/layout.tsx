import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ROI Calculator — Futura Digital",
  description: "See how much revenue you're losing to missed leads and what you could recover.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
