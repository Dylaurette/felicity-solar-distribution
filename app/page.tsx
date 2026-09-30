"use client";

import Link from "next/link";

const packs = [
  {
    name: "PACK MAISON",
    subtitle: "3–4 pièces",
    description:
      "3 panneaux Felicity Solar 700W + Batterie Felicity Lithium 200Ah + Onduleur Felicity IVEM 3KVA",
    usage: "TV, frigo, ventilateurs, lumières",
    gift: "Kit d'éclairage LED offert",
    oldPrice: "750 000 FCFA",
    price: "550 000 FCFA",
  },
  {
    name: "PACK COMMERCE",
    subtitle: "Boutique, salon",
    description:
      "6 panneaux Felicity Solar 700W + Batteries Felicity Lithium 400Ah + Onduleur Felicity IVEM 5KVA",
    usage: "Frigos, congélateurs, climatiseurs, équipements",
    gift: "Maintenance gratuite 6 mois",
    oldPrice: "1 250 000 FCFA",
    price: "1 000 000 FCFA",
  },
  {
    name: "PACK ENTREPRISE",
    subtitle: "Bureaux, restaurants",
    description:
      "10+ panneaux Felicity Solar avec solution de stockage et onduleur adaptée à vos besoins",
    usage: "Équipements professionnels et besoins énergétiques importants",
    gift: "Solution étudiée selon votre consommation",
    oldPrice: "Sur étude",
    price: "Sur devis",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f4821f] font-black text-white shadow-lg">
              F
            </div>

            <div>
              <div className="text-lg font-black tracking-tight">
                FELICITY SOLAR
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f4821f]">
                Distribution
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-semibold md:flex">
            <a href="#accueil" className="hover:text-[#f4821f]">
              Accueil
            </a>
            <a href="#offres" className="hover:text-[#f4821f]">
              Offres
            </a>
            <a href="#services" className="hover:text-[#f4821f]">
              Nos solutions
            </a>
            <a href="#contact" className="hover:text-[#f4821f]">
              Contact
            </a>
          </nav>

          <Link
            href="/quote"
            className="rounded-full bg-[#f4821f] px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#df6f10]"
          >
            Devis gratuit
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section
        id="accueil"
        className="relative overflow-hidden bg-slate-950 text-white"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(244,130,31,0.35),transparent_35%)]" />

        <div className="relative mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-orange-400/40 bg-orange-400/10 px-4 py-2 text-sm font-bold text-orange-300">
              ☀️ Énergie solaire Felicity Solar
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight md:text-6xl">
              Votre énergie,
              <span className="block text-[#f4821f]">
                votre autonomie.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Découvrez nos solutions solaires Felicity Solar pour votre
              maison, votre commerce ou votre entreprise.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/quote"
                className="rounded-xl bg-[#f4821f] px-7 py-4 text-center font-extrabold text-white shadow-xl transition hover:bg-[#df6f10]"
              >
                DEVIS GRATUIT PAR WHATSAPP
              </Link>

              <Link
                href="/appointment"
                className="rounded-xl border border-white/30 bg-white/10 px-7 py-4 text-center font-extrabold text-white backdrop-blur transition hover:bg-white/20"
              >
                APPELEZ-NOUS MAINTENANT
              </Link>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-5 border-t border-white/10 pt-7">
              <div>
                <div className="text-2xl font-black text-[#f4821f]">700W</div>
                <div className="mt-1 text-xs text-slate-400">
                  panneaux solaires
                </div>
              </div>

              <div>
                <div className="text-2xl font-black text-[#f4821f]">
                  Lithium
                </div>
                <div className="mt-1 text-xs text-slate-400">
                  stockage d'énergie
                </div>
              </div>

              <div>
                <div className="text-2xl font-black text-[#f4821f]">
                  Felicity
                </div>
                <div className="mt-1 text-xs text-slate-400">
                  solutions solaires
                </div>
              </div>
            </div>
          </div>

          {/* VISUEL */}
          <div className="relative">
            <div className="absolute -inset-8 rounded-[3rem] bg-[#f4821f]/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-800 to-slate-950 p-8 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <span className="rounded-full bg-[#f4821f] px-4 py-2 text-xs font-black">
                  FELICITY SOLAR
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  SOLAR ENERGY
                </span>
              </div>

              <div className="grid gap-4">
                <div className="rounded-2xl bg-white/10 p-6">
                  <div className="text-sm font-bold text-orange-300">
                    PANNEAUX SOLAIRES
                  </div>
                  <div className="mt-2 text-4xl font-black">700 W</div>
                  <div className="mt-1 text-sm text-slate-400">
                    Production solaire
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white/10 p-5">
                    <div className="text-xs font-bold text-orange-300">
                      BATTERIE
                    </div>
                    <div className="mt-2 text-xl font-black">Lithium</div>
                  </div>

                  <div className="rounded-2xl bg-white/10 p-5">
                    <div className="text-xs font-bold text-orange-300">
                      ONDULEUR
                    </div>
                    <div className="mt-2 text-xl font-black">Felicity</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OFFRE DU MOMENT */}
      <section id="offres" className="bg-orange-50 px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-bold uppercase tracking-[0.2em] text-[#f4821f]">
              Offre du moment
            </span>

            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              Nos packs exclusifs du moment
            </h2>

            <p className="mt-4 text-slate-600">
              Des solutions pensées pour les besoins résidentiels,
              commerciaux et professionnels.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {packs.map((pack) => (
              <article
                key={pack.name}
                className="group overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="bg-slate-950 p-6 text-white">
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-orange-300">
                    {pack.subtitle}
                  </div>

                  <h3 className="mt-2 text-2xl font-black">{pack.name}</h3>
                </div>

                <div className="p-6">
                  <p className="min-h-20 text-sm leading-6 text-slate-600">
                    {pack.description}
                  </p>

                  <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                    <div className="text-xs font-bold uppercase text-slate-400">
                      Alimentez
                    </div>
                    <div className="mt-1 text-sm font-semibold">
                      {pack.usage}
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl bg-orange-50 p-4">
                    <div className="text-xs font-bold uppercase text-orange-500">
                      Avantage
                    </div>
                    <div className="mt-1 text-sm font-bold text-orange-800">
                      {pack.gift}
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="text-sm text-slate-400 line-through">
                      {pack.oldPrice}
                    </div>
                    <div className="mt-1 text-3xl font-black text-[#f4821f]">
                      {pack.price}
                    </div>
                  </div>

                  <Link
                    href="/quote"
                    className="mt-6 block rounded-xl bg-[#f4821f] px-5 py-4 text-center font-black text-white transition hover:bg-[#df6f10]"
                  >
                    DEMANDER UN DEVIS
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <span className="font-bold uppercase tracking-[0.2em] text-[#f4821f]">
              Nos solutions
            </span>

            <h2 className="mt-3 text-4xl font-black md:text-5xl">
              Une solution adaptée à votre besoin
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              [
                "01",
                "Maison",
                "Une solution solaire adaptée à votre consommation résidentielle.",
              ],
              [
                "02",
                "Commerce",
                "Réduisez l'impact des coupures sur votre activité.",
              ],
              [
                "03",
                "Entreprise",
                "Une étude adaptée aux besoins énergétiques professionnels.",
              ],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="rounded-3xl border border-slate-200 p-7"
              >
                <div className="text-sm font-black text-[#f4821f]">
                  {number}
                </div>
                <h3 className="mt-4 text-2xl font-black">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-slate-950 px-7 py-14 text-center text-white md:px-16">
          <span className="font-bold uppercase tracking-[0.2em] text-orange-300">
            Commencez maintenant
          </span>

          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black md:text-5xl">
            Besoin d'une solution solaire ?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-300">
            Répondez à quelques questions et obtenez une première estimation
            de votre besoin énergétique.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/quote"
              className="rounded-xl bg-[#f4821f] px-7 py-4 font-black text-white hover:bg-[#df6f10]"
            >
              Devis gratuit par WhatsApp
            </Link>

            <Link
              href="/appointment"
              className="rounded-xl border border-white/20 bg-white/10 px-7 py-4 font-black hover:bg-white/20"
            >
              Prendre rendez-vous
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="contact"
        className="border-t border-slate-200 bg-slate-50 px-5 py-10"
      >
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 md:flex-row">
          <div>
            <div className="font-black">FELICITY SOLAR DISTRIBUTION</div>
            <div className="mt-1 text-sm text-slate-500">
              Solutions solaires pour particuliers et professionnels.
            </div>
          </div>

          <div className="text-sm text-slate-500">
            © {new Date().getFullYear()} Felicity Solar Distribution
          </div>
        </div>
      </footer>
    </main>
  );
}