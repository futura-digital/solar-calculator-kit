export interface SolarInputs {
  monthly_bill: number;
  household_size: number;
  owns_home: boolean;
  has_outbuilding: boolean;
}

export interface SolarOutputs {
  system_size_kw: number;
  annual_saving: number;
  payback_years: number;
  saving_25yr: number;
  co2_saved: number;
  system_cost: number;
}

export function calculateSolar(inputs: SolarInputs): SolarOutputs {
  const { household_size, has_outbuilding } = inputs;

  // System size based on household + outbuilding bonus
  const system_size_kw = round(household_size * 1.2 + (has_outbuilding ? 0.5 : 0), 1);

  // UK average annual generation
  const annual_generation_kwh = system_size_kw * 850;

  // 50% self-consumed, 50% exported
  const self_consumed_kwh = annual_generation_kwh * 0.5;
  const exported_kwh = annual_generation_kwh * 0.5;

  // Savings: 29p/kWh self-use + 15p/kWh SEG export
  const savings_from_self_use = self_consumed_kwh * 0.29;
  const savings_from_export = exported_kwh * 0.15;
  const annual_saving = round(savings_from_self_use + savings_from_export, 0);

  // System cost ~£1,800/kW installed
  const system_cost = round(system_size_kw * 1800, 0);

  // Payback period
  const payback_years = round(system_cost / annual_saving, 1);

  // 25-year saving
  const saving_25yr = round(annual_saving * 25, 0);

  // CO₂ saved (UK grid factor 0.233 kg/kWh → tonnes)
  const co2_saved = round(annual_generation_kwh * 0.000233, 2);

  return {
    system_size_kw,
    annual_saving,
    payback_years,
    saving_25yr,
    co2_saved,
    system_cost,
  };
}

function round(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
