"use client";

import { useState } from "react";
import { calculateROI, ROIInputs } from "@/lib/calculations/roi";
import { DEFAULT_INPUTS } from "@/lib/config/defaults";

const fmt = (value: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(value);

interface InputFieldProps {
  label: string;
  hint: string;
  name: keyof ROIInputs;
  value: number;
  suffix?: string;
  onChange: (name: keyof ROIInputs, value: number) => void;
}

function InputField({ label, hint, name, value, suffix, onChange }: InputFieldProps) {
  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem", fontSize: "0.9rem" }}>
        {label}
      </label>
      <p style={{ margin: "0 0 0.4rem", fontSize: "0.78rem", color: "#888" }}>{hint}</p>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <input
          type="number"
          min={0}
          value={value}
          onChange={(e) => onChange(name, parseFloat(e.target.value) || 0)}
          style={{
            width: "100%",
            padding: "0.6rem 0.75rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
            fontSize: "1rem",
            outline: "none",
          }}
        />
        {suffix && (
          <span style={{ fontSize: "0.9rem", color: "#555", whiteSpace: "nowrap" }}>{suffix}</span>
        )}
      </div>
    </div>
  );
}

interface ResultCardProps {
  label: string;
  value: string;
  highlight?: boolean;
}

function ResultCard({ label, value, highlight }: ResultCardProps) {
  return (
    <div
      style={{
        background: highlight ? "#0f172a" : "#f8f9fb",
        color: highlight ? "#fff" : "#1a1a1a",
        borderRadius: "12px",
        padding: "1.25rem 1.5rem",
        textAlign: "center",
      }}
    >
      <p style={{ margin: "0 0 0.4rem", fontSize: "0.8rem", opacity: 0.65, textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {label}
      </p>
      <p style={{ margin: 0, fontSize: "1.75rem", fontWeight: 700 }}>{value}</p>
    </div>
  );
}

export default function ROICalculator() {
  const [inputs, setInputs] = useState<ROIInputs>(DEFAULT_INPUTS);

  const results = calculateROI(inputs);

  function handleChange(name: keyof ROIInputs, value: number) {
    setInputs((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        maxWidth: "680px",
        margin: "0 auto",
        padding: "2rem 1rem",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "2rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 700, margin: "0 0 0.5rem" }}>
          Lead Revenue Calculator
        </h1>
        <p style={{ margin: 0, color: "#666", fontSize: "0.95rem" }}>
          See how much revenue you're losing to missed leads — and what you could recover.
        </p>
      </div>

      {/* Inputs */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "16px",
          padding: "1.75rem",
          marginBottom: "2rem",
        }}
      >
        <h2 style={{ fontSize: "1rem", fontWeight: 700, margin: "0 0 1.5rem", color: "#333" }}>
          Your Numbers
        </h2>

        <InputField
          label="Leads per month"
          hint="Total enquiries you receive across all channels"
          name="leads_per_month"
          value={inputs.leads_per_month}
          onChange={handleChange}
        />
        <InputField
          label="Missed lead rate"
          hint="Percentage of leads that go unanswered or fall through"
          name="missed_lead_percentage"
          value={inputs.missed_lead_percentage}
          suffix="%"
          onChange={handleChange}
        />
        <InputField
          label="Conversion rate"
          hint="Percentage of leads that become paying customers"
          name="conversion_rate"
          value={inputs.conversion_rate}
          suffix="%"
          onChange={handleChange}
        />
        <InputField
          label="Average job value"
          hint="Average revenue per customer or project"
          name="average_job_value"
          value={inputs.average_job_value}
          suffix="£"
          onChange={handleChange}
        />
        <InputField
          label="Recovery rate"
          hint="Percentage of missed leads you could recover with a better system"
          name="recovery_rate"
          value={inputs.recovery_rate}
          suffix="%"
          onChange={handleChange}
        />
      </div>

      {/* Results */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "16px",
          padding: "1.75rem",
        }}
      >
        <h2 style={{ fontSize: "1rem", fontWeight: 700, margin: "0 0 1.5rem", color: "#333" }}>
          Your Results
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          <ResultCard
            label="Missed leads / month"
            value={String(results.missed_leads)}
          />
          <ResultCard
            label="Lost revenue / month"
            value={fmt(results.lost_revenue)}
          />
          <ResultCard
            label="Recovered revenue / month"
            value={fmt(results.recovered_revenue)}
          />
          <ResultCard
            label="Annual revenue uplift"
            value={fmt(results.annual_revenue_uplift)}
            highlight
          />
        </div>

        <p style={{ marginTop: "1.25rem", fontSize: "0.78rem", color: "#aaa", textAlign: "center" }}>
          Based on your inputs. Assumes uniform conversion rate across recovered leads.
        </p>
      </div>
    </div>
  );
}
