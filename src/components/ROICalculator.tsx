"use client";

import { useState } from "react";
import { calculateROI, ROIInputs } from "@/lib/calculations/roi";
import { DEFAULT_INPUTS } from "@/lib/config/defaults";

const SUBMIT_URL = "/api/submit";
const CALENDAR_URL = "https://link.futuradigital.app/widget/booking/SuJF7zuSUQtysLGaeDUL";

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

type FormState = "idle" | "submitting" | "success" | "error";

export default function ROICalculator() {
  const [inputs, setInputs] = useState<ROIInputs>(DEFAULT_INPUTS);
  const [form, setForm] = useState({ firstName: "", email: "", phone: "" });
  const [formState, setFormState] = useState<FormState>("idle");

  const results = calculateROI(inputs);

  function handleChange(name: keyof ROIInputs, value: number) {
    setInputs((prev) => ({ ...prev, [name]: value }));
  }

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("submitting");

    const payload = {
      ...form,
      source: "roi-calculator",
      leads_per_month: inputs.leads_per_month,
      missed_lead_percentage: inputs.missed_lead_percentage,
      conversion_rate: inputs.conversion_rate,
      average_job_value: inputs.average_job_value,
      recovery_rate: inputs.recovery_rate,
      annual_revenue_uplift: results.annual_revenue_uplift,
    };

    try {
      await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setFormState("success");
    } catch {
      setFormState("error");
    }
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
          marginBottom: "2rem",
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
          <ResultCard label="Missed leads / month" value={String(results.missed_leads)} />
          <ResultCard label="Lost revenue / month" value={fmt(results.lost_revenue)} />
          <ResultCard label="Recovered revenue / month" value={fmt(results.recovered_revenue)} />
          <ResultCard label="Annual revenue uplift" value={fmt(results.annual_revenue_uplift)} highlight />
        </div>

        <p style={{ marginTop: "1.25rem", fontSize: "0.78rem", color: "#aaa", textAlign: "center" }}>
          Based on your inputs. Assumes uniform conversion rate across recovered leads.
        </p>
      </div>

      {/* Lead Capture Form */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "16px",
          padding: "1.75rem",
        }}
      >
        {formState === "success" ? (
          <div style={{ textAlign: "center", padding: "1rem 0" }}>
            <p style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 0.5rem" }}>Thanks — we'll be in touch.</p>
            <p style={{ color: "#666", margin: "0 0 1.5rem", fontSize: "0.9rem" }}>
              In the meantime, book a quick call to walk through your numbers live.
            </p>
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                background: "#0f172a",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.95rem",
                padding: "0.8rem 1.75rem",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              Book a quick call
            </a>
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, margin: "0 0 0.4rem", color: "#333" }}>
              Want to see this mapped to your real numbers?
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#888", margin: "0 0 1.5rem" }}>
              Leave your details and we'll walk you through exactly where leads are being lost — and how to fix it.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gap: "0.85rem", marginBottom: "1rem" }}>
                <input
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  required
                  value={form.firstName}
                  onChange={handleFormChange}
                  style={inputStyle}
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  required
                  value={form.email}
                  onChange={handleFormChange}
                  style={inputStyle}
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={handleFormChange}
                  style={inputStyle}
                />
              </div>

              <button
                type="submit"
                disabled={formState === "submitting"}
                style={{
                  width: "100%",
                  background: "#0f172a",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "1rem",
                  padding: "0.85rem",
                  borderRadius: "8px",
                  border: "none",
                  cursor: formState === "submitting" ? "not-allowed" : "pointer",
                  opacity: formState === "submitting" ? 0.7 : 1,
                }}
              >
                {formState === "submitting" ? "Sending..." : "Get my revenue breakdown"}
              </button>

              {formState === "error" && (
                <p style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "#e53e3e", textAlign: "center" }}>
                  Something went wrong — please try again.
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.65rem 0.75rem",
  border: "1px solid #ddd",
  borderRadius: "8px",
  fontSize: "0.95rem",
  outline: "none",
  boxSizing: "border-box",
};
