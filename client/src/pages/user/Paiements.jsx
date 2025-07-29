import React from 'react';
import { Card, Table, Tag } from 'antd';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title as ChartTitle, Tooltip, Legend, BarElement } from 'chart.js';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext'; // Assurez-vous que le chemin est correct

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend
);

// Fonction pour obtenir les couleurs en fonction du thème
const getColors = (theme) => ({
  primary: {
    darkText: theme === 'dark' ? '#E0E0E0' : '#333333',
    blue: theme === 'dark' ? '#3B82F6' : '#2563EB',
    green: theme === 'dark' ? '#10B981' : '#059669',
    red: theme === 'dark' ? '#EF4444' : '#DC2626',
    indigo: theme === 'dark' ? '#818CF8' : '#4F46E5',
    pink: theme === 'dark' ? '#EC4899' : '#DB2777',
    emerald: theme === 'dark' ? '#34D399' : '#10B981',
  },
  secondary: {
    background: theme === 'dark' ? '#1A1A1A' : '#F8F8F8',
    cardBg: theme === 'dark' ? '#2D2D2D' : '#FFFFFF',
    border: theme === 'dark' ? '#444444' : '#E0E0E0',
    text: theme === 'dark' ? '#B0B0B0' : '#666666',
  },
  gradients: {
    header: theme === 'dark' 
      ? 'from-gray-800 via-gray-700 to-gray-600' 
      : 'from-red-100 via-red-50 to-gray-100',
    button: theme === 'dark' 
      ? 'from-blue-600 to-blue-800' 
      : 'from-blue-500 to-blue-700',
    exportButton: theme === 'dark' 
      ? 'from-emerald-600 to-green-700' 
      : 'from-emerald-500 to-green-600',
  }
});

const Paiements = () => {
  const { theme } = useTheme();
  const colors = getColors(theme);

  // Simulated data
  const paymentData = [
    { id: "#0012", date: "15/06/2024", amount: "750.00", status: "Payé", method: "Carte Bancaire", invoice: "#" },
    { id: "#0011", date: "15/05/2024", amount: "750.00", status: "Payé", method: "Virement", invoice: "#" },
    { id: "#0010", date: "15/04/2024", amount: "750.00", status: "Payé", method: "PayPal", invoice: "#" },
    { id: "#0009", date: "15/03/2024", amount: "200.00", status: "En retard", method: "Virement", invoice: "#" },
    { id: "#0008", date: "15/02/2024", amount: "750.00", status: "Payé", method: "Carte Bancaire", invoice: "#" },
    { id: "#0007", date: "15/01/2024", amount: "750.00", status: "Payé", method: "Virement", invoice: "#" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Payé": 
        return theme === 'dark' 
          ? 'bg-green-900 text-green-300 border-green-700' 
          : 'bg-green-100 text-green-800 border-green-200';
      case "En retard": 
        return theme === 'dark' 
          ? 'bg-red-900 text-red-300 border-red-700' 
          : 'bg-red-100 text-red-800 border-red-200';
      default: 
        return theme === 'dark' 
          ? 'bg-gray-700 text-gray-300 border-gray-600' 
          : 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Data for the Line Chart
  const monthlyPaymentsData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Paiements Reçus (€)',
        data: [750, 750, 200, 750, 750, 750],
        fill: true,
        backgroundColor: theme === 'dark' 
          ? 'rgba(59, 130, 246, 0.2)' 
          : 'rgba(37, 99, 235, 0.2)',
        borderColor: theme === 'dark' 
          ? 'rgb(59, 130, 246)' 
          : 'rgb(37, 99, 235)',
        tension: 0.3,
      },
    ],
  };

  const monthlyPaymentsOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { size: 14, weight: 'bold' },
          color: theme === 'dark' ? '#E0E0E0' : '#333',
        }
      },
      title: {
        display: true,
        text: 'Flux Mensuel des Paiements',
        font: {
          size: 20,
          weight: 'bold',
        },
        color: theme === 'dark' ? '#B0B0B0' : '#6B7280',
      },
      tooltip: {
        backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.7)',
        bodyFont: { size: 14 },
        titleFont: { size: 16, weight: 'bold' },
      }
    },
    scales: {
      x: {
        ticks: { color: theme === 'dark' ? '#B0B0B0' : '#4B5563' },
        grid: { display: false }
      },
      y: {
        ticks: { color: theme === 'dark' ? '#B0B0B0' : '#4B5563' },
        grid: { color: theme === 'dark' ? '#444444' : '#E5E7EB' }
      }
    }
  };

  // Data for the Bar Chart
  const paymentStatusData = {
    labels: ['Payé', 'En retard'],
    datasets: [
      {
        label: 'Nombre de Paiements',
        data: [5, 1],
        backgroundColor: [
          theme === 'dark' ? 'rgba(16, 185, 129, 0.6)' : 'rgba(34, 197, 94, 0.6)',
          theme === 'dark' ? 'rgba(239, 68, 68, 0.6)' : 'rgba(220, 38, 38, 0.6)',
        ],
        borderColor: [
          theme === 'dark' ? 'rgba(16, 185, 129, 1)' : 'rgba(34, 197, 94, 1)',
          theme === 'dark' ? 'rgba(239, 68, 68, 1)' : 'rgba(220, 38, 38, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const paymentStatusOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { size: 14, weight: 'bold' },
          color: theme === 'dark' ? '#E0E0E0' : '#333',
        }
      },
      title: {
        display: true,
        text: 'Répartition des Statuts de Paiement',
        font: {
          size: 20,
          weight: 'bold',
        },
        color: theme === 'dark' ? '#B0B0B0' : '#6B7280',
      },
      tooltip: {
        backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.7)',
        bodyFont: { size: 14 },
        titleFont: { size: 16, weight: 'bold' },
      }
    },
    scales: {
      x: {
        ticks: { color: theme === 'dark' ? '#B0B0B0' : '#4B5563' },
        grid: { display: false }
      },
      y: {
        beginAtZero: true,
        ticks: { color: theme === 'dark' ? '#B0B0B0' : '#4B5563', precision: 0 },
        grid: { color: theme === 'dark' ? '#444444' : '#E5E7EB' }
      }
    }
  };

  return (
    <div 
      className="min-h-screen transition-colors duration-300"
      style={{ 
        backgroundColor: colors.secondary.background,
        backgroundImage: theme === 'dark' 
          ? 'none' 
          : 'linear-gradient(to bottom right, #F0F9FF, #F8F0FF)'
      }}
    >
      {/* Navbar placeholder */}
      <div className={`h-16 w-full fixed top-0 left-0 shadow-sm z-10 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      }`}></div>

      {/* Main content with top padding */}
      <div className="pt-24 px-8">
        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`bg-gradient-to-br ${colors.gradients.header} text-${
            theme === 'dark' ? 'gray-200' : 'gray-800'
          } p-8 rounded-2xl shadow-lg mb-10`}
        >
         <h1 className={`text-3xl font-extrabold mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
  Tableau de bord des paiements
</h1>
          <p className={`text-lg opacity-90 font-light ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Suivez l'historique de vos transactions et vos échéances.
          </p>
        </motion.div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { title: "Solde actuel", value: "€2,450.00", color: colors.primary.blue },
            { title: "Dernier paiement", value: "15 Juin 2024", color: colors.primary.green },
            { title: "Prochaine échéance", value: "15 Juillet 2024", color: colors.primary.red }
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card className={`shadow-xl rounded-xl h-full transition-colors duration-300 ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-0'
              }`}>
                <p className={`text-lg font-bold ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                } mb-2`}>
                  {card.title}
                </p>
                <p className="text-2xl font-extrabold" style={{ color: card.color }}>
                  {card.value}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card 
              title={
                <span className="text-2xl font-bold" style={{ color: colors.primary.indigo }}>
                  Flux mensuel
                </span>
              }
              className={`shadow-xl rounded-2xl h-full transition-colors duration-300 ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-0'
              }`}
            >
              <Line data={monthlyPaymentsData} options={monthlyPaymentsOptions} />
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card 
              title={
                <span className="text-2xl font-bold" style={{ color: colors.primary.pink }}>
                  Statut des paiements
                </span>
              }
              className={`shadow-xl rounded-2xl h-full transition-colors duration-300 ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-0'
              }`}
            >
              <Bar data={paymentStatusData} options={paymentStatusOptions} />
            </Card>
          </motion.div>
        </div>

        {/* Transactions table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-10"
        >
          <Card
            title={
              <span className="text-xl font-bold" style={{ color: colors.primary.darkText }}>
                Liste des transactions
              </span>
            }
            className={`shadow-xl rounded-2xl transition-colors duration-300 ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-0'
            }`}
            extra={
              <button className={`bg-gradient-to-r ${colors.gradients.exportButton} text-white px-5 py-2 rounded-full text-md font-semibold shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105`}>
                Exporter (PDF/Excel)
              </button>
            }
          >
            <Table
              dataSource={paymentData}
              columns={[
                {
                  title: <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>ID</span>,
                  dataIndex: 'id',
                  key: 'id',
                },
                {
                  title: <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Date</span>,
                  dataIndex: 'date',
                  key: 'date',
                },
                {
                  title: <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Montant (€)</span>,
                  dataIndex: 'amount',
                  key: 'amount',
                  render: (text) => <span className="font-bold" style={{ color: colors.primary.darkText }}>{text}</span>,
                },
                {
                  title: <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Statut</span>,
                  dataIndex: 'status',
                  key: 'status',
                  render: (status) => (
                    <Tag className={`px-2 py-1 text-xs rounded-full font-semibold ${getStatusColor(status)}`}>
                      {status}
                    </Tag>
                  ),
                },
                {
                  title: <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Méthode</span>,
                  dataIndex: 'method',
                  key: 'method',
                },
                {
                  title: <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Facture</span>,
                  dataIndex: 'invoice',
                  key: 'invoice',
                  render: () => (
                    <a href="#" className={`${
                      theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                    } hover:underline transition-colors duration-300`}>
                      Télécharger
                    </a>
                  ),
                },
              ]}
              pagination={{ pageSize: 5 }}
              scroll={{ x: 'max-content' }}
              rowClassName={() => theme === 'dark' ? 'dark-table-row' : ''}
            />
          </Card>
        </motion.div>

        {/* Quick action button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center"
        >
          <button className={`bg-gradient-to-r ${colors.gradients.button} text-white px-6 py-4 rounded-xl shadow-md hover:shadow-lg flex items-center justify-center gap-3 font-semibold text-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1`}>
            <span role="img" aria-label="payer">💳</span> Payer maintenant
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Paiements;