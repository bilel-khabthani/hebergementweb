import React from "react";
import { Palette, Shield, Wrench } from "lucide-react";
import { motion } from "framer-motion";
const tarifs = [
  {
    icon: Palette,
    title: "La Conception",
    description:
      "Développement sur mesure de votre solution MEMO adaptée à votre métier et organisation",
    features: [
      "Analyse métier approfondie",
      "Cahier des charges personnalisé",
      "Développement spécifique",
      "Tests et validation",
      "Formation des équipes",
    ],
    note: "Tarification au forfait selon le périmètre défini",
  },
  {
    icon: Shield,
    title: "Les DUL (Droits d'Utilisation Logicielle)",
    description:
      "Licence d'utilisation perpétuelle de votre solution MEMO sans contrainte de durée",
    features: [
      "Droits perpétuels",
      "Aucune récurrence",
      "Utilisation illimitée",
      "Mises à jour incluses",
      "Propriété de la licence",
    ],
    note: "Investissement unique selon le nombre d'utilisateurs",
  },
  {
    icon: Wrench,
    title: "Maintenance & Hébergement",
    description:
      "Support technique, hébergement sécurisé et évolutions de votre solution MEMO",
    features: [
      "Hébergement sécurisé",
      "Support technique illimité",
      "Sauvegardes automatiques",
      "Mises à jour sécurité",
      "Monitoring 24/7",
    ],
    note: "Tarif mensuel fixe, aucun engagement de durée",
  },
];

export default function Tarifs() {
  return (
    <section className="py-28 px-6 md:px-12 bg-white text-gray-800 font-outfit" id="couts" >
      {/* Updated title section with matching animation */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <motion.h2
          className="text-5xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          Structure de <span className="text-[#ef5d81]">coûts</span>{" "}
          transparente
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-gray-600 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Une approche claire et prévisible pour votre budget, avec des tarifs
          au forfait sans surprise
        </motion.p>
      </div>

      {/* Updated cards with matching styling and animation */}
      <div className="grid lg:grid-cols-3 gap-8">
        {tarifs.map((card, idx) => (
          <motion.div
            key={idx}
            className="bg-white rounded-2xl border border-gray-100 p-8 flex flex-col items-center text-center shadow-md"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{
              scale: 1.05,
              rotate: 0.5,
              boxShadow: "0px 10px 20px rgba(239, 93, 129, 0.15)",
            }}
            whileTap={{ scale: 0.98 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 * idx, duration: 0.6, ease: "easeOut" }}
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#ef718f] to-[#fca07a] flex items-center justify-center shadow-lg">
              <card.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
            <p className="text-gray-600 text-base mb-6">{card.description}</p>
            <ul className="text-gray-900 text-base mb-6 space-y-3 max-w-xs text-left w-full">
              {card.features.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="w-2.5 h-2.5 rounded-full bg-pink-500 inline-block mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <div className=" bg-primary/10 p-4 rounded-lg rounded-md  w-full ">
              <p className="text-[#ef5d81]  text-sm font-medium ">
                {card.note}{" "}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}