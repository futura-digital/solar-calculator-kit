export interface ROIInputs {
  leads_per_month: number;
  missed_lead_percentage: number; // 0–100
  conversion_rate: number;        // 0–100
  average_job_value: number;
  recovery_rate: number;          // 0–100
}

export interface ROIOutputs {
  missed_leads: number;
  lost_customers: number;
  lost_revenue: number;
  recovered_leads: number;
  recovered_customers: number;
  recovered_revenue: number;
  annual_revenue_uplift: number;
}

export function calculateROI(inputs: ROIInputs): ROIOutputs {
  const {
    leads_per_month,
    missed_lead_percentage,
    conversion_rate,
    average_job_value,
    recovery_rate,
  } = inputs;

  const missed_leads = leads_per_month * (missed_lead_percentage / 100);
  const lost_customers = missed_leads * (conversion_rate / 100);
  const lost_revenue = round(lost_customers * average_job_value);

  const recovered_leads = missed_leads * (recovery_rate / 100);
  const recovered_customers = recovered_leads * (conversion_rate / 100);
  const recovered_revenue = round(recovered_customers * average_job_value);

  const annual_revenue_uplift = round(recovered_revenue * 12);

  return {
    missed_leads: round(missed_leads),
    lost_customers: round(lost_customers),
    lost_revenue,
    recovered_leads: round(recovered_leads),
    recovered_customers: round(recovered_customers),
    recovered_revenue,
    annual_revenue_uplift,
  };
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}
