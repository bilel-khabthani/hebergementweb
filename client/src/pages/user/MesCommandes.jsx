import React from 'react';
import { FiPackage, FiTruck, FiTag, FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext'; // Assurez-vous que le chemin est correct

// Fonction pour obtenir les couleurs en fonction du thème
const getColors = (theme) => ({
  primary: {
    royalBlue: theme === 'dark' ? '#5B8DF5' : '#4169E1',
    crimsonRed: theme === 'dark' ? '#FF4D6D' : '#DC143C',
    burntOrange: theme === 'dark' ? '#FF9F66' : '#FF7F50',
    forestGreen: theme === 'dark' ? '#3CB371' : '#228B22',
    offWhite: theme === 'dark' ? '#1A1A1A' : '#F8F8F8',
    darkText: theme === 'dark' ? '#E0E0E0' : '#333333',
    raspberryRed: theme === 'dark' ? '#FF4D8D' : '#E30B5C',
    darkRed: theme === 'dark' ? '#C13535' : '#8B0000',
  },
  secondary: {
    lightBlue: theme === 'dark' ? '#7FB3D5' : '#ADD8E6',
    softOrange: theme === 'dark' ? '#FFB88C' : '#FFA07A',
    paleGreen: theme === 'dark' ? '#A8DF8E' : '#90EE90',
    lightGray: theme === 'dark' ? '#3D3D3D' : '#E0E0E0',
    mediumGrayText: theme === 'dark' ? '#B0B0B0' : '#666666',
  },
  status: {
    success: theme === 'dark' ? '#4CAF50' : '#28A745',
    warning: theme === 'dark' ? '#FFB74D' : '#FFC107',
    error: theme === 'dark' ? '#F44336' : '#DC3545',
    info: theme === 'dark' ? '#4FC3F7' : '#17A2B8',
  }
});

// Helper to get status color and icon
const getStatusProps = (status, theme) => {
  const colors = getColors(theme);
  switch (status) {
    case 'Expédié':
      return { 
        color: colors.status.info, 
        icon: FiTruck, 
        bgColor: theme === 'dark' ? 'rgba(79, 195, 247, 0.1)' : 'rgba(23, 162, 184, 0.1)' 
      };
    case 'En préparation':
      return { 
        color: colors.status.warning, 
        icon: FiClock, 
        bgColor: theme === 'dark' ? 'rgba(255, 183, 77, 0.1)' : 'rgba(255, 193, 7, 0.1)' 
      };
    case 'Livré':
      return { 
        color: colors.status.success, 
        icon: FiCheckCircle, 
        bgColor: theme === 'dark' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(40, 167, 69, 0.1)' 
      };
    case 'Annulé':
      return { 
        color: colors.status.error, 
        icon: FiXCircle, 
        bgColor: theme === 'dark' ? 'rgba(244, 67, 54, 0.1)' : 'rgba(220, 53, 69, 0.1)' 
      };
    default:
      return { 
        color: colors.secondary.mediumGrayText, 
        icon: FiTag, 
        bgColor: theme === 'dark' ? 'rgba(176, 176, 176, 0.1)' : 'rgba(102, 102, 102, 0.1)' 
      };
  }
};

// --- Order Card Component ---
const OrderCard = ({ order, index, theme }) => {
  const colors = getColors(theme);
  const { color, icon: StatusIcon, bgColor } = getStatusProps(order.status, theme);

  return (
    <motion.div
      key={order.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.08, type: "spring", stiffness: 100, damping: 10, mass: 0.8 }}
      whileHover={{ scale: 1.02, boxShadow: "0 12px 25px -8px rgba(0, 0, 0, 0.08)", y: -5 }}
      className={`rounded-2xl shadow-md p-6 mb-4 flex items-center justify-between cursor-pointer overflow-hidden transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
      }`}
      style={{ borderWidth: '1px' }}
    >
      <div className="flex items-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2 + index * 0.08, type: "spring", stiffness: 150, damping: 12 }}
          className="p-3 rounded-full mr-4 flex-shrink-0"
          style={{ backgroundColor: bgColor }}
        >
          <StatusIcon className="text-2xl" style={{ color }} />
        </motion.div>
        <div>
          <p className="font-semibold text-lg" style={{ color: colors.primary.darkText }}>
            Commande <span style={{ color: colors.primary.royalBlue }}>#{order.id}</span>
          </p>
          <p className="text-sm" style={{ color: colors.secondary.mediumGrayText }}>Passée le {order.date}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-xl" style={{ color: colors.primary.darkText }}>{order.amount}</p>
        <motion.span
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + index * 0.08, type: "spring", stiffness: 100, damping: 10 }}
          className="text-xs px-3 py-1 inline-flex leading-5 font-semibold rounded-full mt-2"
          style={{ backgroundColor: bgColor, color }}
        >
          {order.status}
        </motion.span>
      </div>
    </motion.div>
  );
};

// --- Main Component ---
const MesCommandes = () => {
  const { theme } = useTheme();
  const colors = getColors(theme);

  // Order data
  const allOrders = [
    { id: 'PGS-7891', date: '15/07/2023', amount: '€189.99', status: 'Expédié' },
    { id: 'PGS-7890', date: '14/07/2023', amount: '€245.50', status: 'En préparation' },
    { id: 'PGS-7889', date: '13/07/2023', amount: '€120.00', status: 'Livré' },
    { id: 'PGS-7888', date: '12/07/2023', amount: '€89.99', status: 'Livré' },
    { id: 'PGS-7887', date: '11/07/2023', amount: '€55.00', status: 'Livré' },
    { id: 'PGS-7886', date: '10/07/2023', amount: '€320.75', status: 'Expédié' },
    { id: 'PGS-7885', date: '09/07/2023', amount: '€75.20', status: 'Livré' },
    { id: 'PGS-7884', date: '08/07/2023', amount: '€99.99', status: 'Annulé' },
  ];

  // Calculate order summary
  const totalOrders = allOrders.length;
  const deliveredOrders = allOrders.filter(order => order.status === 'Livré').length;
  const pendingOrders = allOrders.filter(order => order.status === 'En préparation' || order.status === 'Expédié').length;

  return (
    <div 
      className="min-h-screen font-sans transition-colors duration-300"
      style={{ backgroundColor: colors.primary.offWhite }}
    >
      {/* Espace réservé pour la navbar fixe */}
      <div className={`h-16 w-full fixed top-0 left-0 shadow-sm z-10 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      }`}></div>      
      
      {/* Header of the Orders page */}
      <div className="pt-24 px-6">
        <motion.header
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 flex justify-center items-center"
        >
          <h1 className="text-4xl font-extrabold drop-shadow-sm">
            <span style={{ color: colors.primary.darkText }}>Toutes vos </span>
            <span style={{ color: colors.primary.darkRed }}>commandes 📦 </span>
          </h1>
        </motion.header>

        {/* Order Summary / Diagram Card */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7, type: "spring", stiffness: 80, damping: 10 }}
          className={`rounded-3xl shadow-xl border p-8 mb-10 flex flex-col sm:flex-row justify-around items-center text-center overflow-hidden transition-colors duration-300 ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
          }`}
        >
          <motion.div
            className="flex flex-col items-center p-4"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <FiPackage size={40} className="mb-3" style={{ color: colors.primary.burntOrange }} />
            <p className="text-4xl font-bold" style={{ color: colors.primary.darkText }}>{totalOrders}</p>
            <p className="text-base" style={{ color: colors.secondary.mediumGrayText }}>Commandes au total</p>
          </motion.div>
          <div className={`w-px h-20 mx-8 hidden sm:block ${
            theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
          }`}></div>
          <motion.div
            className="flex flex-col items-center p-4"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <FiCheckCircle size={40} className="mb-3" style={{ color: colors.primary.forestGreen }} />
            <p className="text-4xl font-bold" style={{ color: colors.primary.darkText }}>{deliveredOrders}</p>
            <p className="text-base" style={{ color: colors.secondary.mediumGrayText }}>Commandes Livrées</p>
          </motion.div>
          <div className={`w-px h-20 mx-8 hidden sm:block ${
            theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
          }`}></div>
          <motion.div
            className="flex flex-col items-center p-4"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <FiClock size={40} className="mb-3" style={{ color: colors.primary.crimsonRed }} />
            <p className="text-4xl font-bold" style={{ color: colors.primary.darkText }}>{pendingOrders}</p>
            <p className="text-base" style={{ color: colors.secondary.mediumGrayText }}>Commandes en cours</p>
          </motion.div>
        </motion.div>

        {/* List of orders */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 70, damping: 9 }}
          className={`rounded-3xl shadow-xl border overflow-hidden p-6 transition-colors duration-300 ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
          }`}
        >
          {allOrders.length > 0 ? (
            <div>
              {allOrders.map((order, index) => (
                <OrderCard 
                  key={order.id} 
                  order={order} 
                  index={index} 
                  theme={theme} 
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
              className="text-center py-12"
            >
              <FiTruck size={70} className="mx-auto mb-8" style={{ color: colors.primary.royalBlue }} />
              <p className="text-xl mb-6" style={{ color: colors.secondary.mediumGrayText }}>Vous n'avez pas encore passé de commandes.</p>
              <motion.button
                className="mt-6 px-10 py-5 rounded-full font-semibold shadow-lg transition-all duration-300 transform"
                style={{ 
                  backgroundColor: colors.primary.burntOrange, 
                  color: theme === 'dark' ? colors.primary.darkText : colors.primary.offWhite 
                }}
                whileHover={{ 
                  scale: 1.08, 
                  boxShadow: '0 8px 20px rgba(0,0,0,0.15)', 
                  backgroundColor: colors.secondary.softOrange 
                }}
                whileTap={{ scale: 0.95 }}
              >
                Découvrir nos produits !
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MesCommandes;