import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Mail, Clock, CheckCircle, Plus, Send, X, User } from 'lucide-react';
import LiveChatFab from '../components/LiveChatFab'; // Nous allons le déplacer
import image360f from '../assets/360f.png';
import wsm from '../assets/wsm.png';


import axios from 'axios';


export default function Support() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [replyError, setReplyError] = useState(null);
  const [replySuccess, setReplySuccess] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  
  
  const MAX_RETRIES = 2;

  // Fallback API URL if VITE_API_URL is undefined
  const API_URL = import.meta.env.VITE_API_URL || 'https://memo-bosi.onrender.com';

  


  useEffect(() => {
    console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
    console.log('Using API_URL:', API_URL);
    if (user?._id) {
      console.log('Fetching tickets for user:', user._id);
      const fetchTickets = async (retry = 0) => {
        try {
          const token = localStorage.getItem('token');
          console.log('Fetching tickets with token:', token?.slice(0, 10) + '...');
          console.log('GET URL:', `${API_URL}/api/support/${user._id}`);
          const response = await axios.get(`${API_URL}/api/support/${user._id}`, {
            headers: { 'x-token': token },
          });
          console.log('Fetched tickets:', response.data);
          setTickets(Array.isArray(response.data.tickets) ? response.data.tickets : []);
          setRetryCount(0);
        } catch (error) {
          console.error('Error fetching tickets:', {
            message: error.message,
            code: error.code,
            url: error.config?.url,
            status: error.response?.status,
            responseData: error.response?.data,
          });
          if (error.message.includes('Network Error') && retry < MAX_RETRIES) {
            console.log(`Retrying fetch (${retry + 1}/${MAX_RETRIES})...`);
            setTimeout(() => fetchTickets(retry + 1), 2000);
            return;
          }
          setError(
            error.message.includes('Network Error')
              ? `Cannot connect to the server at ${API_URL}. Please ensure the backend is running and try again.`
              : error.response?.status === 404
              ? 'API endpoint not found. Please check if the backend is running at the correct URL.'
              : error.response?.status === 401
              ? 'Authentication failed. Please log in again.'
              : `Failed to fetch tickets: ${error.response?.data?.message || error.message}`
          );
        }
      };
      fetchTickets();
    }
  }, [user, API_URL]);

  const getThemeColors = () => ({
    background: theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100',
    cardBg: theme === 'dark' ? 'bg-gray-800' : 'bg-white',
    text: theme === 'dark' ? 'text-white' : 'text-gray-900',
    secondaryText: theme === 'dark' ? 'text-gray-400' : 'text-gray-600',
    accent: 'text-[#ff1a1a]',
    accentHover: 'hover:text-red-400',
    buttonBg: theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200',
    buttonHover: theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-300',
    border: theme === 'dark' ? 'border-gray-700' : 'border-gray-200',
    modalBg: theme === 'dark' ? 'bg-gray-800' : 'bg-white',
    modalBorder: theme === 'dark' ? 'border-gray-700' : 'border-gray-200',
    replyBg: theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100',
    buttonDisabled: 'bg-gray-400 text-gray-600 cursor-not-allowed',
  });

  const colors = getThemeColors();

  const handleSubmit = async (retry = 0) => {
    if (!message.trim()) {
      setError('Message is required.');
      return;
    }
    setIsSending(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      console.log('Sending ticket with token:', token?.slice(0, 10) + '...');
      console.log('POST URL:', `${API_URL}/api/support`);
      const response = await axios.post(
        `${API_URL}/api/support`,
        {
          userId: user?._id || 'anonymous',
          message,
          userEmail: user?.email || 'anonymous@habile-solutions.com',
        },
        {
          headers: { 'x-token': token },
        }
      );
      console.log('Ticket created:', response.data);
      setSuccess(true);
      setMessage('');
      setRetryCount(0);
      
      // Refresh tickets
      if (user?._id) {
        const ticketsResponse = await axios.get(`${API_URL}/api/support/${user._id}`, {
          headers: { 'x-token': token },
        });
        setTickets(Array.isArray(ticketsResponse.data.tickets) ? ticketsResponse.data.tickets : []);
      }
    } catch (error) {
      console.error('Error sending ticket:', {
        message: error.message,
        code: error.code,
        url: error.config?.url,
        status: error.response?.status,
        responseData: error.response?.data,
      });
      if (error.message.includes('Network Error') && retry < MAX_RETRIES) {
        console.log(`Retrying (${retry + 1}/${MAX_RETRIES})...`);
        setTimeout(() => handleSubmit(retry + 1), 2000);
        return;
      }
      setError(
        error.message.includes('Network Error')
          ? `Cannot connect to the server at ${API_URL}. Please ensure the backend is running and try again.`
          : error.response?.status === 404
          ? 'API endpoint not found. Please check if the backend is running at the correct URL.'
          : error.response?.status === 401
          ? 'Authentication failed. Please log in again.'
          : `Failed to send ticket: ${error.response?.data?.message || error.message}`
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setReplyContent('');
    setReplyError(null);
    setReplySuccess(null);
  };

  const closeTicketView = () => {
    setSelectedTicket(null);
    setReplyContent('');
    setReplyError(null);
    setReplySuccess(null);
  };

  const handleReplySubmit = async (retry = 0) => {
    if (!selectedTicket || !replyContent.trim()) {
      setReplyError('Reply cannot be empty.');
      return;
    }
    if (!selectedTicket._id.match(/^[0-9a-fA-F]{24}$/)) {
      setReplyError('Invalid ticket ID.');
      return;
    }
    setReplyError(null);
    setReplySuccess(null);
    try {
      const token = localStorage.getItem('token');
      console.log('Sending reply to:', `${API_URL}/api/support/${selectedTicket._id}/reply`);
      console.log('Selected ticket ID:', selectedTicket._id);
      console.log('Reply content:', replyContent);
      console.log('Token:', token?.slice(0, 10) + '...');
      const response = await axios.post(
        `${API_URL}/api/support/${selectedTicket._id}/reply`,
        { reply: replyContent },
        { headers: { 'x-token': token } }
      );
      console.log('Reply response:', response.data);
      setTickets((prev) =>
        prev.map((t) =>
          t._id === selectedTicket._id
            ? {
                ...t,
                status: response.data.ticket.status,
                replies: response.data.ticket.replies || t.replies,
              }
            : t
        )
      );
      setSelectedTicket((prev) => ({
        ...prev,
        status: response.data.ticket.status,
        replies: response.data.ticket.replies || prev.replies,
      }));
      setReplyContent('');
      setReplySuccess('Reply sent successfully. The support team has been notified.');
    } catch (error) {
      console.error('Error sending reply:', {
        message: error.message,
        status: error.response?.status,
        responseData: error.response?.data,
        url: error.config?.url,
      });
      if (error.message.includes('Network Error') && retry < MAX_RETRIES) {
        console.log(`Retrying reply (${retry + 1}/${MAX_RETRIES})...`);
        setTimeout(() => handleReplySubmit(retry + 1), 2000);
        return;
      }
      setReplyError(
        error.message.includes('Network Error')
          ? `Cannot connect to the server at ${API_URL}. Please ensure the backend is running and try again.`
          : error.response?.status === 401
          ? 'Authentication failed. Please log in again.'
          : error.response?.status === 403
          ? 'You are not authorized to reply to this ticket.'
          : error.response?.status === 404
          ? 'Ticket not found.'
          : `Failed to send reply: ${error.response?.data?.message || error.message}`
      );
    }
  };





  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div
      className={`min-h-screen flex flex-col py-10 px-4 md:px-20 transition duration-300 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[800px] h-[800px] bg-gradient-to-br from-red-500/10 to-pink-600/10 rounded-full blur-3xl animate-float-slow top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 z-0" />
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-br from-blue-500/10 to-cyan-600/10 rounded-full blur-3xl animate-float-medium top-3/4 left-3/4 -translate-x-1/2 -translate-y-1/2 z-0" />
      </div>

      <h1 className="text-4xl font-bold mb-10 text-center text-red-500 drop-shadow-[0_0_15px_rgba(255,26,26,0.5)] animate-fade-in">
        <MessageCircle className="inline mr-2" /> Support & Maintenance MEMO
      </h1>

      <div className="flex flex-col md:flex-row gap-6 relative z-10">
        {/* Left Section - Maintenance and Support Details */}
        <div className="w-full md:w-2/3">
          <p className="text-sm text-gray-500 mb-4 animate-fade-in">
            Notre équipe est à votre disposition pour garantir la performance de MEMO.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <AnimatePresence>
              {[
                {
                  title: 'Maintenance Corrective',
                  description: 'Résolution rapide des bugs pour assurer la stabilité de MEMO (devis, factures, suivi). Soumettez un ticket pour signaler un problème.',
                  icon: <CheckCircle className={colors.accent} />,
                },
                {
                  title: 'Maintenance Préventive',
                  description: 'Surveillance proactive et mises à jour pour éviter les interruptions. Créez un ticket pour demander une vérification.',
                  icon: <Clock className={colors.accent} />,
                },
                {
                  title: 'Maintenance Évolutive',
                  description: 'Nouvelles fonctionnalités adaptées à vos besoins, comme des KPI avancés. Soumettez une demande via un ticket.',
                  icon: <Plus className={colors.accent} />,
                },
                {
                  title: 'Hébergement Sécurisé',
                  description: 'Infrastructure cloud fiable avec sauvegardes quotidiennes et sécurité renforcée. Signalez tout problème d’hébergement via un ticket.',
                  icon: <Mail className={colors.accent} />,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={`${colors.cardBg} rounded-xl shadow-lg p-4 flex flex-col justify-between hover:shadow-xl transition-all duration-200 border ${colors.border}`}
                >
                  <div className="flex justify-between items-start">
                    <h2 className={`text-xl font-semibold ${colors.accent}`}>
                      {item.title}
                    </h2>
                    {item.icon}
                  </div>
                  <p className={`mt-3 text-sm ${colors.secondaryText}`}>
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>



          
        </div>
        
            <div className="mt-8 text-center">
  <h2 className="text-2xl font-bold mb-4 text-red-500">Besoin d'une expertise ?</h2>
  <p className="text-gray-600 dark:text-gray-300 mb-4">
    Discutez directement avec un consultant MEMO pour répondre à vos besoins spécifiques.
  </p>
  <a
    href="https://koalendar.com/e/meet-avec-expert"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
  >
    📅 Prendre rendez-vous avec un expert
  </a>
</div>
        {/* Right Section - Contact Form */}
        <div className="w-full md:w-1/3 relative">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-red-500 to-pink-600 opacity-30 blur-xl animate-rotate-slow" />
          <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-red-500">Contactez-nous</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-500">Email</p>
                <p className="text-lg font-semibold text-red-500">info@salambo-proserv.com</p>
              </div>
              <div>
                <p className="text-gray-500">Disponibilité</p>
                <p className="text-lg font-semibold">
                  24/7 pour incidents critiques, Lun-Ven 9h-18h pour autres demandes
                </p>
              </div>
            </div>
            <AnimatePresence>
  {success ? (
    <motion.div
      key="success-message"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ 
        opacity: 0, 
        y: -20, 
        scale: 0.95,
        transition: { 
          duration: 0.3,
          ease: "easeIn"
        } 
      }}
      transition={{ 
        duration: 0.3,
        ease: "easeOut",
        scale: { type: "spring", damping: 10 }
      }}
      className="bg-green-100 text-green-700 p-4 rounded mt-6"
      onAnimationComplete={(definition) => {
        if (definition.opacity === 1) {
          setTimeout(() => {
            setSuccess(false);
          }, 5000);
        }
      }}
    >
      Votre ticket a bien été créé. Vous recevrez une réponse par email à l'adresse {user?.email || 'que vous avez fournie'} dans les 24 heures (jours ouvrables).
    </motion.div>
  ) : (
    <motion.div
      key="contact-form"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-4 mt-6"
    >
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-100 text-red-700 p-4 rounded"
        >
          {error} {API_URL ? `API URL: ${API_URL}` : 'API URL is not configured.'}
        </motion.div>
      )}
      <div>
        <label className="block mb-1 text-gray-500">Votre message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 border rounded-lg"
          rows="5"
          required
        />
      </div>
      <motion.button
        onClick={() => handleSubmit(0)}
        disabled={isSending || !message.trim()}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            '0 0 0 0 rgba(255,26,26, 0.7)',
            '0 0 10px 10px rgba(255,26,26, 0)',
            '0 0 0 0 rgba(255,26,26, 0.7)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
        }}
        className={`w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 px-4 rounded-lg font-bold transition duration-300 ${
          isSending || !message.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
        }`}
      >
        {isSending ? 'Envoi en cours...' : 'Envoyer le message'}
      </motion.button>
    </motion.div>
  )}
</AnimatePresence>
          </div>
        </div>
      </div>

      {/* Ticket View Modal */}
      <AnimatePresence>
        {selectedTicket && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ${colors.modalBg} ${colors.modalBorder} ${colors.text}`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`text-xl font-bold ${colors.text}`}>
                    Ticket #{selectedTicket._id.slice(-6)}
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeTicketView}
                    className={colors.secondaryText}
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>
                <div className={`border-b pb-4 mb-4 ${colors.border}`}>
                  <div className="flex items-start">
                    <User className={`w-6 h-6 ${colors.accent} mr-4`} />
                    <div>
                      <p className={`text-sm ${colors.secondaryText}`}>
                        <strong>Email:</strong> {selectedTicket.userEmail}
                      </p>
                      <p className={`text-sm ${colors.secondaryText}`}>
                        <strong>Status:</strong> {selectedTicket.status}
                      </p>
                      <p className={`text-sm ${colors.secondaryText}`}>
                        <strong>Created:</strong> {formatDate(selectedTicket.createdAt)}
                      </p>
                    </div>
                  </div>
                  <p className={`mt-4 ${colors.text}`}>
                    <strong>Message:</strong> {selectedTicket.message}
                  </p>
                </div>
                {selectedTicket.replies && selectedTicket.replies.length > 0 && (
                  <div className="mb-4">
                    <h3 className={`text-lg font-semibold ${colors.text}`}>Replies</h3>
                    {selectedTicket.replies.map((reply, index) => (
                      <div key={index} className={`mt-2 p-3 rounded-lg ${colors.replyBg}`}>
                        <p className={`text-sm ${colors.secondaryText}`}>
                          <strong>{reply.sender}:</strong> {reply.content}
                        </p>
                        <p className={`text-xs ${colors.secondaryText}`}>
                          {formatDate(reply.createdAt)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                <div className={`border-t pt-4 ${colors.border}`}>
                  <h3 className={`text-lg font-semibold mb-2 ${colors.text}`}>Send Reply</h3>
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Type your reply here..."
                    className={`w-full p-3 border rounded-lg min-h-[100px] ${colors.border} ${colors.text}`}
                  />
                  <div className="flex justify-end gap-4 mt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={closeTicketView}
                      className={`px-4 py-2 rounded-md ${colors.buttonBg} ${colors.buttonHover} ${colors.text}`}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleReplySubmit(0)}
                      disabled={!replyContent.trim()}
                      className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                        replyContent.trim()
                          ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
                          : colors.buttonDisabled
                      }`}
                    >
                      <Send className="w-4 h-4" />
                      Send Reply
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
<style>{`
  @keyframes float {
    0%, 100% { transform: translateY(0) translateX(0); }
    50% { transform: translateY(-20px) translateX(10px); }
  }
  @keyframes rotate { to { transform: rotate(360deg); } }
  @keyframes fadeIn { 
    from { opacity: 0; transform: translateY(10px); } 
    to { opacity: 1; transform: translateY(0); } 
  }
  @keyframes fadeOut { 
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(-10px); } 
  }
  .animate-float-slow { animation: float 12s ease-in-out infinite; }
  .animate-float-medium { animation: float 8s ease-in-out infinite reverse; }
  .animate-rotate-slow { animation: rotate 20s linear infinite; }
  .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
  .animate-fade-out { animation: fadeOut 0.5s ease-in forwards; }
`}</style>
      {user && <LiveChatFab key={user._id} />}
    </div>
  );
}