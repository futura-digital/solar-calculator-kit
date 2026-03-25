import ROICalculator from "@/components/ROICalculator";

export default function Page() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f6f8",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Hero */}
      <div
        style={{
          background: "#0f172a",
          color: "#fff",
          padding: "4rem 1.5rem 3.5rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            display: "inline-block",
            background: "#1e3a5f",
            color: "#7dd3fc",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "0.35rem 0.9rem",
            borderRadius: "999px",
            marginBottom: "1.25rem",
          }}
        >
          Free Revenue Calculator
        </p>

        <h1
          style={{
            fontSize: "clamp(1.75rem, 5vw, 2.75rem)",
            fontWeight: 800,
            lineHeight: 1.2,
            margin: "0 auto 1rem",
            maxWidth: "640px",
          }}
        >
          How much revenue are you losing to missed leads?
        </h1>

        <p
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
            color: "#94a3b8",
            maxWidth: "520px",
            margin: "0 auto 1.25rem",
            lineHeight: 1.6,
          }}
        >
          Estimate the monthly and annual revenue impact of missed calls, slow follow-up, and poor lead handling.
        </p>

        <p style={{ fontSize: "0.82rem", color: "#475569", margin: 0 }}>
          Used by service businesses across the UK to quantify their lead gap.
        </p>
      </div>

      {/* Calculator */}
      <div style={{ padding: "2.5rem 1rem 4rem" }}>
        <ROICalculator />
      </div>

      {/* CTA */}
      <div
        style={{
          background: "#0f172a",
          color: "#fff",
          padding: "3.5rem 1.5rem",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(1.4rem, 4vw, 2rem)",
            fontWeight: 800,
            margin: "0 auto 0.75rem",
            maxWidth: "560px",
            lineHeight: 1.25,
          }}
        >
          See how this looks for your business
        </h2>
        <p
          style={{
            color: "#94a3b8",
            fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
            maxWidth: "480px",
            margin: "0 auto 2rem",
            lineHeight: 1.6,
          }}
        >
          We can map this to your real numbers and show you exactly where leads are being lost — and how to fix it.
        </p>
        <a
          href="#"
          style={{
            display: "inline-block",
            background: "#3b82f6",
            color: "#fff",
            fontWeight: 700,
            fontSize: "1rem",
            padding: "0.85rem 2rem",
            borderRadius: "8px",
            textDecoration: "none",
            letterSpacing: "0.01em",
          }}
        >
          Book a quick call
        </a>
      </div>

      {/* Footer */}
      <div
        style={{
          borderTop: "1px solid #e2e8f0",
          padding: "1.5rem 1.25rem",
          textAlign: "center",
          background: "#fff",
        }}
      >
        <p style={{ margin: 0, fontSize: "0.8rem", color: "#94a3b8" }}>
          Built by{" "}
          <span style={{ fontWeight: 600, color: "#64748b" }}>Futura Digital</span>
          {" "}— AI-powered systems for lead capture, qualification, and conversion.
        </p>
      </div>
    </main>
  );
}
