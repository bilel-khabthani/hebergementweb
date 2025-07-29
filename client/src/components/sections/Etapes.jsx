
import React from "react";
import { Calendar, MapPin, FileText, TestTube, MessageSquare, Rocket } from "lucide-react";
import { motion } from "framer-motion";
const Etapes = () => {
  const steps = [
    {
      icon: Calendar,
      step: "1",
      title: "1er RDV Commercial",
      description: "Rencontre avec une attachée commerciale pour évaluer l'éligibilité au produit et comprendre vos besoins spécifiques.",
      details: "Éligibilité • Expression du besoin"
    },
    {
      icon: MapPin,
      step: "2",
      title: "RDV Physique MOA",
      description: "Déplacement d'un consultant MOA dans vos locaux pour une analyse approfondie de votre organisation.",
      details: "Dans vos locaux • Analyse métier"
    },
    {
      icon: FileText,
      step: "3",
      title: "Cahier des charges",
      description: "Élaboration collaborative du cahier des charges avec vos key users (chefs de département ou représentants).",
      details: "Avec les key users • Spécifications"
    },
    {
      icon: TestTube,
      step: "4",
      title: "Test V1 Démo",
      description: "Test en entreprise d'une première version V1 en mode démonstration validée par vos équipes.",
      details: "Mode démo • Validation équipes"
    },
    {
      icon: MessageSquare,
      step: "5",
      title: "Ajustements",
      description: "Modifications en mode ping-pong durant la phase de test suite aux retours de vos key users.",
      details: "Mode ping-pong • Retours utilisateurs"
    },
    {
      icon: Rocket,
      step: "6",
      title: "Livraison V2",
      description: "Livraison de la version V2 en mode production pour déploiement sur l'ensemble de l'entreprise.",
      details: "Mode production • Déploiement global"
    }
  ];

  return (
    <section className="bg-[#fefefe] text-gray-900 px-4 py-20 md:py-28 font-outfit" id="etapes" >
     
         <div className="max-w-5xl mx-auto text-center mb-20">
        <motion.h2
          className="text-5xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
           Les étapes pour avoir votre <span className="text-[#ef5d81]">MEMO</span> sur mesure
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-gray-600 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
           Un processus structuré en 6 étapes pour garantir une solution 
            parfaitement adaptée à vos besoins
        </motion.p>
      </div>

      <div className="mt-16 max-w-4xl mx-auto space-y-8">
        {steps.map(({ step, icon, title, description, details }) => (
         <motion.article
  key={step}
  className="bg-white rounded-xl shadow-sm p-6 flex items-start space-x-6 border border-transparent transition"
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  whileHover={{
    scale: 1.03,
    boxShadow: "0px 10px 20px rgba(239, 93, 129, 0.15)"
  }}
  transition={{
    duration: 0.2, // applies to both hover-in and hover-out
    ease: "easeOut"
  }}
>


  <div className="flex flex-col items-center space-y-2">
    <div
      className="bg-gradient-to-br from-[#ef718f] to-[#fca07a] p-4 rounded-full text-white flex items-center justify-center shadow-lg"
      style={{ width: 64, height: 64 }}
    >
      {React.createElement(icon, { size: 28 })}
    </div>
    <div className="text-[10px] text-gray-600 font-semibold bg-pink-50 border border-pink-200 rounded-md px-2 py-[2px]">
      Étape {step}
    </div>
  </div>
  <div className="flex-1">
    <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">{title}</h3>
    <p className="text-gray-600 text-sm md:text-base leading-relaxed">{description}</p>
    <p className="text-[#ef5d81] text-xs md:text-sm mt-2 font-semibold">{details}</p>
  </div>
</motion.article>

        ))}
      </div>
    </section>
  );
};

export default Etapes;
