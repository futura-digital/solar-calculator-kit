import SolarCalculator from "@/components/SolarCalculator";

export default function SolarPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#f4f9f0", fontFamily: "system-ui, -apple-system, sans-serif" }}>

      {/* Header */}
      <div style={{ background: "#1170b7", color: "#fff", padding: "3.5rem 1.5rem 3rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(1.75rem, 5vw, 2.75rem)", fontWeight: 800, margin: "0 0 0.75rem", lineHeight: 1.2 }}>
          Solar Panel Savings Calculator
        </h1>
        <p style={{ fontSize: "clamp(0.95rem, 2vw, 1.1rem)", color: "rgba(255,255,255,0.8)", maxWidth: "500px", margin: "0 auto", lineHeight: 1.6 }}>
          Find out how much you could save on your energy bills with solar panels — in under 60 seconds.
        </p>
      </div>

      {/* Calculator */}
      <div style={{ padding: "2.5rem 1rem 4rem" }}>
        <SolarCalculator />
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid #dde8d8", padding: "1.5rem 1.25rem", textAlign: "center", background: "#fff" }}>
        <p style={{ margin: 0, fontSize: "0.8rem", color: "#94a3b8" }}>
          Powered by{" "}
          <span style={{ fontWeight: 600, color: "#64748b" }}>Synergi SW</span>
          {" "}— Solar Panel Installation across Devon, Dorset and Somerset.
        </p>
      </div>
    </main>
  );
}
