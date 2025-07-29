import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Search, Filter, ChevronLeft, ChevronRight, X, Send, User } from 'lucide-react';
import axios from 'axios';

export default function SupportTickets() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [tickets, setTickets] = useState([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [replyError, setReplyError] = useState(null);
  const [replySuccess, setReplySuccess] = useState(null);
  const MAX_RETRIES = 2;

  // Fallback API URL
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  useEffect(() => {
    

    console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
    console.log('Using API_URL:', API_URL);
    console.log('User:', { id: user?._id, email: user?.email, role: user?.role });
    if (!user) return;
    if (!user?._id) {
      setError('Please log in to view support tickets.');
      setIsLoading(false);
      return;
    }
    if (user?.role !== 'admin') {
      setError('Admin access required. Please log in with an admin account.');
      setIsLoading(false);
      return;
    }

    const fetchTickets = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        console.log('Fetching tickets with token:', token?.slice(0, 10) + '...');
        console.log('GET URL:', `${API_URL}/api/support/admin/tickets?page=${currentPage}&limit=${itemsPerPage}`);
        const response = await axios.get(`${API_URL}/api/support/admin/tickets`, {
          params: { page: currentPage, limit: itemsPerPage },
          headers: { 'Authorization': `Bearer ${token}` },
          withCredentials: true,
        });
        console.log('Fetched tickets:', response.data);
        setTickets(Array.isArray(response.data.tickets) ? response.data.tickets : []);
        setTotalTickets(response.data.total || 0);
        setRetryCount(0);
      } catch (error) {
        console.error('Error fetching tickets:', {
          message: error.message,
          code: error.code,
          url: error.config?.url,
          status: error.response?.status,
          responseData: error.response?.data,
        });
        if (error.message.includes('Network Error') && retryCount < MAX_RETRIES) {
          console.log(`Retrying (${retryCount + 1}/${MAX_RETRIES})...`);
          setRetryCount(retryCount + 1);
          setTimeout(() => fetchTickets(), 2000);
          return;
        }
        setError(
          error.message.includes('Network Error')
            ? `Cannot connect to the server at ${API_URL}. Please ensure the backend is running and try again.`
            : error.response?.status === 404
            ? 'API endpoint not found. Please check if the backend is running at the correct URL.'
            : error.response?.status === 401
            ? 'Authentication failed. Please log in again.'
            : error.response?.status === 403
            ? 'Admin access required. Please log in with an admin account.'
            : `Failed to fetch tickets: ${error.response?.data?.message || error.message}`
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, [user, API_URL, currentPage, itemsPerPage]);

  const getThemeColors = () => ({
    background: theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50',
    cardBg: theme === 'dark' ? 'bg-gray-800' : 'bg-white',
    text: theme === 'dark' ? 'text-gray-100' : 'text-gray-900',
    secondaryText: theme === 'dark' ? 'text-gray-300' : 'text-gray-600',
    accent: theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600',
    accentHover: theme === 'dark' ? 'hover:text-indigo-300' : 'hover:text-indigo-900',
    tableHeader: theme === 'dark' ? 'bg-gray-700' : 'bg-indigo-50',
    border: theme === 'dark' ? 'border-gray-700' : 'border-gray-200',
    spinner: theme === 'dark' ? 'border-indigo-400' : 'border-indigo-500',
    modalBg: theme === 'dark' ? 'bg-gray-800' : 'bg-white',
    modalBorder: theme === 'dark' ? 'border-gray-700' : 'border-gray-200',
    button: theme === 'dark' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white',
    buttonDisabled: 'bg-gray-400 text-gray-600 cursor-not-allowed',
    replyBg: theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100',
  });

  const colors = getThemeColors();

  // Dynamic status options
  const statusOptions = ['all', ...new Set(tickets.map((ticket) => ticket.status))];

  // Filter tickets
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = ticket.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket._id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  console.log('Filtering tickets:', {
    searchTerm,
    statusFilter,
    ticketCount: filteredTickets.length,
    allTickets: tickets,
    totalTickets,
  });

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(totalTickets / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

  const handleReplySubmit = async () => {
    if (!selectedTicket || !replyContent.trim()) {
      setReplyError('Reply cannot be empty.');
      return;
    }
    setReplyError(null);
    setReplySuccess(null);
    try {
      const token = localStorage.getItem('token');
      console.log('Sending reply to:', `${API_URL}/api/support/${selectedTicket._id}/reply`);
      const response = await axios.post(
        `${API_URL}/api/support/${selectedTicket._id}/reply`,
        { reply: replyContent },
        { headers: { 'Authorization': `Bearer ${token}` }, withCredentials: true }
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
      setReplySuccess('Reply sent successfully and email notification sent to the user.');
    } catch (error) {
      console.error('Error sending reply:', {
        message: error.message,
        status: error.response?.status,
        responseData: error.response?.data,
      });
      setReplyError(
        error.response?.status === 401
          ? 'Authentication failed. Please log in again.'
          : error.response?.status === 403
          ? 'Admin access required.'
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
    <div className={`min-h-screen p-6 md:p-10 transition-colors duration-300 ${colors.background}`}>
      <div className="pt-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`p-6 rounded-2xl shadow-lg mb-8 ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-700'
              : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
          } border`}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="mb-4 sm:mb-0">
              <div className="flex items-center space-x-3 mb-2">
                <MessageCircle className={`w-8 h-8 ${colors.accent}`} />
                <h1 className={`text-2xl md:text-3xl font-bold ${colors.text}`}>
                  Support Tickets Management
                </h1>
              </div>
              <p className={colors.secondaryText}>
                Manage support tickets for all users
              </p>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`p-4 rounded-xl mb-6 ${colors.cardBg} ${colors.border}`}
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className={`block mb-1 ${colors.secondaryText}`}>Search Tickets</label>
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${colors.secondaryText}`} size={20} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by message, email, or ID..."
                  className={`w-full pl-10 p-3 border rounded-lg ${colors.border} ${colors.text}`}
                />
              </div>
            </div>
            <div className="flex-1">
              <label className={`block mb-1 ${colors.secondaryText}`}>Filter by Status</label>
              <div className="relative">
                <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${colors.secondaryText}`} size={20} />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={`w-full pl-10 p-3 border rounded-lg ${colors.border} ${colors.text}`}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status === 'all' ? 'All Statuses' : status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 text-red-700 p-4 rounded mb-4"
          >
            {error} {API_URL ? `API URL: ${API_URL}` : 'API URL is not configured.'}
          </motion.div>
        )}

        {/* Reply Success/Error Messages */}
        {replySuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-green-100 text-green-700 p-4 rounded mb-4"
          >
            {replySuccess}
          </motion.div>
        )}
        {replyError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 text-red-700 p-4 rounded mb-4"
          >
            {replyError}
          </motion.div>
        )}

        {/* Tickets Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`rounded-xl shadow-lg overflow-hidden ${colors.cardBg} ${colors.border}`}
        >
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${colors.spinner}`}></div>
              </div>
            ) : (
              <table className={`min-w-full divide-y ${colors.border}`}>
                <thead className={colors.tableHeader}>
                  <tr>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${colors.secondaryText}`}>
                      Ticket ID
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${colors.secondaryText}`}>
                      Message
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${colors.secondaryText}`}>
                      Email
                    </th>
                    <th className={`px-6 py-3 text-center text-xs font-medium uppercase tracking-wider ${colors.secondaryText}`}>
                      Status
                    </th>
                    <th className={`px-6 py-3 text-center text-xs font-medium uppercase tracking-wider ${colors.secondaryText}`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${colors.border}`}>
                  {filteredTickets.length === 0 ? (
                    <tr>
                      <td colSpan={5} className={`text-center p-8 ${colors.secondaryText}`}>
                        <div className="flex flex-col items-center justify-center">
                          <MessageCircle className={`w-12 h-12 ${colors.secondaryText} mb-2`} />
                          <p className="text-lg">No tickets found</p>
                          <p className="text-sm mt-1">Try adjusting the search or status filter</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredTickets.map((ticket) => (
                      <tr key={ticket._id} className={`hover:bg-gray-50 dark:hover:bg-gray-700`}>
                        <td className={`px-6 py-4 whitespace-nowrap ${colors.text}`}>
                          #{ticket._id.slice(-6)}
                        </td>
                        <td className={`px-6 py-4 ${colors.text}`}>
                          {ticket.message}
                        </td>
                        <td className={`px-6 py-4 ${colors.text}`}>
                          {ticket.userEmail}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            ticket.status === 'open'
                              ? theme === 'dark' ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
                              : ticket.status === 'in-progress'
                              ? theme === 'dark' ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-800'
                              : theme === 'dark' ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800'
                          }`}>
                            <span className={`w-2 h-2 rounded-full mr-2 ${
                              ticket.status === 'open'
                                ? theme === 'dark' ? 'bg-green-400' : 'bg-green-500'
                                : ticket.status === 'in-progress'
                                ? theme === 'dark' ? 'bg-yellow-400' : 'bg-yellow-500'
                                : theme === 'dark' ? 'bg-red-400' : 'bg-red-500'
                            }`}></span>
                            {ticket.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleViewTicket(ticket)}
                            className={`${colors.button} px-4 py-2 rounded-md`}
                          >
                            View & Reply
                          </motion.button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {totalTickets > itemsPerPage && (
            <div className={`px-4 py-3 flex items-center justify-between sm:px-6 ${colors.border}`}>
              <div className="flex-1 flex items-center justify-between">
                <div className="flex items-center">
                  <span className={`text-sm ${colors.secondaryText}`}>
                    Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastItem, totalTickets)}
                    </span>{" "}
                    of <span className="font-medium">{totalTickets}</span> tickets
                  </span>
                  <select
                    className={`ml-4 rounded-md text-sm py-1 px-2 ${colors.border} ${colors.text}`}
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                  >
                    {[5, 10, 20].map((size) => (
                      <option key={size} value={size}>
                        Show {size}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-3 py-1.5 rounded-md border text-sm font-medium ${
                      currentPage === 1
                        ? theme === 'dark'
                          ? 'bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : theme === 'dark'
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600'
                          : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                    }`}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </motion.button>
                  <div className="flex space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                      <motion.button
                        key={number}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => paginate(number)}
                        className={`relative inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md border ${
                          currentPage === number
                            ? theme === 'dark'
                              ? 'bg-indigo-700 text-white border-indigo-600'
                              : 'bg-indigo-600 text-white border-indigo-500'
                            : theme === 'dark'
                              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600'
                              : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                        }`}
                      >
                        {number}
                      </motion.button>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-3 py-1.5 rounded-md border text-sm font-medium ${
                      currentPage === totalPages
                        ? theme === 'dark'
                          ? 'bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : theme === 'dark'
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600'
                          : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                    }`}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          )}
        </motion.div>

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
                        className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleReplySubmit}
                        disabled={!replyContent.trim()}
                        className={`px-4 py-2 rounded-md flex items-center gap-2 ${replyContent.trim() ? colors.button : colors.buttonDisabled}`}
                      >
                        <Send className="w-4 h-4" />
                        Send Reply
                      </motion.button>
                      <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.patch(`${API_URL}/api/support/${selectedTicket._id}/close`, {}, {
        headers: { 'Authorization': `Bearer ${token}` },
        withCredentials: true,
      });

      setSelectedTicket((prev) => ({
        ...prev,
        status: 'closed',
      }));

      setTickets((prev) =>
        prev.map((t) =>
          t._id === selectedTicket._id ? { ...t, status: 'closed' } : t
        )
      );

      setReplySuccess('Ticket marked as closed.');
    } catch (error) {
      console.error('Error closing ticket:', error);
      setReplyError('Failed to close the ticket.');
    }
  }}
  className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-red-700 hover:bg-red-600 text-white' : 'bg-red-100 hover:bg-red-200 text-red-800'}`}
>
  Mark as Closed
</motion.button>

                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes rotate { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-float-slow { animation: float 12s ease-in-out infinite; }
        .animate-float-medium { animation: float 8s ease-in-out infinite reverse; }
        .animate-rotate-slow { animation: rotate 20s linear infinite; }
        .animate-fade-in { animation: fadeIn 1s ease-out forwards; }
      `}</style>
    </div>
  );
}