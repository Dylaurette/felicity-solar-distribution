"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const TIME_SLOTS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

export default function AppointmentPage() {
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState(
    formatDate(today)
  );

  const [selectedTime, setSelectedTime] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    whatsapp: "",
    location: "",
    reason: "Étude solaire",
  });

  const [submitted, setSubmitted] = useState(false);

  const minDate = useMemo(() => {
    return formatDate(today);
  }, []);

  const updateForm = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const submitAppointment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTime) {
      alert("Veuillez sélectionner une heure.");
      return;
    }

    const appointment = {
      ...form,
      date: selectedDate,
      time: selectedTime,
      status: "en_attente",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "felicity_appointment",
      JSON.stringify(appointment)
    );

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-2xl px-6 py-20">
          <div className="rounded-3xl bg-white p-10 text-center shadow">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
              ✓
            </div>

            <h1 className="text-3xl font-bold">
              Rendez-vous enregistré
            </h1>

            <p className="mt-4 text-gray-600">
              Merci {form.firstName}. Votre demande de rendez-vous a
              bien été enregistrée.
            </p>

            <div className="my-8 rounded-xl bg-gray-50 p-5 text-left">
              <p>
                <strong>Date :</strong> {selectedDate}
              </p>

              <p>
                <strong>Heure :</strong> {selectedTime}
              </p>

              <p>
                <strong>Téléphone :</strong> {form.phone}
              </p>

              <p>
                <strong>Localisation :</strong> {form.location}
              </p>
            </div>

            <p className="font-semibold">
              Notre équipe Felicity Solar vous appellera pour
              confirmer votre demande.
            </p>

            <Link
              href="/"
              className="mt-8 inline-block rounded-xl bg-orange-500 px-6 py-3 font-bold text-white"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-xl font-bold">
            Felicity Solar Distribution
          </Link>

          <Link
            href="/"
            className="rounded-lg px-4 py-2 hover:bg-gray-100"
          >
            Accueil
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold">
            Contactez-nous
          </h1>

          <p className="mt-3 text-gray-600">
            Choisissez la date et l'heure auxquelles vous souhaitez
            être rappelé par notre équipe.
          </p>
        </div>

        <form onSubmit={submitAppointment} className="space-y-8">
          <section className="rounded-2xl bg-white p-6 shadow">
            <h2 className="mb-5 text-xl font-bold">
              1. Choisissez votre rendez-vous
            </h2>

            <label className="mb-2 block font-semibold">
              Date
            </label>

            <input
              type="date"
              required
              min={minDate}
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedTime("");
              }}
              className="w-full rounded-xl border p-4"
            />

            <div className="mt-6">
              <label className="mb-3 block font-semibold">
                Heure
              </label>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                {TIME_SLOTS.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`rounded-xl border px-4 py-3 font-semibold ${
                      selectedTime === time
                        ? "border-orange-500 bg-orange-500 text-white"
                        : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow">
            <h2 className="mb-5 text-xl font-bold">
              2. Vos coordonnées
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                required
                placeholder="Prénom"
                value={form.firstName}
                onChange={(e) =>
                  updateForm("firstName", e.target.value)
                }
                className="rounded-xl border p-4"
              />

              <input
                required
                placeholder="Nom"
                value={form.lastName}
                onChange={(e) =>
                  updateForm("lastName", e.target.value)
                }
                className="rounded-xl border p-4"
              />

              <input
                required
                type="tel"
                placeholder="Téléphone"
                value={form.phone}
                onChange={(e) =>
                  updateForm("phone", e.target.value)
                }
                className="rounded-xl border p-4"
              />

              <input
                type="tel"
                placeholder="WhatsApp (facultatif)"
                value={form.whatsapp}
                onChange={(e) =>
                  updateForm("whatsapp", e.target.value)
                }
                className="rounded-xl border p-4"
              />

              <input
                required
                placeholder="Localisation / commune"
                value={form.location}
                onChange={(e) =>
                  updateForm("location", e.target.value)
                }
                className="rounded-xl border p-4 md:col-span-2"
              />

              <select
                value={form.reason}
                onChange={(e) =>
                  updateForm("reason", e.target.value)
                }
                className="rounded-xl border p-4 md:col-span-2"
              >
                <option>Étude solaire</option>
                <option>Demande de devis</option>
                <option>Commande</option>
                <option>Installation solaire</option>
                <option>Maintenance</option>
                <option>Autre demande</option>
              </select>
            </div>
          </section>

          <section className="rounded-2xl bg-gray-900 p-6 text-white">
            <h2 className="text-xl font-bold">
              Votre demande
            </h2>

            <div className="mt-4 space-y-2 text-gray-200">
              <p>
                <strong>Date :</strong>{" "}
                {selectedDate}
              </p>

              <p>
                <strong>Heure :</strong>{" "}
                {selectedTime || "Non sélectionnée"}
              </p>

              <p>
                <strong>Motif :</strong>{" "}
                {form.reason}
              </p>
            </div>
          </section>

          <button
            type="submit"
            className="w-full rounded-xl bg-orange-500 px-6 py-4 text-lg font-bold text-white hover:bg-orange-600"
          >
            Confirmer mon rendez-vous
          </button>
        </form>
      </section>
    </main>
  );
}