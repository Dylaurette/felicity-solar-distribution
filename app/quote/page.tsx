"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Appliance = {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  hours: number;
  power: number;
};

const DEFAULT_APPLIANCES: Appliance[] = [
  {
    id: "climatiseur",
    name: "Climatiseur",
    unit: "CV",
    quantity: 1,
    hours: 8,
    power: 1000,
  },
  {
    id: "refrigerateur",
    name: "Réfrigérateur",
    unit: "L",
    quantity: 1,
    hours: 24,
    power: 120,
  },
  {
    id: "congelateur",
    name: "Congélateur",
    unit: "L",
    quantity: 1,
    hours: 24,
    power: 150,
  },
  {
    id: "machine",
    name: "Machine à laver",
    unit: "kg",
    quantity: 1,
    hours: 2,
    power: 500,
  },
  {
    id: "chauffe-eau",
    name: "Chauffe-eau",
    unit: "L",
    quantity: 1,
    hours: 3,
    power: 2000,
  },
  {
    id: "television",
    name: "Télévision",
    unit: "pouces",
    quantity: 1,
    hours: 5,
    power: 100,
  },
  {
    id: "eclairage",
    name: "Éclairage",
    unit: "W",
    quantity: 1,
    hours: 6,
    power: 20,
  },
];

export default function QuotePage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [method, setMethod] = useState<"appareils" | "kwh">("appareils");
  const [dailyKwh, setDailyKwh] = useState("");
  const [appliances, setAppliances] =
    useState<Appliance[]>(DEFAULT_APPLIANCES);

  const totalKwh = useMemo(() => {
    if (method === "kwh") {
      return Number(dailyKwh) || 0;
    }

    return appliances.reduce((total, appliance) => {
      return (
        total +
        (appliance.quantity * appliance.power * appliance.hours) / 1000
      );
    }, 0);
  }, [method, dailyKwh, appliances]);

  const updateAppliance = (
    id: string,
    field: keyof Appliance,
    value: number
  ) => {
    setAppliances((current) =>
      current.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const removeAppliance = (id: string) => {
    setAppliances((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const addAppliance = () => {
    setAppliances((current) => [
      ...current,
      {
        id: `autre-${Date.now()}`,
        name: "Autre équipement",
        unit: "W",
        quantity: 1,
        hours: 4,
        power: 100,
      },
    ]);
  };

  const submitQuote = (e: React.FormEvent) => {
    e.preventDefault();

    const request = {
      name,
      phone,
      location,
      method,
      dailyKwh: totalKwh,
      appliances,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "felicity_quote_request",
      JSON.stringify(request)
    );

    alert(
      `Votre demande a été enregistrée.\n\nConsommation estimée : ${totalKwh.toFixed(
        1
      )} kWh/jour.\n\nNotre équipe pourra vous contacter pour finaliser l'étude.`
    );
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-xl font-bold">
            Felicity Solar Distribution
          </Link>

          <div className="flex gap-3">
            <Link
              href="/"
              className="rounded-lg px-4 py-2 hover:bg-gray-100"
            >
              Accueil
            </Link>

            <Link
              href="/appointment"
              className="rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white"
            >
              Contactez-nous
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold">
            Demander une étude solaire
          </h1>

          <p className="mt-2 text-gray-600">
            Donnez-nous quelques informations afin d'estimer votre besoin
            énergétique.
          </p>
        </div>

        <form onSubmit={submitQuote} className="space-y-8">
          <section className="rounded-2xl bg-white p-6 shadow">
            <h2 className="mb-5 text-xl font-bold">
              1. Vos coordonnées
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nom et prénom"
                className="rounded-lg border p-3"
              />

              <input
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Téléphone / WhatsApp"
                className="rounded-lg border p-3"
              />

              <input
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Localisation"
                className="rounded-lg border p-3"
              />
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow">
            <h2 className="mb-5 text-xl font-bold">
              2. Comment souhaitez-vous calculer votre consommation ?
            </h2>

            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => setMethod("appareils")}
                className={`rounded-lg px-5 py-3 font-semibold ${
                  method === "appareils"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                À partir des équipements
              </button>

              <button
                type="button"
                onClick={() => setMethod("kwh")}
                className={`rounded-lg px-5 py-3 font-semibold ${
                  method === "kwh"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                Je connais déjà mes kWh/jour
              </button>
            </div>
          </section>

          {method === "kwh" && (
            <section className="rounded-2xl bg-white p-6 shadow">
              <h2 className="mb-4 text-xl font-bold">
                Consommation journalière
              </h2>

              <input
                type="number"
                min="0"
                step="0.1"
                required
                value={dailyKwh}
                onChange={(e) => setDailyKwh(e.target.value)}
                placeholder="Exemple : 25"
                className="w-full rounded-lg border p-3"
              />

              <p className="mt-2 text-sm text-gray-500">
                Indiquez votre consommation en kWh/jour.
              </p>
            </section>
          )}

          {method === "appareils" && (
            <section className="rounded-2xl bg-white p-6 shadow">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">
                    Vos équipements
                  </h2>

                  <p className="text-sm text-gray-500">
                    Les valeurs servent à établir une première estimation.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addAppliance}
                  className="rounded-lg bg-gray-900 px-4 py-2 text-white"
                >
                  + Ajouter
                </button>
              </div>

              <div className="space-y-4">
                {appliances.map((appliance) => (
                  <div
                    key={appliance.id}
                    className="grid gap-3 rounded-xl border p-4 md:grid-cols-6"
                  >
                    <div className="md:col-span-2">
                      <label className="mb-1 block text-sm font-semibold">
                        Équipement
                      </label>

                      <input
                        value={appliance.name}
                        onChange={(e) =>
                          setAppliances((current) =>
                            current.map((item) =>
                              item.id === appliance.id
                                ? {
                                    ...item,
                                    name: e.target.value,
                                  }
                                : item
                            )
                          )
                        }
                        className="w-full rounded-lg border p-2"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm">
                        Caractéristique
                      </label>

                      <div className="rounded-lg bg-gray-100 p-2 text-center">
                        {appliance.unit}
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-sm">
                        Quantité
                      </label>

                      <input
                        type="number"
                        min="1"
                        value={appliance.quantity}
                        onChange={(e) =>
                          updateAppliance(
                            appliance.id,
                            "quantity",
                            Number(e.target.value)
                          )
                        }
                        className="w-full rounded-lg border p-2"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm">
                        Puissance W
                      </label>

                      <input
                        type="number"
                        min="0"
                        value={appliance.power}
                        onChange={(e) =>
                          updateAppliance(
                            appliance.id,
                            "power",
                            Number(e.target.value)
                          )
                        }
                        className="w-full rounded-lg border p-2"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm">
                        Heures/jour
                      </label>

                      <input
                        type="number"
                        min="0"
                        max="24"
                        step="0.5"
                        value={appliance.hours}
                        onChange={(e) =>
                          updateAppliance(
                            appliance.id,
                            "hours",
                            Number(e.target.value)
                          )
                        }
                        className="w-full rounded-lg border p-2"
                      />
                    </div>

                    <div className="md:col-span-6 flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Caractéristique : {appliance.unit}
                        <br />
                        La puissance réelle peut être vérifiée sur la
                        plaque signalétique.
                      </span>

                      <button
                        type="button"
                        onClick={() => removeAppliance(appliance.id)}
                        className="text-sm font-semibold text-red-600"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="rounded-2xl bg-gray-900 p-6 text-white">
            <p className="text-sm text-gray-300">
              Estimation de consommation journalière
            </p>

            <div className="mt-2 text-4xl font-bold">
              {totalKwh.toFixed(1)} kWh/jour
            </div>

            <p className="mt-3 text-sm text-gray-300">
              Cette valeur constitue une première estimation. L'étude
              technique finale sera réalisée par l'équipe Felicity Solar.
            </p>
          </section>

          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              type="submit"
              className="rounded-xl bg-orange-500 px-6 py-4 font-bold text-white"
            >
              Envoyer ma demande d'étude
            </button>

            <Link
              href="/appointment"
              className="rounded-xl border border-gray-300 bg-white px-6 py-4 text-center font-bold"
            >
              Prendre rendez-vous
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}