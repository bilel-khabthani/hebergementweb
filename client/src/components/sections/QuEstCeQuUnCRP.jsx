import React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Settings,
  Users,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: <Building2 className="w-7 h-7 text-white" />,
    title: "Gestion Intégrée",
    description: "Centralisez tous vos processus métier dans une solution unique",
  },
  {
    icon: <Settings className="w-7 h-7 text-white" />,
    title: "Automatisation",
    description: "Automatisez vos tâches répétitives et gagnez en efficacité",
  },
  {
    icon: <Users className="w-7 h-7 text-white" />,
    title: "Collaboration",
    description: "Facilitez la communication entre vos équipes",
  },
  {
    icon: <TrendingUp className="w-7 h-7 text-white" />,
    title: "Performance",
    description: "Suivez vos KPI en temps réel et optimisez vos résultats",
  },
];

export default function QuEstCeQuUnCRP() {
  return (
    <section className="py-24 px-6 md:px-12 bg-[#f9fafb] text-gray-800 min-h-screen " id="crp" >
      {/* Title and Description */}
      <div className="max-w-5xl mx-auto text-center mb-20">
        <motion.h2
          className="text-5xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          Qu’est-ce qu’un <span className="text-[#ef5d81]">CRP</span> ?
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-gray-600 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Un CRP (Customer Resource Planning) est un système de gestion intégré qui optimise tous les
          processus de votre entreprise, de la conception à la facturation, en passant par la production
          et le suivi client.
        </motion.p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transform hover:-translate-y-1 hover:scale-[1.03] transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 * index, duration: 0.6, ease: "easeOut" }}
          >
            <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-gradient-to-br from-[#ef718f] to-[#fca07a] flex items-center justify-center shadow-md">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}