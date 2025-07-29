import { useState, useEffect } from "react";
import { User, Plus, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { getAllUsers, deleteUser } from "../../api/users";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useTheme } from "../../contexts/ThemeContext";
import { motion } from "framer-motion";

const Users = () => {
  const { theme } = useTheme();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Fetch users
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await getAllUsers();
        setUsers(res.data.users);
      } catch (err) {
        console.error("Error loading users:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Delete user
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteUser(deleteId);
      const res = await getAllUsers();
      setUsers(res.data.users);
      // Reset to first page if current page becomes invalid
      if (currentPage > Math.ceil(res.data.users.length / itemsPerPage)) {
        setCurrentPage(1);
      }
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setShowDeleteModal(false);
    }
  };

  return (
    <div className={`min-h-screen p-6 md:p-10 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="pt-16">
        {/* Header with action button */}
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
                <User className={`w-8 h-8 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
                <h1 className={`text-2xl md:text-3xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>User Management</h1>
              </div>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Manage your users, roles, and permissions
              </p>
            </div>
            
            
          </div>
        </motion.div>

        {/* User Table Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          } border`}
        >
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
                  theme === 'dark' ? 'border-indigo-400' : 'border-indigo-500'
                }`}></div>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-indigo-50'}>
                  <tr>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Name
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Email
                    </th>
                    <th className={`px-6 py-3 text-center text-xs font-medium uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Status
                    </th>
                    <th className={`px-6 py-3 text-center text-xs font-medium uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${
                  theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'
                }`}>
                  {currentUsers.length === 0 ? (
                    <tr>
                      <td colSpan={4} className={`text-center p-8 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <div className="flex flex-col items-center justify-center">
                          <User className={`w-12 h-12 ${
                            theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                          } mb-2`} />
                          <p className="text-lg">No users found</p>
                          <p className="text-sm mt-1">Try adding a new user</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentUsers.map((user) => (
                      <tr
                        key={user._id || user.id}
                        className={theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}
                      >
                        <td className="flex items-center gap-3 px-6 py-4 whitespace-nowrap">
                          <div className={theme === 'dark' ? 'bg-indigo-900/50' : 'bg-indigo-100'}>
                            <User className={`w-5 h-5 ${
                              theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                            }`} />
                          </div>
                          <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}>
                            {user.name}
                          </span>
                        </td>
                        <td className={`px-6 py-4 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {user.email}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            user.isAccountVerified 
                              ? theme === 'dark'
                                ? "bg-green-900/30 text-green-400"
                                : "bg-green-100 text-green-800"
                              : theme === 'dark'
                                ? "bg-red-900/30 text-red-400"
                                : "bg-red-100 text-red-800"
                          }`}>
                            <span className={`w-2 h-2 rounded-full mr-2 ${
                              user.isAccountVerified 
                                ? theme === 'dark' 
                                  ? "bg-green-400" 
                                  : "bg-green-500"
                                : theme === 'dark'
                                  ? "bg-red-400"
                                  : "bg-red-500"
                            }`}></span>
                            {user.isAccountVerified ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-6 py-4 flex justify-center gap-3">
                          <button
                            type="button"
                            className={theme === 'dark' ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-900'}
                            title="Edit user"
                          >
                            <div className={theme === 'dark' ? 'bg-indigo-900/30 p-2 rounded-lg hover:bg-indigo-800' : 'bg-indigo-50 p-2 rounded-lg hover:bg-indigo-100'}>
                              <Pencil className="w-4 h-4" />
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteClick(user._id)}
                            className={theme === 'dark' ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-900'}
                            title="Delete user"
                          >
                            <div className={theme === 'dark' ? 'bg-red-900/30 p-2 rounded-lg hover:bg-red-800' : 'bg-red-50 p-2 rounded-lg hover:bg-red-100'}>
                              <Trash2 className="w-4 h-4" />
                            </div>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {users.length > itemsPerPage && (
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
                      {Math.min(indexOfLastItem, users.length)}
                    </span>{" "}
                    of <span className="font-medium">{users.length}</span> users
                  </span>
                  
                  <select
                    className={`ml-4 rounded-md text-sm py-1 px-2 ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'border-gray-300'
                    }`}
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
                  <button
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
                  </button>
                  
                  <div className="flex space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (number) => (
                        <button
                          key={number}
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
                        </button>
                      )
                    )}
                  </div>
                  
                  <button
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
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <ConfirmationModal
            message="utilisateur"
            itemId={deleteId}
            onConfirm={handleDelete}
            onCancel={() => setShowDeleteModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Users;