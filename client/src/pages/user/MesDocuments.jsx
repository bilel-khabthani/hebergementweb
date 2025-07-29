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
    darkRed: theme === 'dark' ? '#FF6B6B' : '#8B0000',
    purple: theme === 'dark' ? '#A78BFA' : '#7C3AED',
    green: theme === 'dark' ? '#6EE7B7' : '#10B981',
    red: theme === 'dark' ? '#FCA5A5' : '#EF4444',
    indigo: theme === 'dark' ? '#818CF8' : '#4F46E5',
    pink: theme === 'dark' ? '#F9A8D4' : '#EC4899',
  },
  secondary: {
    background: theme === 'dark' ? '#1A1A1A' : '#F8F8F8',
    cardBg: theme === 'dark' ? '#2D2D2D' : '#FFFFFF',
    border: theme === 'dark' ? '#444444' : '#E0E0E0',
    text: theme === 'dark' ? '#B0B0B0' : '#666666',
  }
});

const documentsData = [
  {
    key: '1',
    nom: 'Facture Client A - Mars 2023',
    type: 'PDF',
    date: '15/03/2023',
    statut: 'Payé',
    tags: ['#facture', '#mars'],
  },
  {
    key: '2',
    nom: 'Contrat de Service B - V3.2',
    type: 'PDF',
    date: '22/04/2023',
    statut: 'Actif',
    tags: ['#contrat', '#service'],
  },
  {
    key: '3',
    nom: 'Facture Fournisseur C - Jan 2023',
    type: 'PDF',
    date: '05/01/2023',
    statut: 'Impayé',
    tags: ['#facture', '#fournisseur'],
  },
  {
    key: '4',
    nom: 'Contrat de Partenariat - Marketing',
    type: 'PPT',
    date: '18/05/2023',
    statut: 'Actif',
    tags: ['#contrat', '#marketing'],
  },
];

// Helper function to get status-based colors for Ant Design Tag
const getStatusColor = (status, theme) => {
  const colors = getColors(theme);
  switch (status) {
    case "Payé":
    case "Actif":
      return theme === 'dark' 
        ? 'bg-green-900 text-green-300 border-green-700' 
        : 'bg-green-100 text-green-800 border-green-200';
    case "En retard":
    case "Impayé":
      return theme === 'dark' 
        ? 'bg-red-900 text-red-300 border-red-700' 
        : 'bg-red-100 text-red-800 border-red-200';
    default: 
      return theme === 'dark' 
        ? 'bg-gray-700 text-gray-300 border-gray-600' 
        : 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const PegasioDashboard = () => {
  const { theme } = useTheme();
  const colors = getColors(theme);

  const columns = [
    {
      title: <span className={`font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Nom du document</span>,
      dataIndex: 'nom',
      key: 'nom',
      render: (text) => (
        <a className={`${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} transition-colors duration-300`}>
          {text}
        </a>
      ),
    },
    {
      title: <span className={`font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Type</span>,
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: <span className={`font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Date</span>,
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: <span className={`font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Statut</span>,
      dataIndex: 'statut',
      key: 'statut',
      render: (statut) => (
        <Tag className={`animate-fade-in ${getStatusColor(statut, theme)}`}>
          {statut}
        </Tag>
      ),
    },
    {
      title: <span className={`font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Tags</span>,
      dataIndex: 'tags',
      key: 'tags',
      render: (tags) => (
        <>
          {tags.map((tag) => (
            <Tag 
              color={theme === 'dark' ? 'purple-inverse' : 'purple'} 
              key={tag} 
              className="animate-fade-in"
            >
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
  ];

  // Data for the Line Chart
  const lineChartData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Contrats Signés',
        data: [3, 5, 4, 7, 6, 8],
        fill: true,
        backgroundColor: theme === 'dark' ? 'rgba(167, 139, 250, 0.2)' : 'rgba(124, 58, 237, 0.2)',
        borderColor: theme === 'dark' ? 'rgb(167, 139, 250)' : 'rgb(124, 58, 237)',
        tension: 0.3,
      },
    ],
  };

  const lineChartOptions = {
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
        text: 'Évolution des Contrats Signés',
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
  const barChartData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Factures Émises',
        data: [12, 19, 3, 5, 2, 9],
        backgroundColor: [
          theme === 'dark' ? 'rgba(110, 231, 183, 0.6)' : 'rgba(34, 197, 94, 0.6)',
          theme === 'dark' ? 'rgba(252, 165, 165, 0.6)' : 'rgba(239, 68, 68, 0.6)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: [
          theme === 'dark' ? 'rgba(110, 231, 183, 1)' : 'rgba(34, 197, 94, 1)',
          theme === 'dark' ? 'rgba(252, 165, 165, 1)' : 'rgba(239, 68, 68, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
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
        text: 'Nombre de Factures Émises par Mois',
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
      {/* Espace réservé pour la navbar fixe */}
      <div className={`h-16 w-full fixed top-0 left-0 shadow-sm z-10 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      }`}></div>

      <div className="pt-24 px-8">
        <motion.header
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 flex justify-center items-center"
        >
          <h1 className="text-4xl font-extrabold drop-shadow-sm">
            <span style={{ color: colors.primary.darkText }}>Accès rapide à </span>
            <span style={{ color: colors.primary.darkRed }}>vos documents</span>
          </h1>
        </motion.header>

        <Card 
          className={`shadow-xl rounded-2xl transform transition-all duration-500 hover:scale-[1.01] ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-0'
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
            <button className={`${
              theme === 'dark' 
                ? 'bg-purple-900 hover:bg-purple-800 text-purple-200' 
                : 'bg-purple-100 hover:bg-purple-200 text-purple-800'
            } p-6 rounded-xl text-center font-semibold transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex flex-col items-center justify-center`}>
              <div className="text-4xl mb-3">💰</div>
              Factures
            </button>
            <button className={`${
              theme === 'dark' 
                ? 'bg-green-900 hover:bg-green-800 text-green-200' 
                : 'bg-green-100 hover:bg-green-200 text-green-800'
            } p-6 rounded-xl text-center font-semibold transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex flex-col items-center justify-center`}>
              <div className="text-4xl mb-3">🤝</div>
              Contrats
            </button>
            <button className={`${
              theme === 'dark' 
                ? 'bg-red-900 hover:bg-red-800 text-red-200' 
                : 'bg-red-100 hover:bg-red-200 text-red-800'
            } p-6 rounded-xl text-center font-semibold transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex flex-col items-center justify-center`}>
              <div className="text-4xl mb-3">⚙️</div>
              Support technique
            </button>
          </div>
        </Card>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <Card 
            title={
              <span className={`text-2xl font-bold animate-slide-in-left ${
                theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'
              }`}>
                Statistiques des contrats
              </span>
            } 
            className={`shadow-xl rounded-2xl transform transition-all duration-500 hover:scale-[1.01] ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-0'
            }`}
          >
            <div className="p-4">
              <Line data={lineChartData} options={lineChartOptions} />
            </div>
          </Card>

          <Card 
            title={
              <span className={`text-2xl font-bold animate-slide-in-right ${
                theme === 'dark' ? 'text-pink-300' : 'text-pink-700'
              }`}>
                Statistiques des factures
              </span>
            } 
            className={`shadow-xl rounded-2xl transform transition-all duration-500 hover:scale-[1.01] ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-0'
            }`}
          >
            <div className="p-4">
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </Card>
        </div>

        {/* Documents Table Section */}
        <Card
          title={
            <span className={`text-xl font-bold ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-800'
            }`}>
              Gestion des documents
            </span>
          }
          className={`shadow-xl rounded-2xl transform transition-all duration-500 hover:scale-[1.01] mt-8 ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-0'
          }`}
          extra={
            <button className={`bg-gradient-to-r ${
              theme === 'dark' 
                ? 'from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800' 
                : 'from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700'
            } text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105`}>
              Télécharger tous
            </button>
          }
        >
          <Table
            columns={columns}
            dataSource={documentsData}
            pagination={{ pageSize: 5 }}
            className="mt-6 animate-fade-in"
            scroll={{ x: 'max-content' }}
            rowClassName={() => theme === 'dark' ? 'dark-table-row' : ''}
          />
        </Card>
      </div>
    </div>
  );
};

export default PegasioDashboard;