"use client";

import { useState } from "react";
import { calculateSolar, SolarInputs } from "@/lib/calculations/solar";

const BRAND = {
  blue: "#1170b7",
  green: "#93c023",
  orange: "#f78e00",
  orangeDark: "#d97a00",
  light: "#f4f9f0",
  border: "#e2e8eb",
  text: "#1a1a1a",
  muted: "#666",
};

const QUOTE_URL = "https://synergisw.co.uk/contact/";

const fmt = (value: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(value);

const DEFAULT_INPUTS: SolarInputs = {
  monthly_bill: 150,
  household_size: 3,
  owns_home: true,
  has_outbuilding: false,
};

interface ResultCardProps {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
}

function ResultCard({ label, value, sub, highlight }: ResultCardProps) {
  return (
    <div
      style={{
        background: highlight ? BRAND.blue : "#fff",
        color: highlight ? "#fff" : BRAND.text,
        borderRadius: "12px",
        padding: "1.25rem 1rem",
        textAlign: "center",
        border: `1px solid ${highlight ? BRAND.blue : BRAND.border}`,
      }}
    >
      <p style={{ margin: "0 0 0.3rem", fontSize: "0.72rem", opacity: 0.65, textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {label}
      </p>
      <p style={{ margin: 0, fontSize: "1.6rem", fontWeight: 800, lineHeight: 1.1 }}>{value}</p>
      {sub && <p style={{ margin: "0.3rem 0 0", fontSize: "0.72rem", opacity: 0.6 }}>{sub}</p>}
    </div>
  );
}

export default function SolarCalculator() {
  const [inputs, setInputs] = useState<SolarInputs>(DEFAULT_INPUTS);
  const results = calculateSolar(inputs);

  const notOwner = !inputs.owns_home;

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", maxWidth: "680px", margin: "0 auto", padding: "2rem 1rem" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div style={{ display: "inline-block", background: BRAND.blue, color: "#fff", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.3rem 0.9rem", borderRadius: "999px", marginBottom: "1rem" }}>
          Solar Savings Estimator — Free &amp; Instant
        </div>
        <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", fontWeight: 800, margin: "0 0 0.5rem", color: BRAND.text, lineHeight: 1.2 }}>
          See what solar could save your household — in 30 seconds
        </h1>
        <p style={{ margin: 0, color: BRAND.muted, fontSize: "0.95rem" }}>
          Enter a few details below. We'll show you your estimated annual saving, system cost, and how quickly it pays for itself.
        </p>
      </div>

      {/* Inputs */}
      <div style={{ background: "#fff", border: `1px solid ${BRAND.border}`, borderRadius: "16px", padding: "1.75rem", marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "0.95rem", fontWeight: 700, margin: "0 0 1.5rem", color: BRAND.blue, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Tell us about your home
        </h2>

        {/* Monthly bill */}
        <div style={{ marginBottom: "1.25rem" }}>
          <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.25rem" }}>
            Monthly electricity bill
          </label>
          <p style={{ margin: "0 0 0.4rem", fontSize: "0.78rem", color: BRAND.muted }}>Check your latest energy bill or statement</p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1rem", color: BRAND.muted }}>£</span>
            <input
              type="number"
              min={0}
              value={inputs.monthly_bill}
              onChange={(e) => setInputs((p) => ({ ...p, monthly_bill: parseFloat(e.target.value) || 0 }))}
              style={inputStyle}
            />
            <span style={{ fontSize: "0.85rem", color: BRAND.muted, whiteSpace: "nowrap" }}>/ month</span>
          </div>
        </div>

        {/* Household size */}
        <div style={{ marginBottom: "1.25rem" }}>
          <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.25rem" }}>
            Number of people in your household
          </label>
          <p style={{ margin: "0 0 0.4rem", fontSize: "0.78rem", color: BRAND.muted }}>More people usually means higher usage — and bigger savings potential</p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <button
                key={n}
                onClick={() => setInputs((p) => ({ ...p, household_size: n }))}
                style={{
                  width: "44px", height: "44px", borderRadius: "8px", border: `2px solid ${inputs.household_size === n ? BRAND.blue : BRAND.border}`,
                  background: inputs.household_size === n ? BRAND.blue : "#fff",
                  color: inputs.household_size === n ? "#fff" : BRAND.text,
                  fontWeight: 700, fontSize: "0.95rem", cursor: "pointer",
                }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Owns home */}
        <div style={{ marginBottom: "1.25rem" }}>
          <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.25rem" }}>
            Do you own your home?
          </label>
          <p style={{ margin: "0 0 0.4rem", fontSize: "0.78rem", color: BRAND.muted }}>Solar is installed on your roof, so owner permission is needed</p>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {[{ label: "Yes", value: true }, { label: "No", value: false }].map((opt) => (
              <button
                key={String(opt.value)}
                onClick={() => setInputs((p) => ({ ...p, owns_home: opt.value }))}
                style={{
                  padding: "0.5rem 1.5rem", borderRadius: "8px",
                  border: `2px solid ${inputs.owns_home === opt.value ? BRAND.blue : BRAND.border}`,
                  background: inputs.owns_home === opt.value ? BRAND.blue : "#fff",
                  color: inputs.owns_home === opt.value ? "#fff" : BRAND.text,
                  fontWeight: 700, fontSize: "0.9rem", cursor: "pointer",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Outbuilding */}
        <div>
          <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.25rem" }}>
            Do you have a garage or outbuilding?
          </label>
          <p style={{ margin: "0 0 0.4rem", fontSize: "0.78rem", color: BRAND.muted }}>A garage or shed roof can increase your system size and boost output</p>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {[{ label: "Yes", value: true }, { label: "No", value: false }].map((opt) => (
              <button
                key={String(opt.value)}
                onClick={() => setInputs((p) => ({ ...p, has_outbuilding: opt.value }))}
                style={{
                  padding: "0.5rem 1.5rem", borderRadius: "8px",
                  border: `2px solid ${inputs.has_outbuilding === opt.value ? BRAND.blue : BRAND.border}`,
                  background: inputs.has_outbuilding === opt.value ? BRAND.blue : "#fff",
                  color: inputs.has_outbuilding === opt.value ? "#fff" : BRAND.text,
                  fontWeight: 700, fontSize: "0.9rem", cursor: "pointer",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {notOwner ? (
        <div style={{ background: "#fff8f0", border: `1px solid ${BRAND.orange}40`, borderRadius: "16px", padding: "1.5rem", textAlign: "center", marginBottom: "1.5rem" }}>
            <p style={{ margin: 0, fontWeight: 700, color: BRAND.orange, fontSize: "1rem" }}>You may still qualify</p>
          <p style={{ margin: "0.4rem 0 0.75rem", fontSize: "0.85rem", color: BRAND.muted }}>If you're a landlord, or your landlord is open to it, solar can still be an option. Get in touch and we'll let you know what's possible.</p>
          <a href={QUOTE_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: BRAND.orange, color: "#fff", fontWeight: 700, fontSize: "0.9rem", padding: "0.6rem 1.5rem", borderRadius: "999px", textDecoration: "none" }}>Talk to us →</a>
        </div>
      ) : (
        <div style={{ background: "#fff", border: `1px solid ${BRAND.border}`, borderRadius: "16px", padding: "1.75rem", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "0.95rem", fontWeight: 700, margin: "0 0 1.25rem", color: BRAND.blue, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Here&apos;s what solar could do for you
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.85rem", marginBottom: "1rem" }}>
            <ResultCard label="You could save" value={fmt(results.annual_saving)} sub="every year on energy bills" highlight />
            <ResultCard label="Long-term value" value={fmt(results.saving_25yr)} sub="over the system's lifetime" />
            <ResultCard label="Breaks even in" value={`${results.payback_years} yrs`} sub="then it's all profit" />
            <ResultCard label="Carbon cut" value={`${results.co2_saved}t`} sub="tonnes less per year" />
          </div>
          {results.annual_saving > 600 && (
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.85rem", color: BRAND.blue, fontWeight: 600, textAlign: "center" }}>
              Based on your inputs, you&apos;re in the top range for solar returns. A system this size typically pays for itself well within 10 years.
            </p>
          )}
          {results.annual_saving <= 600 && inputs.monthly_bill > 150 && (
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.85rem", color: BRAND.blue, fontWeight: 600, textAlign: "center" }}>
              With a bill like yours, solar could cut what you spend on energy by half or more. That&apos;s money staying in your pocket every month.
            </p>
          )}
          {inputs.has_outbuilding && results.annual_saving <= 600 && inputs.monthly_bill <= 150 && (
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.85rem", color: BRAND.blue, fontWeight: 600, textAlign: "center" }}>
              Your garage or outbuilding gives you extra roof space — which means a larger system and stronger returns than most households.
            </p>
          )}
          <div style={{ background: BRAND.light, borderRadius: "10px", padding: "0.85rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
            <div>
              <span style={{ fontSize: "0.8rem", color: BRAND.muted }}>Recommended system: </span>
              <span style={{ fontWeight: 700, color: BRAND.blue }}>{results.system_size_kw} kW</span>
            </div>
            <div>
              <span style={{ fontSize: "0.8rem", color: BRAND.muted }}>Typical investment: </span>
              <span style={{ fontWeight: 700, color: BRAND.blue }}>{fmt(results.system_cost)}</span>
            </div>
          </div>
          <p style={{ margin: "1rem 0 0", fontSize: "0.72rem", color: "#aaa", textAlign: "center" }}>
            These are conservative UK-average estimates. Your actual savings could be higher depending on roof direction and usage. A free survey gives you the exact figures.
          </p>
        </div>
      )}

      {/* CTA */}
      <div style={{ background: BRAND.blue, borderRadius: "16px", padding: "2rem 1.5rem", textAlign: "center" }}>
        <h3 style={{ color: "#fff", fontSize: "1.2rem", fontWeight: 800, margin: "0 0 0.5rem" }}>
          Your estimate is ready — now get the real numbers
        </h3>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9rem", margin: "0 0 1.5rem" }}>
          A free survey takes less than an hour. We'll confirm your exact system size, savings, and install cost — no pressure, no obligation.
        </p>
        <a
          href={QUOTE_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block", background: BRAND.orange, color: "#fff",
            fontWeight: 700, fontSize: "1rem", padding: "0.9rem 2rem",
            borderRadius: "999px", textDecoration: "none",
          }}
        >
          Book my free survey →
        </a>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.78rem", margin: "1rem 0 0" }}>
          ✓ No obligation &nbsp; ✓ Surveyed within 5 days &nbsp; ✓ MCS certified installer
        </p>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.65rem 0.75rem",
  border: `1px solid #ddd`,
  borderRadius: "8px",
  fontSize: "1rem",
  outline: "none",
  boxSizing: "border-box",
};
