import { useState, useEffect } from "react";
import { 
  Mail, Search, Filter, ChevronLeft, ChevronRight, X, 
  Reply, Archive, Trash2, Circle, CheckCircle, Clock, 
  User, MailOpen, ArrowLeft, Eye
} from "lucide-react";
import { getAllContacts, updateContact, deleteContact } from "../../api/contacts";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useTheme } from "../../contexts/ThemeContext";
import { motion } from "framer-motion";

const SupportInbox = () => {
  const { theme } = useTheme();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const statusOptions = [
    { value: "all", label: "All Messages" },
    { value: "unread", label: "Unread", icon: Circle, color: theme === 'dark' ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-800" },
    { value: "read", label: "Read", icon: MailOpen, color: theme === 'dark' ? "bg-gray-900/30 text-gray-400" : "bg-gray-100 text-gray-800" },
    { value: "pending", label: "Pending", icon: Clock, color: theme === 'dark' ? "bg-yellow-900/30 text-yellow-400" : "bg-yellow-100 text-yellow-800" },
    { value: "resolved", label: "Resolved", icon: CheckCircle, color: theme === 'dark' ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-800" },
    { value: "archived", label: "Archived", icon: Archive, color: theme === 'dark' ? "bg-purple-900/30 text-purple-400" : "bg-purple-100 text-purple-800" }
  ];

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const res = await getAllContacts();
        setMessages(res.data.messages || []);
        setFilteredMessages(res.data.messages || []);
      } catch (err) {
        console.error("Error loading messages:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    loadMessages();
  }, []);

  useEffect(() => {
    let result = [...messages];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(msg => 
        msg.name.toLowerCase().includes(term) ||
        msg.email.toLowerCase().includes(term) ||
        msg.subject.toLowerCase().includes(term) ||
        msg.message.toLowerCase().includes(term)
      );
    }
    if (statusFilter !== "all") {
      result = result.filter(msg => msg.status === statusFilter);
    }
    setFilteredMessages(result);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, messages]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMessages = filteredMessages.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusDetails = (status) => {
    const statusInfo = statusOptions.find(option => option.value === status);
    return statusInfo || { label: status, color: theme === 'dark' ? "bg-gray-900/30 text-gray-400" : "bg-gray-100 text-gray-800" };
  };

  const handleViewMessage = async (message) => {
    setSelectedMessage(message);
    if (message.status === "unread") {
      try {
        await updateContact(message._id, { status: "read" });
        setMessages(prev => 
          prev.map(msg => 
            msg._id === message._id ? { ...msg, status: "read" } : msg
          )
        );
      } catch (err) {
        console.error("Error updating message status:", err);
      }
    }
  };

  const closeMessageView = () => {
    setSelectedMessage(null);
    setReplyContent("");
  };

  const handleStatusChange = async (newStatus) => {
    if (!selectedMessage) return;
    try {
      await updateContact(selectedMessage._id, { status: newStatus });
      setMessages(prev => 
        prev.map(msg => 
          msg._id === selectedMessage._id ? { ...msg, status: newStatus } : msg
        )
      );
      setSelectedMessage(prev => ({ ...prev, status: newStatus }));
    } catch (err) {
      console.error("Error updating message status:", err);
    }
  };

  const handleReplySubmit = async () => {
    if (!selectedMessage || !replyContent.trim()) return;
    try {
      alert(`Reply sent to ${selectedMessage.email}:\n\n${replyContent}`);
      await updateContact(selectedMessage._id, { status: "resolved" });
      setMessages(prev => 
        prev.map(msg => 
          msg._id === selectedMessage._id ? { ...msg, status: "resolved" } : msg
        )
      );
      setSelectedMessage(prev => ({ ...prev, status: "resolved" }));
      setReplyContent("");
    } catch (err) {
      console.error("Error sending reply:", err);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteContact(deleteId);
      setMessages(prev => prev.filter(msg => msg._id !== deleteId));
      setFilteredMessages(prev => prev.filter(msg => msg._id !== deleteId));
      if (selectedMessage && selectedMessage._id === deleteId) {
        closeMessageView();
      }
      if (currentPage > Math.ceil(filteredMessages.length / itemsPerPage)) {
        setCurrentPage(1);
      }
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleArchive = async (id) => {
    try {
      await updateContact(id, { status: "archived" });
      setMessages(prev => 
        prev.map(msg => 
          msg._id === id ? { ...msg, status: "archived" } : msg
        )
      );
      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage(prev => ({ ...prev, status: "archived" }));
      }
    } catch (err) {
      console.error("Archive error:", err);
    }
  };

  return (
    <div className={`h-screen w-full overflow-y-auto transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="p-6 md:p-8 lg:p-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`p-6 rounded-2xl shadow-lg mb-8 ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          } border`}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="mb-4 sm:mb-0">
              <div className="flex items-center space-x-3 mb-2">
                <Mail className={`w-8 h-8 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
                <h1 className={`text-2xl md:text-3xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>Support Inbox</h1>
              </div>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Manage and respond to user messages
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          {[
            { label: "Total Messages", count: messages.length, icon: Mail, color: "indigo" },
            { label: "Unread", count: messages.filter(m => m.status === "unread").length, icon: Circle, color: "blue" },
            { label: "Pending", count: messages.filter(m => m.status === "pending").length, icon: Clock, color: "yellow" },
            { label: "Resolved", count: messages.filter(m => m.status === "resolved").length, icon: CheckCircle, color: "green" },
            { label: "Archived", count: messages.filter(m => m.status === "archived").length, icon: Archive, color: "purple" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`rounded-xl shadow-lg p-4 border transition-all duration-300 hover:shadow-xl ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {stat.label}
                  </p>
                  <p className={`text-xl font-bold mt-1 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    {stat.count}
                  </p>
                </div>
                <div className={theme === 'dark' ? `bg-${stat.color}-900/30 p-2 rounded-lg` : `bg-${stat.color}-100 p-2 rounded-lg`}>
                  <stat.icon className={`w-5 h-5 ${theme === 'dark' ? `text-${stat.color}-400` : `text-${stat.color}-600`}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`rounded-xl shadow-lg p-4 mb-6 border transition-all duration-300 hover:shadow-xl ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
              </div>
              <input
                type="text"
                placeholder="Search messages, names, subjects..."
                className={`pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 text-gray-900'
                }`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
              </div>
              <select
                className={`pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 text-gray-900'
                }`}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            {(searchTerm || statusFilter !== "all") && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center justify-center gap-2 px-4 py-2 border rounded-lg transition-colors shadow-md hover:shadow-lg ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
              >
                <X className="w-4 h-4" />
                Clear Filters
              </motion.button>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`rounded-xl shadow-lg overflow-hidden border transition-all duration-300 hover:shadow-xl ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}
        >
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
                  theme === 'dark' ? 'border-indigo-400' : 'border-indigo-500'
                }`}></div>
              </div>
            ) : (
              <table className={`min-w-full divide-y ${
                theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'
              }`}>
                <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-indigo-50'}>
                  <tr>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>Sender</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>Subject</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>Message</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>Date</th>
                    <th className={`px-6 py-3 text-center text-xs font-medium uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>Status</th>
                    <th className={`px-6 py-3 text-center text-xs font-medium uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>Actions</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${
                  theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'
                }`}>
                  {currentMessages.length === 0 ? (
                    <tr>
                      <td colSpan={6} className={`text-center p-8 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <div className="flex flex-col items-center justify-center">
                          <Mail className={`w-12 h-12 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} mb-2`} />
                          <p className="text-lg">No messages found</p>
                          <p className="text-sm mt-1">Try adjusting your filters</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentMessages.map((message) => {
                      const statusInfo = getStatusDetails(message.status);
                      const isUnread = message.status === "unread";
                      return (
                        <tr
                          key={message._id || message.id}
                          className={`${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors ${isUnread ? (theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50') : ''}`}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className={theme === 'dark' ? 'bg-indigo-900/50 p-2 rounded-full mr-3' : 'bg-indigo-100 p-2 rounded-full mr-3'}>
                                <User className={`w-4 h-4 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
                              </div>
                              <div>
                                <div className={`font-medium ${isUnread ? (theme === 'dark' ? 'text-indigo-400' : 'text-indigo-700') : (theme === 'dark' ? 'text-gray-100' : 'text-gray-900')}`}>
                                  {message.name}
                                </div>
                                <div className={`text-sm truncate max-w-[120px] ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {message.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className={`font-medium ${isUnread ? (theme === 'dark' ? 'text-indigo-400 font-semibold' : 'text-indigo-700 font-semibold') : (theme === 'dark' ? 'text-gray-100' : 'text-gray-900')}`}>
                              {message.subject}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className={`text-sm truncate max-w-[200px] ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                              {message.message}
                            </p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                              {formatDate(message.createdAt)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                              <span className={`w-2 h-2 rounded-full mr-2 ${
                                theme === 'dark' 
                                  ? statusInfo.color.includes('blue') ? 'bg-blue-400' :
                                    statusInfo.color.includes('green') ? 'bg-green-400' :
                                    statusInfo.color.includes('yellow') ? 'bg-yellow-400' :
                                    statusInfo.color.includes('purple') ? 'bg-purple-400' :
                                    'bg-gray-400'
                                  : statusInfo.color.includes('blue') ? 'bg-blue-500' :
                                    statusInfo.color.includes('green') ? 'bg-green-500' :
                                    statusInfo.color.includes('yellow') ? 'bg-yellow-500' :
                                    statusInfo.color.includes('purple') ? 'bg-purple-500' :
                                    'bg-gray-500'
                              }`}></span>
                              {statusInfo.label}
                            </span>
                          </td>
                          <td className="px-6 py-4 flex justify-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleViewMessage(message)}
                              className={theme === 'dark' ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-900'}
                              title="View message"
                            >
                              <div className={theme === 'dark' ? 'bg-indigo-900/30 p-2 rounded-lg hover:bg-indigo-800' : 'bg-indigo-50 p-2 rounded-lg hover:bg-indigo-100'}>
                                <Eye className="w-4 h-4" />
                              </div>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleArchive(message._id)}
                              className={theme === 'dark' ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-900'}
                              title="Archive message"
                            >
                              <div className={theme === 'dark' ? 'bg-purple-900/30 p-2 rounded-lg hover:bg-purple-800' : 'bg-purple-50 p-2 rounded-lg hover:bg-purple-100'}>
                                <Archive className="w-4 h-4" />
                              </div>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDeleteClick(message._id)}
                              className={theme === 'dark' ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-900'}
                              title="Delete message"
                            >
                              <div className={theme === 'dark' ? 'bg-red-900/30 p-2 rounded-lg hover:bg-red-800' : 'bg-red-50 p-2 rounded-lg hover:bg-red-100'}>
                                <Trash2 className="w-4 h-4" />
                              </div>
                            </motion.button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            )}
          </div>

          {filteredMessages.length > itemsPerPage && (
            <div className={`px-4 py-3 flex items-center justify-between sm:px-6 border-t ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex-1 flex items-center justify-between">
                <div className="flex items-center">
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastItem, filteredMessages.length)}
                    </span>{" "}
                    of <span className="font-medium">{filteredMessages.length}</span> messages
                  </span>
                  <select
                    className={`ml-4 rounded-md text-sm py-1 px-2 ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'border-gray-300 text-gray-900'
                    }`}
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                  >
                    {[5, 10, 20, 50].map((size) => (
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
                          ? "bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : theme === 'dark'
                          ? "bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600"
                          : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                    }`}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </motion.button>
                  <div className="flex space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (number) => (
                        <motion.button
                          key={number}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => paginate(number)}
                          className={`relative inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md border ${
                            currentPage === number
                              ? theme === 'dark'
                                ? "bg-indigo-700 text-white border-indigo-600"
                                : "bg-indigo-600 text-white border-indigo-500"
                              : theme === 'dark'
                                ? "bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600"
                                : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                          }`}
                        >
                          {number}
                        </motion.button>
                      )
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      currentPage < totalPages && paginate(currentPage + 1)
                    }
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-3 py-1.5 rounded-md border text-sm font-medium ${
                      currentPage === totalPages
                        ? theme === 'dark'
                          ? "bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : theme === 'dark'
                          ? "bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600"
                          : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                    }`}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {showDeleteModal && (
          <ConfirmationModal
            message="message"
            itemId={deleteId}
            onConfirm={handleDelete}
            onCancel={() => setShowDeleteModal(false)}
          />
        )}

        {selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4`}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700 text-gray-100' 
                  : 'bg-white border-gray-200 text-gray-900'
              } border`}
            >
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeMessageView}
                    className={`mr-4 ${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </motion.button>
                  <h2 className={`text-xl font-bold flex-1 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    {selectedMessage.subject}
                  </h2>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeMessageView}
                    className={theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>
                <div className={`border-b pb-4 mb-6 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className={theme === 'dark' ? 'bg-indigo-900/50 p-3 rounded-full mr-4' : 'bg-indigo-100 p-3 rounded-full mr-4'}>
                        <User className={`w-6 h-6 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
                      </div>
                      <div>
                        <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                          {selectedMessage.name}
                        </h3>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          {selectedMessage.email}
                        </p>
                        <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          {formatDate(selectedMessage.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusDetails(selectedMessage.status).color}`}>
                        <span className={`w-2 h-2 rounded-full mr-2 ${
                          theme === 'dark' 
                            ? selectedMessage.status === 'unread' ? 'bg-blue-400' :
                              selectedMessage.status === 'read' ? 'bg-gray-400' :
                              selectedMessage.status === 'pending' ? 'bg-yellow-400' :
                              selectedMessage.status === 'resolved' ? 'bg-green-400' :
                              'bg-purple-400'
                            : selectedMessage.status === 'unread' ? 'bg-blue-500' :
                              selectedMessage.status === 'read' ? 'bg-gray-500' :
                              selectedMessage.status === 'pending' ? 'bg-yellow-500' :
                              selectedMessage.status === 'resolved' ? 'bg-green-500' :
                              'bg-purple-500'
                        }`}></span>
                        {getStatusDetails(selectedMessage.status).label}
                      </span>
                      <select
                        value={selectedMessage.status}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className={`text-sm px-3 py-1 rounded-md ${
                          theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      >
                        {statusOptions.filter(option => option.value !== 'all').map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <p className={`text-base ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                    {selectedMessage.message}
                  </p>
                </div>
                <div className={`border-t pt-4 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                  <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    Reply
                  </h3>
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Type your reply here..."
                    className={`w-full px-4 py-2 rounded-lg border resize-y min-h-[100px] focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 text-gray-900'
                    }`}
                  />
                  <div className="flex justify-end gap-4 mt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={closeMessageView}
                      className={`px-4 py-2 rounded-md ${
                        theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                      }`}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleReplySubmit}
                      disabled={!replyContent.trim()}
                      className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                        !replyContent.trim()
                          ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                          : theme === 'dark'
                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      <Reply className="w-4 h-4" />
                      Send Reply
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SupportInbox;