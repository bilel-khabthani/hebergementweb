import React, { useState } from "react";
import { Calendar, User, ArrowRight, Search, Tag } from "lucide-react";
import Navbar from "../components/Navbar";

import { useTranslation } from 'react-i18next';
const blogPosts = [
  {
    id: 1,
    title: "Comment optimiser la gestion de vos projets avec CRP MEMO",
    excerpt: "Découvrez les meilleures pratiques pour améliorer l'efficacité de vos équipes et réduire les délais de livraison.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Marie Dubois",
    date: "15 Décembre 2024",
    category: "Gestion de Projets",
    readTime: "5 min"
  },
  {
    id: 2,
    title: "L'importance du CRM dans la croissance de votre entreprise",
    excerpt: "Comment un bon système CRM peut transformer votre relation client et augmenter vos ventes de 30%.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Jean Martin",
    date: "12 Décembre 2024",
    category: "CRM",
    readTime: "7 min"
  },
  {
    id: 3,
    title: "Facturation électronique : préparez-vous dès maintenant",
    excerpt: "Tout ce que vous devez savoir sur l'obligation de facturation électronique qui arrive en 2027.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Sophie Laurent",
    date: "10 Décembre 2024",
    category: "Comptabilité",
    readTime: "6 min"
  },
  {
    id: 4,
    title: "Les tendances digitales 2025 pour les PME",
    excerpt: "Explorez les innovations technologiques qui vont révolutionner la gestion d'entreprise en 2025.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Thomas Bernard",
    date: "8 Décembre 2024",
    category: "Innovation",
    readTime: "8 min"
  },
  {
    id: 5,
    title: "Optimisation des coûts : 10 conseils pratiques",
    excerpt: "Des stratégies éprouvées pour réduire vos coûts opérationnels tout en maintenant la qualité.",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Claire Moreau",
    date: "5 Décembre 2024",
    category: "Finance",
    readTime: "4 min"
  },
  {
    id: 6,
    title: "Guide complet de la planification de projet",
    excerpt: "Maîtrisez l'art de la planification pour mener vos projets vers le succès à coup sûr.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Pierre Durand",
    date: "3 Décembre 2024",
    category: "Gestion de Projets",
    readTime: "10 min"
  }
];

export default function Blog() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const categories = [
    t('blog.categories.all'),
    t('blog.categories.projectManagement'),
    t('blog.categories.crm'),
    t('blog.categories.accounting'),
    t('blog.categories.innovation'),
    t('blog.categories.finance')
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Tous" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
    <Navbar />
    <main>
    <section
      id="blog"
      className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 py-20 min-h-screen"
    >
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
            <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold uppercase tracking-wide">{t('blog.headerTag')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            {t('blog.title')}
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={t('blog.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-red-600 text-white shadow-lg"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-red-50 dark:hover:bg-gray-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">
                    {post.readTime} {t('blog.readTime')}
                  </span>
                </div>

                {/* Read More Button */}
                <button className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors group">
                  {t('blog.readMore')}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* No Results Message */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 max-w-md mx-auto">
              <Tag className="mx-auto mb-4 text-gray-400" size={48} />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {t('blog.noResults')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('blog.noResultsHint')}
              </p>
            </div>
          </div>
        )}

        {/* Newsletter Subscription */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('blog.newsletterTitle')}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t('blog.newsletterSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t('blog.newsletterEmailPlaceholder')}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
            />
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              {t('blog.subscribe')}
            </button>
          </div>
        </div>
      </div>
    </section>
    </main>

  </>
  );
}