import { useState,React } from "react";
import {
  BookOpen,
  CheckCircle,
  Info,
  ChevronRight,
  ChevronLeft,
  User,
  Target,
  Users,
  CreditCard,
  BarChart3,
  HelpCircle,
  Play,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
const steps = [
  {
    id: 1,
    title: "Créer un compte",
    icon: User,
    color: "text-[#f1647c]",
    description:
      "Cliquez sur 'Créer un compte' et remplissez le formulaire d'inscription pour accéder à votre espace MEMO.",
    details: [
      "Rendez-vous sur la page d'inscription",
      "Remplissez vos informations personnelles",
      "Vérifiez votre adresse email",
      "Activez votre compte",
    ],
  },
  {
    id: 2,
    title: "Configurer votre profil",
    icon: Info,
    color: "text-[#f1647c]",
    description:
      "Ajoutez vos informations personnelles, votre entreprise et vos préférences pour personnaliser votre expérience.",
    details: [
      "Complétez vos informations personnelles",
      "Ajoutez les détails de votre entreprise",
      "Configurez vos préférences",
      "Téléchargez votre photo de profil",
    ],
  },
  {
    id: 3,
    title: "Ajouter un projet ou une mission",
    icon: Target,
    color: "text-[#f1647c]",
    description: "Créez un nouveau projet, définissez les objectifs, les membres de l'équipe et les échéances.",
    details: [
      "Créez un nouveau projet",
      "Définissez les objectifs et livrables",
      "Ajoutez les membres de l'équipe",
      "Planifiez les échéances",
    ],
  },
  {
    id: 4,
    title: "Gérer vos clients et factures",
    icon: CreditCard,
    color: "text-[#f1647c]",
    description:
      "Ajoutez vos clients, gérez les devis, factures et suivez les paiements directement depuis la plateforme.",
    details: [
      "Ajoutez vos clients",
      "Créez des devis personnalisés",
      "Générez et envoyez des factures",
      "Suivez les paiements",
    ],
  },
  {
    id: 5,
    title: "Analyser vos performances",
    icon: BarChart3,
    color: "text-[#f1647c]",
    description:
      "Utilisez les tableaux de bord et rapports pour suivre l'évolution de votre activité et prendre de meilleures décisions.",
    details: [
      "Consultez vos tableaux de bord",
      "Analysez vos métriques clés",
      "Générez des rapports détaillés",
      "Exportez vos données",
    ],
  },
];
const toc = [
  { id: 0, title: "Introduction", icon: BookOpen },
  { id: 1, title: "Créer un compte", icon: User },
  { id: 2, title: "Configurer votre profil", icon: Info },
  { id: 3, title: "Ajouter un projet", icon: Target },
  { id: 4, title: "Gérer clients & factures", icon: CreditCard },
  { id: 5, title: "Analyser performances", icon: BarChart3 },
  { id: 6, title: "Support & FAQ", icon: HelpCircle },
];

export default function GuideUtilisation() {
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => {
    if (activeStep < toc.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const getProgressPercentage = () => {
    return (activeStep / (toc.length - 1)) * 100;
  };

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen overflow-hidden font-outfit bg-gradient-to-b from-pink-50 to-white">
        {/* Background elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjAuNSIgZmlsbD0iI2Q0ZTRmZiIgZmlsbC1vcGFjaXR5PSIwLjMiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=')] opacity-20" />
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-pink-100/50 blur-xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-cyan-100/50 blur-xl"></div>

        <div className="relative z-10 container mx-auto px-4 py-12">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
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
              <BookOpen className="text-[#f1647c]" size={24} />
              <span className="text-[#f1647c] text-sm font-semibold uppercase tracking-wide">
                Guide d'utilisation
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
            >
              Bien démarrer avec <span className="bg-gradient-to-r from-[#f1647c] to-orange-400 bg-clip-text text-transparent">MEMO</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Suivez ce guide étape par étape pour maîtriser toutes les fonctionnalités de la plateforme et optimiser
              votre productivité.
            </motion.p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-600">Progression</span>
                <span className="text-sm font-medium text-[#f1647c]">
                  {activeStep + 1} / {toc.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-[#f1647c] to-orange-400 h-2.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <motion.aside
              className="lg:w-80 flex-shrink-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 sticky top-24">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <BookOpen size={20} className="text-[#f1647c]" />
                  Sommaire
                </h3>
                <nav className="space-y-6">
                  {toc.map((item, idx) => (
                    <motion.button
  key={item.id}
  whileHover={{ x: 5 }}
  className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-medium group ${
    activeStep === idx
      ? "bg-pink-50 text-[#f1647c] shadow-sm"
      : "text-gray-700 hover:bg-gray-50"
  }`}
  onClick={() => setActiveStep(idx)}
>
  <div
    className={`p-1 rounded-lg ${activeStep === idx ? "bg-[#f1647c]/10" : "bg-gray-100 group-hover:bg-gray-200"}`}
  >
    <item.icon className={activeStep === idx ? "text-[#f1647c]" : "text-gray-500"} size={18} />
  </div>
  <span className="flex-1">{item.title}</span>
  {activeStep === idx && <ChevronRight size={16} className="text-[#f1647c]" />}
</motion.button>
                  ))}
                </nav>
              </div>
            </motion.aside>

            {/* Main Content */}
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 lg:p-10 min-h-[600px]">
                {/* Introduction */}
                {activeStep === 0 && (
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    <div className="w-20 h-20 bg-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <BookOpen className="text-[#f1647c]" size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Bienvenue dans MEMO</h2>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                      MEMO est une solution tout-en-un conçue pour simplifier la gestion de vos projets, optimiser
                      votre facturation, centraliser votre CRM et analyser vos performances. Ce guide interactif vous
                      accompagnera pas à pas pour découvrir toutes les fonctionnalités et tirer le meilleur parti de la
                      plateforme.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-pink-50 p-6 rounded-xl">
                        <Users className="text-[#f1647c] mb-3" size={32} />
                        <h3 className="font-semibold text-gray-800 mb-2">Gestion d'équipe</h3>
                        <p className="text-gray-600 text-sm">
                          Collaborez efficacement avec vos équipes
                        </p>
                      </div>
                      <div className="bg-orange-50 p-6 rounded-xl">
                        <BarChart3 className="text-orange-500 mb-3" size={32} />
                        <h3 className="font-semibold text-gray-800 mb-2">Analytics avancés</h3>
                        <p className="text-gray-600 text-sm">
                          Analysez vos performances en temps réel
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={nextStep}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-[#f1647c] to-orange-400 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <Play size={20} />
                      Commencer le guide
                    </motion.button>
                  </motion.div>
                )}

                {/* Steps */}
                {steps.map(
                  (step, idx) =>
                    activeStep === idx + 1 && (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                      >
                        <div className="flex items-center gap-4 mb-8">
                         <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center flex-shrink-0">
  <step.icon className={step.color} size={32} />
</div>
                          <div>
                            <div className="text-sm font-medium text-[#f1647c] mb-1">
                              Étape {step.id}
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800">{step.title}</h2>
                          </div>
                        </div>

                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                          {step.description}
                        </p>

                        <div className="bg-gray-50 rounded-xl p-6 mb-8">
                          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <CheckCircle size={20} className="text-green-500" />
                            Points clés à retenir
                          </h3>
                          <ul className="space-y-3">
                            {step.details.map((detail, detailIdx) => (
                              <li key={detailIdx} className="flex items-center gap-3 text-gray-600">
                                <div className="w-2 h-2 bg-[#f1647c] rounded-full flex-shrink-0"></div>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )
                )}

                {/* Support & FAQ */}
                {activeStep === toc.length - 1 && (
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    <div className="w-20 h-20 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <HelpCircle className="text-green-500" size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Support & FAQ</h2>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                      Vous avez terminé le guide ! Pour toute question supplémentaire, notre équipe support est là pour
                      vous aider.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-pink-50 p-6 rounded-xl text-left">
                        <h3 className="font-semibold text-gray-800 mb-3">Centre d'aide</h3>
                        <p className="text-gray-600 text-sm mb-4">
                          Consultez notre base de connaissances complète
                        </p>
                        <a
                          href="/savoir-plus"
                          className="text-[#f1647c] font-medium text-sm hover:underline"
                        >
                          Accéder au centre d'aide →
                        </a>
                      </div>
                      <div className="bg-green-50 p-6 rounded-xl text-left">
                        <h3 className="font-semibold text-gray-800 mb-3">Contact support</h3>
                        <p className="text-gray-600 text-sm mb-4">Notre équipe répond sous 24h</p>
                        <a
                          href="/support"
                          className="text-green-600 font-medium text-sm hover:underline"
                        >
                          Contacter le support →
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Navigation */}
                <motion.div
                  className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                >
                  <motion.button
                    whileHover={{ x: -3 }}
                    onClick={prevStep}
                    disabled={activeStep === 0}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors duration-200 ${
                      activeStep === 0
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <ChevronLeft size={20} />
                    Précédent
                  </motion.button>

                  <div className="text-sm text-gray-500">
                    {activeStep + 1} sur {toc.length}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextStep}
                    disabled={activeStep === toc.length - 1}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors duration-200 ${
                      activeStep === toc.length - 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-[#f1647c] to-orange-400 text-white shadow-lg hover:shadow-xl"
                    }`}
                  >
                    Suivant
                    <ChevronRight size={20} />
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}