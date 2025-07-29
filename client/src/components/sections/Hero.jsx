
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import backgroundImage from "../../assets/logo.png";

export default function HeroCRPMemo() {
  return (
    <section className="relative min-h-screen flex items-center justify-start overflow-hidden font-outfit bg-gradient-to-b from-pink-50 to-white">
      {/* Light Background with Subtle Texture */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt="Portal CRP MEMO"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjAuNSIgZmlsbD0iI2Q0ZTRmZiIgZmlsbC1vcGFjaXR5PSIwLjMiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=')] opacity-20" />
      </div>

      {/* Hero Content (Left-aligned now) */}
      <div className="relative z-10 container mx-auto px-4 py-20 mt-20">
        <div className="max-w-3xl text-left">
        

          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-[#f1647c]"
          >
            CRP MEMO
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl"
          >
            Le logiciel de gestion sur mesure qui révolutionne votre entreprise. Entre standardisation et personnalisation, découvrez une solution unique adaptée à votre métier.
          </motion.p>

           <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <a
              href="#"
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-lg shadow-md text-lg font-semibold hover:opacity-90 transition duration-300"
            >
              Découvrir MEMO
            </a>
            <a
              href="#"
              className="px-6 py-3 bg-white text-gray-800 rounded-lg border border-gray-300 text-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              Demander une démo
            </a>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-pink-100/50 blur-xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-cyan-100/50 blur-xl"></div>

      {/* Animated Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: "easeInOut"
          }}
          className="flex flex-col items-center"
        >
          <span className="text-sm text-[#f1647c] mb-2">Explorer</span>
          <div className="w-8 h-12 rounded-full border-2 border-[#f1647c] flex justify-center p-1">
            <motion.div
              className="w-2 h-2 bg-[#f1647c] rounded-full"
              animate={{ y: [0, 8] }}
              transition={{
                repeat: Infinity,
                duration: 1.8,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}