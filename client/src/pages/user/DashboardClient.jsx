import React from 'react';
import { FiPackage, FiShoppingBag, FiHeart, FiAward, FiTruck, FiTrendingUp } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { Card, Progress } from 'antd';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Palette de couleurs premium Pegasio - Adaptée pour les thèmes clair et sombre
const getColors = (theme) => ({
  primary: {
    darkBlue: theme === 'dark' ? '#1E3A8A' : '#0A3D62',
    vibrantOrange: theme === 'dark' ? '#FF9F43' : '#FF7F00',
    lightOrange: theme === 'dark' ? '#FFBE76' : '#FFA740',
    emeraldGreen: theme === 'dark' ? '#00D8A7' : '#00B894',
    skyBlue: theme === 'dark' ? '#8EC5FC' : '#74B9FF',
    lightGreen: theme === 'dark' ? '#C8F7C5' : '#A8E6CF',
    white: theme === 'dark' ? '#1A202C' : '#F8FAFC',
    darkRed: theme === 'dark' ? '#FF6B6B' : '#8B0000',
  },
  secondary: {
    gray: theme === 'dark' ? '#A0AEC0' : '#6B7280',
    lightGray: theme === 'dark' ? '#2D3748' : '#E5E7EB',
  },
  status: {
    success: theme === 'dark' ? '#48BB78' : '#00B894',
    warning: theme === 'dark' ? '#ED8936' : '#FF7F00',
    error: theme === 'dark' ? '#F56565' : '#EF4444',
  },
  background: {
    primary: theme === 'dark' ? '#1A202C' : '#F8FAFC',
    card: theme === 'dark' ? '#2D3748' : '#FFFFFF',
    secondary: theme === 'dark' ? '#2D3748' : '#EDF2F7',
  },
  text: {
    primary: theme === 'dark' ? '#E2E8F0' : '#1A202C',
    secondary: theme === 'dark' ? '#A0AEC0' : '#4A5568',
  }
});

// Composant de carte avec animations
const StatCard = ({ title, value, icon, trend, duration = 0.2, delay = 0, theme }) => {
  const colors = getColors(theme);
  const TrendIcon = trend?.icon;

  let iconColor = colors.primary.darkBlue;
  let bgColorOpacity = '20';

  if (title.includes('point')) {
    iconColor = colors.primary.vibrantOrange;
  } else if (title.includes('Commandes totales')) {
    iconColor = colors.primary.darkBlue;
  } else if (title.includes('liste de souhaits')) {
    iconColor = colors.primary.emeraldGreen;
  } else if (title.includes('Commandes en cours')) {
    iconColor = colors.primary.skyBlue;
  }

  let iconBgColor = `${iconColor}${bgColorOpacity}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, type: "spring", stiffness: 150, delay }}
      whileHover={{
        y: -5,
        boxShadow: "0 15px 35px -8px rgba(0, 0, 0, 0.15)",
        scale: 1.02
      }}
      className={`p-5 rounded-2xl shadow-sm border transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-100'
      }`}
      style={{ cursor: 'pointer' }}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className={`text-sm font-medium ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {title}
          </p>
          <p className={`text-2xl font-bold mt-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {value}
          </p>
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${
              trend.color === "text-status-success" 
                ? `text-${colors.status.success}` 
                : `text-${colors.status.warning}`
            }`}>
              {TrendIcon && <TrendIcon className="mr-1" />}
              <span>{trend.value}</span>
            </div>
          )}
        </div>
        <div
          className="p-3 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: iconBgColor }}
        >
          {React.cloneElement(icon, {
            className: "text-xl",
            style: { color: iconColor }
          })}
        </div>
      </div>
    </motion.div>
  );
};

// Composant de produit favori
const FavoriteProduct = ({ name, lastOrder, status, delay = 0, theme }) => {
  const colors = getColors(theme);

  const getStatusClasses = (status) => {
    switch (status) {
      case 'Expédié':
        return theme === 'dark' 
          ? 'bg-green-900 text-green-300' 
          : 'bg-green-100 text-green-800';
      case 'En préparation':
        return theme === 'dark' 
          ? 'bg-yellow-900 text-yellow-300' 
          : 'bg-yellow-100 text-yellow-800';
      case 'Livré':
        return theme === 'dark' 
          ? 'bg-blue-900 text-blue-300' 
          : 'bg-blue-100 text-blue-800';
      default:
        return theme === 'dark' 
          ? 'bg-gray-700 text-gray-300' 
          : 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 120, delay }}
      whileHover={{ scale: 1.02, boxShadow: "0 8px 20px -5px rgba(0, 0, 0, 0.08)" }}
      className={`flex items-center p-4 rounded-2xl shadow-xs border transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-100'
      }`}
      style={{ cursor: 'pointer' }}
    >
      <div className="relative">
        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-green-400 flex items-center justify-center">
          <FiPackage className="text-white text-xl" />
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 + delay, type: "spring", stiffness: 200 }}
          className={`absolute -top-2 -right-2 p-1 rounded-full shadow-sm ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-white'
          }`}
        >
          <FiHeart className="text-orange-500 text-sm" fill="#FF7F00" />
        </motion.div>
      </div>
      <div className="ml-4 flex-1">
        <h4 className={`font-medium ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {name}
        </h4>
        <p className={`text-sm ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Dernière commande: {lastOrder}
        </p>
      </div>
      <div className="ml-4">
        <span className={`px-3 py-1 text-xs rounded-full font-semibold ${getStatusClasses(status)}`}>
          {status}
        </span>
      </div>
    </motion.div>
  );
};
const performanceData = [
  { name: 'Jan', utilisation: 65, satisfaction: 78 },
  { name: 'Fév', utilisation: 59, satisfaction: 82 },
  { name: 'Mar', utilisation: 80, satisfaction: 85 },
  { name: 'Avr', utilisation: 81, satisfaction: 83 },
  { name: 'Mai', utilisation: 76, satisfaction: 88 },
  { name: 'Jun', utilisation: 85, satisfaction: 90 },
];

const ClientDashboard = () => {
  const { user, loading } = useAuth();
  const { theme } = useTheme();
  const colors = getColors(theme);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        Chargement...
      </div>
    );
  }

  if (!user) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'
      }`}>
        <p>Veuillez vous connecter pour accéder à ce contenu</p>
        <Link to="/login" className="text-blue-500 ml-2">Se connecter</Link>
      </div>
    );
  }

  const clientData = {
    userName: user.name || "Utilisateur",
    orders: user.orders || 18,
    wishlist: user.wishlistItems || 7,
    ongoingOrders: user.pendingOrders || 2,
    loyaltyPoints: user.loyaltyPoints || 1250
  };

  const favoriteProducts = [
    {
      name: 'Pegasio Ultra Running',
      lastOrder: '15/07/2023',
      status: 'Expédié'
    },
    {
      name: 'Veste Sport Pro',
      lastOrder: '10/07/2023',
      status: 'Livré'
    },
    {
      name: 'Casque Vélo Aero',
      lastOrder: '01/07/2023',
      status: 'Livré'
    }
  ];

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'
      }`}
    >
      {/* En-tête personnalisé */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100, delay: 0.2 }}
        className="mb-10 p-6"
      >
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <div className="space-y-6">
              <section className={`rounded-xl p-6 shadow-sm ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-blue-900 to-purple-900' 
                  : 'bg-gradient-to-r from-blue-50 to-purple-50'
              }`}></section>
              <h1 className={`text-4xl font-extrabold leading-tight ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Bonjour, {clientData.userName} 👋
              </h1>
              <p className="text-lg mt-2" style={{ color: colors.primary.darkRed }}>
                Bienvenue dans votre espace client personnalisé Pegasio
              </p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Section Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
        className={`space-y-6 p-6 rounded-2xl shadow-sm mb-10 mx-6 transition-colors duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card 
  className="shadow-md border-0"
  styles={{
    body: {
      backgroundColor: theme === 'dark' ? '#2D3748' : '#FFFFFF',
      color: theme === 'dark' ? '#E2E8F0' : '#1A202C',
    }
  }}
>
            <h3 className={`font-semibold ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
            }`}>
              Utilisation moyenne
            </h3>
            <div className="flex items-center mt-2">
            <Progress
              type="circle"
              percent={78}
              strokeColor="#10b981"
              className="mr-4"
              size={80}
            />
              <div>
                <p className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>
                  78/100
                </p>
                <p className="text-green-500">+5.2% vs dernier trimestre</p>
              </div>
            </div>
          </Card>
          

         <Card 
  className="shadow-md border-0"
  styles={{
    body: {
      backgroundColor: theme === 'dark' ? '#2D3748' : '#FFFFFF',
      color: theme === 'dark' ? '#E2E8F0' : '#1A202C',
    }
  }}
>
            <h3 className={`font-semibold ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
            }`}>
              Satisfaction client
            </h3>
            <div className="flex items-center mt-2">
            <Progress
              type="circle"
              percent={88}
              strokeColor="#10b981"
              className="mr-4"
              size={80}
            />
              <div>
                <p className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>
                  88/100
                </p>
                <p className="text-green-500">+12% vs année dernière</p>
              </div>
            </div>
          </Card>

         <Card 
  className="shadow-md border-0"
  styles={{
    body: {
      backgroundColor: theme === 'dark' ? '#2D3748' : '#FFFFFF',
      color: theme === 'dark' ? '#E2E8F0' : '#1A202C',
    }
  }}
>
            <h3 className={`font-semibold ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
            }`}>
              Documents disponibles
            </h3>
            <div className="flex items-center mt-2">
              <Progress
                type="circle"
                percent={100}
                strokeColor="#f59e0b"
                className="mr-4"
             size={80}
                format={() => (
                  <span className={`text-xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}>
                    12
                  </span>
                )}
              />
              <div>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}>
                  Dernier ajout:
                </p>
                <p className="text-blue-500 font-medium">
                  Guide d'intégration API
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Graphiques de performance */}
        <Card 
  title="Performance Pegasio" 
  className="shadow-md border-0"
  styles={{
    body: {
      backgroundColor: theme === 'dark' ? '#2D3748' : '#FFFFFF',
      color: theme === 'dark' ? '#E2E8F0' : '#1A202C',
    },
    header: {
      backgroundColor: theme === 'dark' ? '#2D3748' : '#FFFFFF',
      color: theme === 'dark' ? '#E2E8F0' : '#1A202C',
      borderColor: theme === 'dark' ? '#4A5568' : '#E2E8F0',
    }
  }}
>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className={`font-medium mb-4 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Taux d'utilisation mensuel
              </h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#4A5568' : '#E2E8F0'} />
                  <XAxis 
                    dataKey="name" 
                    stroke={theme === 'dark' ? '#A0AEC0' : '#718096'} 
                  />
                  <YAxis 
                    stroke={theme === 'dark' ? '#A0AEC0' : '#718096'} 
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#2D3748' : '#FFFFFF',
                      borderColor: theme === 'dark' ? '#4A5568' : '#E2E8F0',
                      color: theme === 'dark' ? '#E2E8F0' : '#1A202C',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="utilisation"
                    stroke="#4f46e5"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                    name="Utilisation (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h4 className={`font-medium mb-4 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Satisfaction client
              </h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#4A5568' : '#E2E8F0'} />
                  <XAxis 
                    dataKey="name" 
                    stroke={theme === 'dark' ? '#A0AEC0' : '#718096'} 
                  />
                  <YAxis 
                    stroke={theme === 'dark' ? '#A0AEC0' : '#718096'} 
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#2D3748' : '#FFFFFF',
                      borderColor: theme === 'dark' ? '#4A5568' : '#E2E8F0',
                      color: theme === 'dark' ? '#E2E8F0' : '#1A202C',
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="satisfaction"
                    fill="#10b981"
                    name="Satisfaction (/100)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Section principale - Stats et Carte Fidélité */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10 px-6"
      >
        {/* Cartes de statistiques */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard
            title="Vos points fidélité"
            value={clientData.loyaltyPoints}
            icon={<FiAward />}
            trend={{ icon: FiTrendingUp, value: "+150 ce mois", color: "text-status-success" }}
            delay={0.1}
            theme={theme}
          />
          <StatCard
            title="Commandes totales"
            value={clientData.orders}
            icon={<FiShoppingBag />}
            trend={{ icon: FiTrendingUp, value: "+3 ce mois", color: "text-status-success" }}
            duration={0.3}
            delay={0.2}
            theme={theme}
          />
          <StatCard
            title="Votre liste de souhaits"
            value={clientData.wishlist}
            icon={<FiHeart />}
            duration={0.4}
            delay={0.3}
            theme={theme}
          />
          <StatCard
            title="Commandes en cours"
            value={clientData.ongoingOrders}
            icon={<FiTruck />}
            duration={0.5}
            delay={0.4}
            theme={theme}
          />
        </div>

        {/* Carte de fidélité Premium */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 100, damping: 10 }}
          className={`rounded-3xl shadow-2xl p-8 overflow-hidden relative transform hover:scale-102 transition-all duration-300 ease-in-out ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-blue-900 to-orange-800' 
              : 'bg-gradient-to-br from-blue-600 to-orange-500'
          }`}
        >
          <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full bg-white bg-opacity-10 transform rotate-45"></div>
          <div className="absolute -left-5 -bottom-5 w-24 h-24 rounded-full bg-white bg-opacity-10 transform -rotate-30"></div>

          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <h3 className="font-extrabold text-3xl mb-4 text-white">
                Votre Carte Pegasio Premium
              </h3>
              <p className="text-base opacity-95 text-white">
                Profitez d'avantages exclusifs !
              </p>
            </div>

            <div className="flex items-center justify-between mb-8 text-white">
              <div>
                <p className="text-sm opacity-80">Membre depuis</p>
                <p className="font-semibold text-lg">2021</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-80">Niveau</p>
                <p className="font-bold text-lg">Gold</p>
              </div>
            </div>
            <div className="bg-white bg-opacity-20 p-5 rounded-xl backdrop-blur-sm shadow-inner">
              <div className="flex justify-between items-center text-white">
                <div>
                  <p className="text-sm opacity-80">Prochain avantage</p>
                  <p className="font-bold text-base">
                    Une réduction exclusive de 30% vous attend sur notre prochain produit phare 🔥
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Produits favoris */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.7, ease: "easeOut" }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10 px-6"
      >
        <div className="lg:col-span-2 space-y-4">
          <h3 className={`font-semibold text-2xl mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Vos produits favoris
          </h3>
          {favoriteProducts.map((product, index) => (
            <FavoriteProduct
              key={index}
              name={product.name}
              lastOrder={product.lastOrder}
              status={product.status}
              delay={index * 0.1}
              theme={theme}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ClientDashboard;