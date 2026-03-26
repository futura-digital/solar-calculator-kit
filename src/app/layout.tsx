import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar Savings Calculator — Synergi SW",
  description: "Find out how much you could save on your energy bills with solar panels.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
