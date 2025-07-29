import React from "react";
import { CheckCircle, Zap, Shield, Coins } from "lucide-react";

const features = [
  "60 à 70% de fonctionnalités standard mais ajustables",
  "30 à 40% de spécifique inhérent au métier et à l'organisation",
  "Tarification de conception au forfait",
  "Droits d'utilisation logicielle au forfait sans récurrence",
  "Coût de maintenance mensuel bas au forfait",
  "Assistance illimitée au forfait sans engagement",
  "Prix divisé par 3 par rapport aux solutions concurrentes",
];

const highlights = [
  {
    icon: Zap,
    title: "Rapidité de déploiement",
    description:
      "Mise en place rapide grâce à notre base standard personnalisable",
  },
  {
    icon: Shield,
    title: "Sécurité & Fiabilité",
    description: "Architecture robuste et sécurisée pour protéger vos données",
  },
  {
    icon: Coins,
    title: "Économique",
    description:
      "Prix divisé par 3 comparé aux solutions CRM/ERP traditionnelles",
  },
];

export default function ProductDefinition() {
  return (
    <section className="py-20 bg-[#f9fafb]" id="produit">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-[#fce7eb] text-[#ef718f] text-xs font-semibold rounded-md px-3 py-1 mb-3">
              Produit Hybride
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              MEMO, la solution <span className="text-[#ef5d81]">hybride</span>{" "}
              parfaite
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed text-gray-700">
              MEMO est un produit hybride entre le logiciel standard (SAGE) et
              le logiciel sur mesure (SAP), offrant le meilleur des deux mondes.
            </p>

            {/* Feature List */}
            <ul className="space-y-3 text-sm max-w-xl">
              {features.map((text, i) => (
                <li key={i} className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-[#ef5d81] flex-shrink-0 mt-0.5" />

                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Highlight Boxes */}
          <div className="space-y-6">
            {highlights.map((h, i) => (
              <div
                key={i}
                className="flex items-center space-x-4 bg-white rounded-lg p-5 shadow-sm"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-[#ef718f] to-[#fca07a] text-white">
                  <h.icon className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="font-semibold text-base">{h.title}</h3>
                  <p className="text-[#5f6a7d] text-sm max-w-xl">
                    {h.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}