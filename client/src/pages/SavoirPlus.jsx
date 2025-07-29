import React, { useState } from "react";
import { Search, HelpCircle, BookOpen, FileText, Video, Users, ChevronRight, Star, Clock, Tag } from "lucide-react";
import Navbar from "../components/Navbar";
import { useTranslation } from 'react-i18next';

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
      color: "bg-blue-500",
      articles: 12
    },
    {
      id: "project-management",
      title: t('savoir.helpCategories.projectManagement.title'),
      description: t('savoir.helpCategories.projectManagement.description'),
      icon: FileText,
      color: "bg-green-500",
      articles: 8
    },
    {
      id: "crm",
      title: t('savoir.helpCategories.crm.title'),
      description: t('savoir.helpCategories.crm.description'),
      icon: Users,
      color: "bg-purple-500",
      articles: 15
    },
    {
      id: "billing",
      title: t('savoir.helpCategories.billing.title'),
      description: t('savoir.helpCategories.billing.description'),
      icon: FileText,
      color: "bg-orange-500",
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
    },
    {
      id: 5,
      title: "Intégration avec vos outils comptables",
      excerpt: "Synchronisez CRP MEMO avec votre logiciel de comptabilité existant.",
      category: "Facturation",
      readTime: "7 min",
      rating: 4.6,
      views: 445,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "Gérer une équipe multi-projets",
      excerpt: "Techniques pour coordonner efficacement plusieurs projets simultanément.",
      category: "Gestion de projets",
      readTime: "9 min",
      rating: 4.9,
      views: 780,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
      <main style={{ minHeight: "80vh" }}>
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-black dark:via-gray-900 dark:to-blue-900 min-h-screen py-20">
      {/* Animated background blobs */}
      <div className="absolute inset-0 z-0">
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/20 px-6 py-3 rounded-full mb-6">
            <HelpCircle className="text-blue-600 dark:text-blue-400" size={20} />
            <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold uppercase tracking-wide">
              {t('savoir.headerTag')}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            {t('savoir.title')}
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            {t('savoir.subtitle')}
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={t('savoir.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors shadow-lg text-lg"
            />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group"
              >
                <action.icon className="mx-auto mb-3 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" size={32} />
                <span className="text-gray-900 dark:text-white font-medium text-sm">{action.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Help Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Explorez par catégorie
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpCategories.map((category) => (
              <div
                key={category.id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 group cursor-pointer"
              >
                <div className={`${category.color} p-4 rounded-xl mb-4 w-fit group-hover:scale-110 transition-transform`}>
                  <category.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {category.articles} articles
                  </span>
                  <ChevronRight className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-700"
                }`}
              >
                {category === "all" ? t('savoir.allArticles') : category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Articles */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {t('savoir.featuredTitle')}
          </h2>

          {filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden group cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
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
                      <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">
                        {article.views} {t('savoir.views')}
                      </span>
                    </div>

                    <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group w-full justify-center bg-blue-50 dark:bg-blue-900/20 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30">
                      {t('savoir.readArticle')}
                      <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 max-w-md mx-auto">
                <Search className="mx-auto mb-4 text-gray-400" size={48} />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {t('savoir.noResults')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('savoir.noResultsHint')}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <HelpCircle className="mx-auto mb-4" size={48} />
          <h3 className="text-2xl font-bold mb-4">
            {t('savoir.supportTitle')}
          </h3>
          <p className="mb-6 opacity-90">
            {t('savoir.supportSubtitle')}
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
            {t('savoir.supportButton')}
          </button>
        </div>

      </div>
    </section>
    </main>
    </>
  );
}