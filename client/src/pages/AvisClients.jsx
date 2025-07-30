import React, { useState } from "react";
import { Star, User, MessageCircle, Send } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const reviews = [
  {
    name: "Sophie Martin",
    rating: 5,
    comment: "Service client réactif et plateforme très intuitive. Je recommande vivement MEMO !",
    date: "12 mars 2024",
  },
  {
    name: "Jean Dupont",
    rating: 4,
    comment: "La gestion de projet est simplifiée, et l'équipe support est à l'écoute.",
    date: "28 février 2024",
  },
  {
    name: "Claire Dubois",
    rating: 5,
    comment: "J'ai pu automatiser ma facturation et gagner un temps précieux. Merci !",
    date: "15 janvier 2024",
  },
  {
    name: "Thomas Bernard",
    rating: 4,
    comment: "Bon rapport qualité/prix et fonctionnalités complètes.",
    date: "2 janvier 2024",
  },
  {
    name: "Émilie Laurent",
    rating: 5,
    comment: "L'intégration avec nos outils existants s'est faite sans problème. Excellent support !",
    date: "5 décembre 2023",
  },
  {
    name: "Nicolas Petit",
    rating: 5,
    comment: "La solution parfaite pour notre PME. Interface claire et paramétrable à souhait.",
    date: "20 novembre 2023",
  },
];

export default function AvisClients() {
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", comment: "", rating: 5 });

  const filteredReviews = reviews.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.comment.toLowerCase().includes(search.toLowerCase())
  );

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

        <div className="relative z-10 container mx-auto px-4 py-20">
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
              <MessageCircle className="text-[#f1647c]" size={28} />
              <span className="text-[#f1647c] text-sm font-semibold uppercase tracking-wide">
                Avis Clients
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
            >
              Ce que disent nos <span className="bg-gradient-to-r from-[#f1647c] to-orange-400 bg-clip-text text-transparent">clients</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Découvrez les témoignages et retours d'expérience de nos utilisateurs MEMO.
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
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher un avis ou un nom..."
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
                {filteredReviews.length} avis{filteredReviews.length !== 1 ? 's' : ''} correspondant{filteredReviews.length !== 1 ? 's' : ''}
              </motion.p>
            )}
          </motion.div>

          {/* Reviews Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {filteredReviews.length === 0 ? (
              <motion.div 
                className="col-span-full text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 max-w-md mx-auto">
                  <MessageCircle className="mx-auto text-gray-300 mb-4" size={48} />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Aucun avis trouvé
                  </h3>
                  <p className="text-gray-500">
                    Essayez avec un autre nom ou mot-clé.
                  </p>
                </div>
              </motion.div>
            ) : (
              filteredReviews.map((review, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 p-6 flex flex-col gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx, duration: 0.4 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-[#f1647c]/10 rounded-full flex items-center justify-center">
                      <User className="text-[#f1647c]" size={20} />
                    </div>
                    <span className="font-semibold text-gray-800 text-lg">{review.name}</span>
                    <span className="text-gray-400 text-sm ml-auto">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={
                          i < review.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }
                        fill={i < review.rating ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 text-base flex-1">{review.comment}</p>
                </motion.div>
              ))
            )}
          </motion.div>

          {/* Review Submission Form */}
          <motion.div
            className="max-w-2xl mx-auto bg-white rounded-xl shadow-md border border-gray-100 p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Laisser un avis</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-600 mb-2">Nom</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#f1647c]/50 focus:border-transparent transition-colors"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Votre avis</label>
                <textarea
                  value={form.comment}
                  onChange={e => setForm({ ...form, comment: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#f1647c]/50 focus:border-transparent transition-colors"
                  placeholder="Votre expérience avec MEMO..."
                  rows={3}
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="block text-gray-600">Note :</label>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    className={`focus:outline-none ${form.rating >= star ? "text-yellow-400" : "text-gray-300"}`}
                    onClick={() => setForm({ ...form, rating: star })}
                  >
                    <Star size={22} fill={form.rating >= star ? "currentColor" : "none"} />
                  </button>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#f9a8d4] to-orange-400 text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl mt-4 w-full justify-center"
                disabled
              >
                <Send size={20} />
                Envoyer (bientôt disponible)
              </motion.button>
            </form>
          </motion.div>
        </div>
      </main>
    </>
  );
}