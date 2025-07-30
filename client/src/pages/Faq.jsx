import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search, HelpCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const faqData = [
  {
    question: "Comment puis-je créer un compte sur MEMO ?",
    answer: "Pour créer un compte, cliquez sur le bouton 'Essai gratuit' en haut de la page. Vous serez guidé à travers un processus simple en 3 étapes. Aucune information de paiement n'est requise pour commencer l'essai.",
  },
  {
    question: "MEMO est-il compatible avec mon secteur d'activité ?",
    answer: "MEMO est conçu pour s'adapter à divers secteurs. Nous proposons des modules spécifiques pour le commerce, les services, la restauration et plus encore. Contactez-nous pour une démonstration personnalisée.",
  },
  {
    question: "Quelle est la différence entre MEMO et les autres solutions ?",
    answer: "MEMO combine la simplicité des logiciels standards avec la flexibilité des solutions sur mesure. Contrairement aux ERP traditionnels, MEMO s'adapte à vos processus métiers sans nécessiter de développement complexe.",
  },
  {
    question: "Comment se déroule la migration de mes données ?",
    answer: "Notre équipe vous accompagne tout au long du processus. Nous prenons en charge l'import de vos données depuis Excel, CSV ou d'autres logiciels. Un audit préalable garantit une transition en douceur.",
  },
  {
    question: "Puis-je essayer MEMO gratuitement ?",
    answer: "Oui, nous offrons une période d'essai de 14 jours sans engagement. Vous aurez accès à toutes les fonctionnalités et pourrez créer jusqu'à 3 utilisateurs.",
  },
  {
    question: "MEMO propose-t-il un support en français ?",
    answer: "Absolument. Notre support technique est basé en France et disponible par téléphone, email et chat du lundi au vendredi de 9h à 18h. Les temps de réponse moyens sont inférieurs à 2 heures.",
  },
  {
    question: "Quelles options de paiement sont acceptées ?",
    answer: "Nous acceptons les cartes bancaires (Visa, Mastercard), virements SEPA et prélèvements automatiques. Les paiements annuels bénéficient d'une remise de 10%.",
  },
  {
    question: "Comment mettre à jour mon abonnement ?",
    answer: "Vous pouvez modifier votre formule à tout moment depuis votre espace client. Les changements prennent effet immédiatement ou à la fin de votre cycle de facturation, selon votre choix.",
  },
];

export default function Faq() {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const filteredFaqs = faqData.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase()) ||
    faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main>
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden font-outfit bg-gradient-to-b from-pink-50 to-white py-20">
          {/* Background elements */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjAuNSIgZmlsbD0iI2Q0ZTRmZiIgZmlsbC1vcGFjaXR5PSIwLjMiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=')] opacity-20" />
          </div>
          
          {/* Floating elements */}
          <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-pink-100/50 blur-xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-cyan-100/50 blur-xl"></div>

          <div className="relative z-10 container mx-auto px-4 py-10">
            {/* Header */}
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 bg-pink-100 px-6 py-3 rounded-full mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <HelpCircle className="text-[#f1647c]" size={28} />
                <span className="text-[#f1647c] text-sm font-semibold uppercase tracking-wide">FAQ</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
              >
                Questions <span className="bg-gradient-to-r from-[#f1647c] to-orange-400 bg-clip-text text-transparent">Fréquentes</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xl text-gray-600 max-w-3xl mx-auto"
              >
                Trouvez rapidement des réponses à vos questions sur MEMO, ses fonctionnalités et son implémentation.
              </motion.p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              className="mb-12 flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="relative w-full max-w-2xl">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher dans les questions..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#f1647c]/50 focus:border-transparent shadow-sm transition-all duration-300"
                />
              </div>
              {search && (
                <motion.p 
                  className="text-center text-gray-500 mt-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {filteredFaqs.length} question{filteredFaqs.length !== 1 ? 's' : ''} correspondante{filteredFaqs.length !== 1 ? 's' : ''}
                </motion.p>
              )}
            </motion.div>

            {/* FAQ List */}
            <motion.div 
              className="max-w-4xl mx-auto space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {filteredFaqs.length === 0 ? (
                <motion.div 
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                    <HelpCircle className="mx-auto text-gray-300 mb-4" size={48} />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Aucune question trouvée
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Essayez avec d'autres termes ou consultez toutes nos questions ci-dessous.
                    </p>
                    <button 
                      onClick={() => setSearch("")}
                      className="text-[#f1647c] font-medium hover:underline flex items-center justify-center gap-1 mx-auto"
                    >
                      Voir toutes les questions <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              ) : (
                filteredFaqs.map((faq, idx) => (
                  <motion.div
                    key={faq.question}
                    className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx, duration: 0.4 }}
                  >
                    <button
                      className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none"
                      onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                      aria-expanded={openIndex === idx}
                      aria-controls={`faq-panel-${idx}`}
                    >
                      <span className="text-lg font-medium text-gray-800 group-hover:text-[#f1647c] transition-colors pr-4">
                        {faq.question}
                      </span>
                      <div className="flex-shrink-0 ml-4">
                        {openIndex === idx ? (
                          <ChevronUp className="text-[#f1647c] transform transition-transform duration-200" size={24} />
                        ) : (
                          <ChevronDown className="text-gray-400 group-hover:text-[#f1647c] transform transition-all duration-200" size={24} />
                        )}
                      </div>
                    </button>
                    <div
                      id={`faq-panel-${idx}`}
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openIndex === idx 
                          ? "max-h-96 opacity-100" 
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-6 pb-6">
                        <div className="border-l-2 border-[#f1647c] pl-4">
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>

            {/* CTA Section */}
            <motion.div 
              className="mt-16 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Vous ne trouvez pas votre réponse ?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Notre équipe support est disponible pour répondre à toutes vos questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/support"
                  className="px-6 py-3 bg-gradient-to-r from-[#f1647c] to-orange-400 text-white rounded-lg shadow-md text-lg font-semibold hover:opacity-90 transition duration-300"
                >
                  Contactez-nous
                </a>
                <a
                  href="/demo"
                  className="px-6 py-3 bg-white text-gray-800 rounded-lg border border-gray-300 text-lg font-semibold hover:bg-gray-50 transition duration-300"
                >
                  Demander une démo
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}