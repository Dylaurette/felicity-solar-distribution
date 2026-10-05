import {
  ApplianceConfig,
} from "./appliances";

type CalculateInput = {
  appliance: ApplianceConfig;

  quantity: number;

  characteristicValue: number;

  electricalPower?: number;

  electricalPowerUnit?: "W" | "kW";

  hoursPerDay?: number;
};

export function calculateApplianceDailyEnergy(
  input: CalculateInput
) {
  const {
    appliance,
    quantity,
    characteristicValue,
    electricalPower,
    electricalPowerUnit,
    hoursPerDay,
  } = input;

  /*
   * PRIORITÉ 1 :
   * puissance électrique réelle fournie
   * par le client.
   */

  if (
    electricalPower !== undefined &&
    electricalPower > 0
  ) {
    const powerW =
      electricalPowerUnit === "kW"
        ? electricalPower * 1000
        : electricalPower;

    const hours =
      hoursPerDay !== undefined
        ? hoursPerDay
        : 0;

    return {
      energyKwhDay:
        (powerW * quantity * hours) / 1000,

      source: "puissance électrique fournie",

      estimated: false,
    };
  }

  /*
   * PRIORITÉ 2 :
   * estimation par puissance de référence.
   */

  if (
    appliance.calculationMode ===
      "reference_power" &&
    appliance.referencePowerW
  ) {
    const powerW =
      characteristicValue *
      appliance.referencePowerW;

    const hours =
      hoursPerDay !== undefined
        ? hoursPerDay
        : appliance.defaultHoursPerDay || 0;

    return {
      energyKwhDay:
        (powerW * quantity * hours) / 1000,

      source:
        "estimation selon la caractéristique",

      estimated: true,
    };
  }

  /*
   * PRIORITÉ 3 :
   * consommation journalière de référence.
   */

  if (
    appliance.calculationMode ===
      "reference_daily_energy" &&
    appliance.referenceDailyEnergyKwh
  ) {
    return {
      energyKwhDay:
        appliance.referenceDailyEnergyKwh *
        characteristicValue *
        quantity,

      source:
        "estimation selon capacité",

      estimated: true,
    };
  }

  return {
    energyKwhDay: 0,

    source:
      "donnée insuffisante",

    estimated: true,
  };
}

export function calculateTotalDailyEnergy(
  results: {
    energyKwhDay: number;
  }[]
) {
  return results.reduce(
    (total, item) =>
      total + item.energyKwhDay,
    0
  );
}