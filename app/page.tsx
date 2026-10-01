"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Offer = {
  id: string;
  name: string;
  subtitle: string;
  description: string;

  price: number | null;
  oldPrice?: number;

  image?: string;

  active: boolean;

  showGift: boolean;
  gift?: string;

  showOldPrice: boolean;
  showPromotion: boolean;
  showCountdown: boolean;
  showStock: boolean;

  stock?: number;

  startDate?: string;
  endDate?: string;

  ctaText: string;
};

const OFFERS: Offer[] = [
  {
    id: "maison",
    name: "Pack Maison",
    subtitle: "Pour maison et petits besoins résidentiels",

    description:
      "Solution solaire adaptée aux besoins essentiels : télévision, réfrigérateur, éclairage, ventilateurs et petits appareils.",

    price: 550000,
    oldPrice: 750000,

    active: true,

    showGift: true,
    gift: "Kit d'éclairage LED offert",

    showOldPrice: true,
    showPromotion: true,
    showCountdown: true,
    showStock: true,

    stock: 15,

    endDate: "2026-10-31T23:59:59+00:00",

    ctaText: "Commander cette offre",
  },

  {
    id: "commerce",
    name: "Pack Commerce",
    subtitle: "Boutique, salon, superette, petit commerce",

    description:
      "Solution renforcée pour les équipements professionnels tels que réfrigérateurs, congélateurs, climatiseurs et autres appareils.",

    price: 1000000,
    oldPrice: 1250000,

    active: true,

    showGift: true,
    gift: "Maintenance gratuite pendant 6 mois",

    showOldPrice: true,
    showPromotion: true,
    showCountdown: true,
    showStock: true,

    stock: 15,

    endDate: "2026-10-31T23:59:59+00:00",

    ctaText: "Commander cette offre",
  },

  {
    id: "entreprise",
    name: "Pack Entreprise",
    subtitle: "Bureaux, restaurants et installations professionnelles",

    description:
      "Solution solaire professionnelle dimensionnée selon vos besoins réels de consommation.",

    price: null,

    active: true,

    showGift: false,

    showOldPrice: false,
    showPromotion: false,
    showCountdown: false,
    showStock: false,

    ctaText: "Demander un devis",
  },
];

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calculateCountdown(endDate?: string): Countdown | null {
  if (!endDate) return null;

  const difference =
    new Date(endDate).getTime() - new Date().getTime();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(
      difference / (1000 * 60 * 60 * 24)
    ),

    hours: Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    ),

    minutes: Math.floor(
      (difference / (1000 * 60)) % 60
    ),

    seconds: Math.floor(
      (difference / 1000) % 60
    ),
  };
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("fr-FR").format(price);
}

function OfferCard({
  offer,
}: {
  offer: Offer;
}) {
  const [countdown, setCountdown] =
    useState<Countdown | null>(
      calculateCountdown(offer.endDate)
    );

  useEffect(() => {
    if (!offer.showCountdown || !offer.endDate) {
      return;
    }

    const interval = setInterval(() => {
      setCountdown(
        calculateCountdown(offer.endDate)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [offer.endDate, offer.showCountdown]);

  if (!offer.active) {
    return null;
  }

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl">

      {/* IMAGE */}

      <div className="relative flex h-56 items-center justify-center bg-gradient-to-br from-orange-500 via-orange-400 to-black">

        {offer.image ? (
          <img
            src={offer.image}
            alt={offer.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="px-6 text-center text-white">
            <div className="mb-2 text-4xl">
              ☀️
            </div>

            <div className="text-xl font-black">
              FELICITY SOLAR
            </div>

            <div className="mt-1 text-sm">
              {offer.name}
            </div>
          </div>
        )}

        {offer.showPromotion &&
          offer.oldPrice &&
          offer.price && (
            <div className="absolute right-4 top-4 rounded-full bg-red-600 px-4 py-2 text-sm font-black text-white">
              PROMOTION
            </div>
          )}
      </div>

      {/* CONTENU */}

      <div className="p-6">

        <h3 className="text-2xl font-black text-gray-900">
          {offer.name}
        </h3>

        <p className="mt-1 font-medium text-orange-600">
          {offer.subtitle}
        </p>

        <p className="mt-4 text-sm leading-6 text-gray-600">
          {offer.description}
        </p>

        {/* PRIX */}

        <div className="mt-5">

          {offer.showOldPrice &&
            offer.oldPrice &&
            offer.price && (
              <span className="mr-3 text-sm text-gray-400 line-through">
                {formatPrice(offer.oldPrice)} FCFA
              </span>
            )}

          {offer.price ? (
            <span className="text-3xl font-black text-orange-600">
              {formatPrice(offer.price)} FCFA
            </span>
          ) : (
            <span className="text-xl font-black text-orange-600">
              Sur devis
            </span>
          )}

        </div>

        {/* CADEAU */}

        {offer.showGift && offer.gift && (
          <div className="mt-5 rounded-xl border border-orange-200 bg-orange-50 p-4">

            <div className="text-xs font-bold uppercase text-orange-600">
              🎁 Cadeau offert
            </div>

            <div className="mt-1 font-bold text-gray-900">
              {offer.gift}
            </div>

          </div>
        )}

        {/* STOCK */}

        {offer.showStock &&
          offer.stock !== undefined && (
            <div className="mt-4 text-sm font-semibold text-red-600">
              Plus que {offer.stock} offre
              {offer.stock > 1 ? "s" : ""} disponible
              {offer.stock > 1 ? "s" : ""}.
            </div>
          )}

        {/* COUNTDOWN */}

        {offer.showCountdown &&
          countdown &&
          offer.endDate && (
            <div className="mt-5 rounded-xl bg-black p-4 text-white">

              <div className="mb-3 text-center text-xs font-bold uppercase text-orange-400">
                Offre valable jusqu'à la fin de la promotion
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">

                <div>
                  <div className="text-xl font-black">
                    {countdown.days}
                  </div>

                  <div className="text-[10px] text-gray-400">
                    JOURS
                  </div>
                </div>

                <div>
                  <div className="text-xl font-black">
                    {countdown.hours}
                  </div>

                  <div className="text-[10px] text-gray-400">
                    HEURES
                  </div>
                </div>

                <div>
                  <div className="text-xl font-black">
                    {countdown.minutes}
                  </div>

                  <div className="text-[10px] text-gray-400">
                    MIN
                  </div>
                </div>

                <div>
                  <div className="text-xl font-black">
                    {countdown.seconds}
                  </div>

                  <div className="text-[10px] text-gray-400">
                    SEC
                  </div>
                </div>

              </div>

            </div>
          )}

        {/* COMMANDE */}

        <Link
          href={`/order?offer=${offer.id}`}
          className="mt-6 block w-full rounded-xl bg-orange-500 px-5 py-4 text-center font-black text-white transition hover:bg-orange-600"
        >
          {offer.ctaText}
        </Link>

      </div>

    </article>
  );
}

const TESTIMONIALS = [
  {
    name: "Client Felicity Solar",
    location: "Côte d'Ivoire",
    text:
      "Installation réalisée par une équipe professionnelle. Nous avons pu mieux sécuriser notre alimentation électrique.",
  },

  {
    name: "Client professionnel",
    location: "Abidjan",
    text:
      "La solution a été étudiée selon nos besoins et notre consommation. L'équipe nous a accompagné dans le choix des équipements.",
  },

  {
    name: "Client particulier",
    location: "Côte d'Ivoire",
    text:
      "Nous avons apprécié l'accompagnement depuis l'étude jusqu'à l'installation de notre système solaire.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">

      {/* HEADER */}

      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">

          <Link
            href="/"
            className="text-xl font-black text-gray-900"
          >
            FELICITY SOLAR
            <span className="ml-1 text-orange-500">
              Distribution
            </span>
          </Link>

          <nav className="hidden gap-6 md:flex">

            <a href="#accueil">
              Accueil
            </a>

            <a href="#offres">
              Nos offres
            </a>

            <a href="#solutions">
              Nos solutions
            </a>

            <a href="#temoignages">
              Témoignages
            </a>

            <a href="#contact">
              Contact
            </a>

          </nav>

          <Link
            href="/quote"
            className="rounded-lg bg-orange-500 px-4 py-2 font-bold text-white"
          >
            Devis gratuit
          </Link>

        </div>

      </header>

      {/* HERO */}

      <section
        id="accueil"
        className="bg-gradient-to-br from-black via-gray-900 to-orange-600 text-white"
      >

        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-2 md:items-center">

          <div>

            <div className="mb-4 inline-block rounded-full border border-orange-400 px-4 py-2 text-sm font-bold text-orange-300">
              FELICITY SOLAR DISTRIBUTION
            </div>

            <h1 className="text-4xl font-black leading-tight md:text-6xl">
              Votre énergie solaire,
              <span className="block text-orange-400">
                pensée pour vos besoins.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-200">
              Découvrez nos solutions solaires pour les
              particuliers, commerces et entreprises.
              Obtenez une première estimation de votre
              installation à partir de vos appareils et de
              votre consommation.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <Link
                href="/quote"
                className="rounded-xl bg-orange-500 px-6 py-4 text-center font-black text-white"
              >
                Obtenir mon devis
              </Link>

              <a
                href="#offres"
                className="rounded-xl border-2 border-white px-6 py-4 text-center font-bold"
              >
                Voir les offres du moment
              </a>

            </div>

          </div>

          <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur">

            <div className="text-center">

              <div className="text-7xl">
                ☀️
              </div>

              <h2 className="mt-5 text-3xl font-black">
                Une solution adaptée
                à votre consommation
              </h2>

              <p className="mt-4 text-gray-200">
                Maison, commerce, restaurant, bureau,
                école ou entreprise : commencez votre
                étude en quelques étapes.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* OFFRES */}

      <section
        id="offres"
        className="bg-gray-50 px-4 py-20"
      >

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto mb-12 max-w-3xl text-center">

            <div className="text-sm font-black uppercase tracking-wider text-orange-600">
              Offre du moment
            </div>

            <h2 className="mt-2 text-4xl font-black text-gray-900">
              Nos offres du moment
            </h2>

            <p className="mt-4 text-gray-600">
              Retrouvez ici les offres actuellement
              proposées par Felicity Solar Distribution.
              Les promotions, cadeaux, prix et dates
              peuvent être activés ou désactivés par
              l'administration.
            </p>

          </div>

          <div className="grid gap-8 lg:grid-cols-3">

            {OFFERS.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
              />
            ))}

          </div>

        </div>

      </section>

      {/* SOLUTIONS */}

      <section
        id="solutions"
        className="px-4 py-20"
      >

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <h2 className="text-4xl font-black">
              Nos solutions
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Des installations adaptées aux besoins
              énergétiques réels de chaque client.
            </p>

          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {[
              {
                title: "Maison",
                icon: "🏠",
                text:
                  "Alimentation des appareils essentiels et amélioration de votre autonomie énergétique.",
              },

              {
                title: "Commerce",
                icon: "🏪",
                text:
                  "Solutions adaptées aux boutiques, restaurants, salons, superettes et activités professionnelles.",
              },

              {
                title: "Entreprise",
                icon: "🏢",
                text:
                  "Étude et dimensionnement personnalisés pour les besoins professionnels importants.",
              },
            ].map((solution) => (

              <div
                key={solution.title}
                className="rounded-2xl border bg-white p-7 shadow-sm"
              >

                <div className="text-4xl">
                  {solution.icon}
                </div>

                <h3 className="mt-5 text-2xl font-black">
                  {solution.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {solution.text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* TEMOIGNAGES */}

      <section
        id="temoignages"
        className="bg-gray-100 px-4 py-20"
      >

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <div className="text-sm font-black uppercase text-orange-600">
              Ils nous font confiance
            </div>

            <h2 className="mt-2 text-4xl font-black">
              Témoignages de nos clients
            </h2>

          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {TESTIMONIALS.map((testimonial) => (

              <article
                key={testimonial.name}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >

                <div className="text-lg text-yellow-500">
                  ★★★★★
                </div>

                <p className="mt-4 leading-7 text-gray-700">
                  « {testimonial.text} »
                </p>

                <div className="mt-6 border-t pt-4">

                  <div className="font-bold">
                    {testimonial.name}
                  </div>

                  <div className="text-sm text-gray-500">
                    {testimonial.location}
                  </div>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>

      {/* CTA */}

      <section
        id="contact"
        className="bg-black px-4 py-20 text-white"
      >

        <div className="mx-auto max-w-4xl text-center">

          <h2 className="text-4xl font-black">
            Vous voulez savoir quelle solution
            vous convient ?
          </h2>

          <p className="mt-5 text-lg text-gray-300">
            Répondez à quelques questions sur votre
            bâtiment et vos appareils. Notre équipe pourra
            ensuite étudier votre besoin.
          </p>

          <Link
            href="/quote"
            className="mt-8 inline-block rounded-xl bg-orange-500 px-8 py-4 font-black"
          >
            Commencer mon étude
          </Link>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="bg-gray-950 px-4 py-10 text-gray-400">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 md:flex-row">

          <div>
            <div className="font-black text-white">
              FELICITY SOLAR Distribution
            </div>

            <div className="mt-1 text-sm">
              Solutions solaires pour particuliers et professionnels.
            </div>
          </div>

          <div className="text-sm">
            © {new Date().getFullYear()} Felicity Solar Distribution
          </div>

        </div>

      </footer>

    </main>
  );
}