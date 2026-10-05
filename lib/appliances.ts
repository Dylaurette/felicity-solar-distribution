export type ApplianceUnit =
  | "W"
  | "kW"
  | "CV"
  | "L"
  | "kg"
  | "pouces";

export type CalculationMode =
  | "electrical_power"
  | "reference_power"
  | "reference_daily_energy";

export type ApplianceConfig = {
  id: string;

  name: string;

  category: string;

  characteristicLabel: string;

  characteristicUnit: ApplianceUnit;

  calculationMode: CalculationMode;

  /**
   * Puissance estimative par unité de caractéristique.
   *
   * Exemple :
   * 1 unité de CV → puissance estimative.
   *
   * Cette valeur restera configurable plus tard
   * depuis l'administration.
   */
  referencePowerW?: number;

  /**
   * Consommation journalière estimative.
   *
   * Utilisée lorsque la consommation dépend
   * davantage de la capacité de l'appareil
   * que d'une puissance instantanée.
   */
  referenceDailyEnergyKwh?: number;

  defaultHoursPerDay?: number;

  note?: string;
};

export const APPLIANCES: ApplianceConfig[] = [

  {
    id: "climatiseur",

    name: "Climatiseur",

    category: "climatisation",

    characteristicLabel:
      "Puissance du climatiseur",

    characteristicUnit: "CV",

    calculationMode: "reference_power",

    /*
     * Valeur de départ volontairement paramétrable.
     * Elle devra être affinée selon les modèles
     * Felicity/constructeurs utilisés.
     */
    referencePowerW: 1000,

    defaultHoursPerDay: 8,

    note:
      "Estimation indicative basée sur la puissance en CV. La plaque signalétique permet une estimation plus précise.",
  },

  {
    id: "refrigerateur",

    name: "Réfrigérateur",

    category: "froid",

    characteristicLabel:
      "Capacité du réfrigérateur",

    characteristicUnit: "L",

    calculationMode: "reference_daily_energy",

    referenceDailyEnergyKwh: 0.8,

    defaultHoursPerDay: 24,

    note:
      "La consommation réelle dépend notamment de la classe énergétique, de la température et de l'utilisation.",
  },

  {
    id: "congelateur",

    name: "Congélateur",

    category: "froid",

    characteristicLabel:
      "Capacité du congélateur",

    characteristicUnit: "L",

    calculationMode: "reference_daily_energy",

    referenceDailyEnergyKwh: 1.0,

    defaultHoursPerDay: 24,

    note:
      "Estimation indicative. Le modèle exact et sa classe énergétique permettent une meilleure précision.",
  },

  {
    id: "machine-a-laver",

    name: "Machine à laver",

    category: "electromenager",

    characteristicLabel:
      "Capacité de lavage",

    characteristicUnit: "kg",

    calculationMode: "reference_power",

    referencePowerW: 250,

    defaultHoursPerDay: 2,

    note:
      "L'estimation dépend du programme et du nombre de cycles. Le nombre de cycles pourra être ajouté ultérieurement.",
  },

  {
    id: "chauffe-eau",

    name: "Chauffe-eau",

    category: "chauffage",

    characteristicLabel:
      "Capacité du chauffe-eau",

    characteristicUnit: "L",

    calculationMode: "reference_power",

    referencePowerW: 2000,

    defaultHoursPerDay: 3,

    note:
      "L'estimation dépend de la capacité, de la température et de la durée de chauffe.",
  },

  {
    id: "television",

    name: "Télévision",

    category: "audiovisuel",

    characteristicLabel:
      "Taille de l'écran",

    characteristicUnit: "pouces",

    calculationMode: "reference_power",

    referencePowerW: 2,

    defaultHoursPerDay: 5,

    note:
      "La puissance réelle indiquée sur l'étiquette de la TV reste prioritaire.",
  },

  {
    id: "pompe",

    name: "Pompe à eau",

    category: "pompage",

    characteristicLabel:
      "Puissance de la pompe",

    characteristicUnit: "CV",

    calculationMode: "reference_power",

    referencePowerW: 1000,

    defaultHoursPerDay: 3,

    note:
      "Estimation indicative. Le rendement et le type de moteur peuvent modifier la consommation.",
  },

  {
    id: "eclairage",

    name: "Éclairage",

    category: "eclairage",

    characteristicLabel:
      "Puissance de l'éclairage",

    characteristicUnit: "W",

    calculationMode: "electrical_power",

    defaultHoursPerDay: 6,
  },

  {
    id: "autre",

    name: "Autre appareil",

    category: "autre",

    characteristicLabel:
      "Puissance ou caractéristique",

    characteristicUnit: "W",

    calculationMode: "electrical_power",

    defaultHoursPerDay: 4,
  },
];