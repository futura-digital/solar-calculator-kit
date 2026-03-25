import { ROIInputs } from "../calculations/roi";

export const DEFAULT_INPUTS: ROIInputs = {
  leads_per_month: 100,
  missed_lead_percentage: 30,  // 30% of enquiries go unanswered
  conversion_rate: 25,         // 1-in-4 close rate
  average_job_value: 1500,     // £1,500 per job (trades/home services)
  recovery_rate: 70,           // AI Receptionist recovers ~70% of missed leads
};
