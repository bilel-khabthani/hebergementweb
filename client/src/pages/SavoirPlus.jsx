import React, { useState } from "react";
import { Search, HelpCircle, BookOpen, FileText, Video, Users, ChevronRight, Star, Clock } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom"; // Ajoutez ceci en haut si ce n'est pas déjà fait


export default function SavoirPlus() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const helpCategories = [
    {
      id: "getting-started",
      title: t('savoir.helpCategories.gettingStarted.title'),
      description: t('savoir.helpCategories.gettingStarted.description'),
      icon: BookOpen,
      color: "bg-gradient-to-r from-pink-500 to-orange-400",
      articles: 12
    },
    {
      id: "project-management",
      title: t('savoir.helpCategories.projectManagement.title'),
      description: t('savoir.helpCategories.projectManagement.description'),
      icon: FileText,
      color: "bg-gradient-to-r from-cyan-500 to-blue-500",
      articles: 8
    },
    {
      id: "crm",
      title: t('savoir.helpCategories.crm.title'),
      description: t('savoir.helpCategories.crm.description'),
      icon: Users,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      articles: 15
    },
    {
      id: "billing",
      title: t('savoir.helpCategories.billing.title'),
      description: t('savoir.helpCategories.billing.description'),
      icon: FileText,
      color: "bg-gradient-to-r from-orange-500 to-yellow-400",
      articles: 10
    }
  ];

  const quickActions = [
    { title: t('savoir.quickActions.support'), icon: HelpCircle, action: "support" },
    { title: t('savoir.quickActions.videos'), icon: Video, action: "videos" },
    { title: t('savoir.quickActions.api'), icon: FileText, action: "api" },
    { title: t('savoir.quickActions.community'), icon: Users, action: "community" }
  ];

  const featuredArticles = [
    {
      id: 1,
      title: "Comment créer votre premier projet dans CRP MEMO",
      excerpt: "Guide étape par étape pour démarrer efficacement avec votre premier projet.",
      category: "Premiers pas",
      readTime: "5 min",
      rating: 4.8,
      views: 1250,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Optimiser votre pipeline commercial avec le CRM",
      excerpt: "Techniques avancées pour maximiser vos conversions et suivre vos prospects.",
      category: "CRM & Clients",
      readTime: "8 min",
      rating: 4.9,
      views: 890,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Automatiser votre facturation électronique",
      excerpt: "Préparez-vous dès maintenant à l'obligation de facturation électronique de 2027.",
      category: "Facturation",
      readTime: "6 min",
      rating: 4.7,
      views: 670,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Tableaux de bord et reporting avancé",
      excerpt: "Créez des rapports personnalisés pour suivre la performance de vos projets.",
      category: "Gestion de projets",
      readTime: "10 min",
      rating: 4.8,
      views: 1120,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const filteredArticles = featuredArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    "all",
    ...Array.from(new Set(featuredArticles.map(article => article.category)))
  ];

  return (
    <>
      <Navbar />
      <main>
        <section className="relative min-h-screen overflow-hidden font-outfit bg-gradient-to-b from-pink-50 to-white py-20">
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
                <span className="text-[#f1647c] text-sm font-semibold uppercase tracking-wide">
                  {t('savoir.headerTag')}
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
              >
                {t('savoir.title')} <span className="bg-gradient-to-r from-[#f1647c] to-orange-400 bg-clip-text text-transparent">
                  
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xl text-gray-600 max-w-3xl mx-auto"
              >
                {t('savoir.subtitle')}
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
                  placeholder={t('savoir.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#f1647c]/50 focus:border-transparent shadow-sm transition-all duration-300"
                />
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {quickActions.map((action, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group cursor-pointer"
                >
                  <div className={`w-12 h-12 ${index % 2 === 0 ? 'bg-[#f1647c]/10' : 'bg-blue-100'} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <action.icon className={`${index % 2 === 0 ? 'text-[#f1647c]' : 'text-blue-600'}`} size={24} />
                  </div>
                  <span className="text-gray-800 font-medium text-sm">{action.title}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Help Categories */}
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {helpCategories.map((category) => (
                  <motion.div
                    key={category.id}
                    whileHover={{ y: -10 }}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer"
                  >
                    <div className={`${category.color} p-4 rounded-xl mb-4 w-fit group-hover:scale-110 transition-transform`}>
                      <category.icon className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#f1647c] transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {category.articles} {t('savoir.articles')}
                      </span>
                      <ChevronRight className="text-gray-400 group-hover:text-[#f1647c] group-hover:translate-x-1 transition-all" size={16} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Category Filter */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-[#f1647c] text-white shadow-md"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {category === "all" ? t('savoir.allArticles') : category}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Featured Articles */}
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                {t('savoir.featuredTitle')}
              </h2>

              {filteredArticles.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredArticles.map((article) => (
                    <motion.article
                      key={article.id}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group cursor-pointer"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-[#f1647c] text-white px-3 py-1 rounded-full text-xs font-semibold">
                            {article.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-[#f1647c] transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              <span>{article.readTime}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star size={14} className="text-yellow-500" />
                              <span>{article.rating}</span>
                            </div>
                          </div>
                          <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                            {article.views} {t('savoir.views')}
                          </span>
                        </div>

                        <button className="flex items-center gap-2 text-[#f1647c] hover:text-[#d4556a] font-medium transition-colors group w-full justify-center bg-pink-50 py-2 rounded-lg hover:bg-pink-100">
                          {t('savoir.readArticle')}
                          <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </button>
                      </div>
                    </motion.article>
                  ))}
                </div>
              ) : (
                <motion.div 
                  className="text-center py-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 max-w-md mx-auto">
                    <Search className="mx-auto mb-4 text-gray-300" size={48} />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {t('savoir.noResults')}
                    </h3>
                    <p className="text-gray-500">
                      {t('savoir.noResultsHint')}
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Contact Support */}
<motion.div
  className="bg-gradient-to-r from-[#f9a8d4] to-orange-400 rounded-xl p-8 text-center text-white shadow-xl"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1, duration: 0.6 }}
>
  <HelpCircle className="mx-auto mb-4" size={48} />
  <h3 className="text-2xl font-bold mb-4">
    {t('savoir.supportTitle')}
  </h3>
  <p className="mb-6 opacity-90">
    {t('savoir.supportSubtitle')}
  </p>
  <Link
    to="/support"
    className="inline-block bg-white text-[#f1647c] px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 shadow-md"
  >
    {t('savoir.supportButton')}
  </Link>
</motion.div>
          </div>
        </section>
      </main>
    </>
  );
}