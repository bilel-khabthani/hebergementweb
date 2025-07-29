import { useState, useEffect } from "react";
import { Box, Package, Plus, Pencil, Trash2, ChevronLeft, ChevronRight, X } from "lucide-react";
import { getAllProducts, deleteProduct, createProduct, updateProduct } from "../../api/products";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useTheme } from "../../contexts/ThemeContext";
import { motion } from "framer-motion";
import axios from "axios";

const Products = () => {
  const { theme } = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    category: "",
    imageUrl: "",
    features: [""],
  });
  const [errors, setErrors] = useState({});

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/api/products");
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error loading products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const initForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      duration: "",
      category: "",
      imageUrl: "",
      features: [""],
    });
    setErrors({});
    setIsEditing(false);
    setCurrentProduct(null);
  };

  const handleAddClick = () => {
    initForm();
    setShowProductModal(true);
  };

  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      duration: product.duration || "",
      category: product.category || "",
      imageUrl: product.imageUrl || "",
      features: product.features?.length ? [...product.features] : [""],
    });
    setErrors({});
    setIsEditing(true);
    setShowProductModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData((prev) => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData((prev) => ({ ...prev, features: [...prev.features, ""] }));
  };

  const removeFeature = (index) => {
    if (formData.features.length > 1) {
      const newFeatures = [...formData.features];
      newFeatures.splice(index, 1);
      setFormData((prev) => ({ ...prev, features: newFeatures }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (isNaN(parseFloat(formData.price))) {
      newErrors.price = "Price must be a number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      features: formData.features.filter((f) => f.trim() !== ""),
    };

    try {
      if (isEditing && currentProduct) {
        await updateProduct(currentProduct._id, productData);
      } else {
        await createProduct(productData);
      }
      await fetchProducts();
      setShowProductModal(false);
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Failed to save product. Please try again.");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = Array.isArray(products) ? products.slice(indexOfFirstItem, indexOfLastItem) : [];
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(deleteId);
      await fetchProducts();
      if (currentPage > Math.ceil((products.length - 1) / itemsPerPage)) {
        setCurrentPage(1);
      }
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  return (
    <div className={`h-screen w-full overflow-y-auto transition-colors duration-300 ${
      theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
    }`}>
      <div className="p-6 md:p-8 lg:p-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`p-6 rounded-2xl shadow-lg mb-8 ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } border`}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="mb-4 sm:mb-0">
              <div className="flex items-center space-x-3 mb-2">
                <Package className={`w-8 h-8 ${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`} />
                <h1 className={`text-2xl md:text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                  Product Management
                </h1>
              </div>
              <p className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
                Manage your products, pricing, and features
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddClick}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg ${
                theme === "dark"
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              <Plus className="w-4 h-4" />
              Add Product
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
            theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          } border`}
        >
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
                  theme === "dark" ? "border-indigo-400" : "border-indigo-500"
                }`}></div>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className={theme === "dark" ? "bg-gray-700" : "bg-indigo-50"}>
                  <tr>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      theme === "dark" ? "text-gray-300" : "text-gray-500"
                    }`}>Product</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      theme === "dark" ? "text-gray-300" : "text-gray-500"
                    }`}>Description</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      theme === "dark" ? "text-gray-300" : "text-gray-500"
                    }`}>Price</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      theme === "dark" ? "text-gray-300" : "text-gray-500"
                    }`}>Category</th>
                    <th className={`px-6 py-3 text-center text-xs font-medium uppercase tracking-wider ${
                      theme === "dark" ? "text-gray-300" : "text-gray-500"
                    }`}>Actions</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${theme === "dark" ? "divide-gray-700" : "divide-gray-200"}`}>
                  {currentProducts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-10 text-gray-500">
                        No products found.
                      </td>
                    </tr>
                  ) : (
                    currentProducts.map((product) => (
                      <motion.tr
                        key={product._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-indigo-50"} cursor-pointer`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap max-w-xs overflow-hidden text-ellipsis">
                          <div className="flex items-center space-x-3">
                            {product.imageUrl ? (
                              <img className="w-12 h-12 rounded-lg object-cover" src={product.imageUrl} alt={product.name} />
                            ) : (
                              <Box className={`w-12 h-12 p-1 rounded-lg ${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`} />
                            )}
                            <span className="text-sm font-semibold">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-normal max-w-md overflow-hidden text-ellipsis">
                          {product.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {product.category || "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center space-x-3">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleEditClick(product)}
                            className={`inline-flex items-center p-2 rounded-md transition-colors ${
                              theme === "dark"
                                ? "hover:bg-indigo-600 text-indigo-400 hover:text-white"
                                : "hover:bg-indigo-100 text-indigo-600"
                            }`}
                            title="Edit"
                          >
                            <Pencil className="w-5 h-5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDeleteClick(product._id)}
                            className={`inline-flex items-center p-2 rounded-md transition-colors ${
                              theme === "dark"
                                ? "hover:bg-red-600 text-red-400 hover:text-white"
                                : "hover:bg-red-100 text-red-600"
                            }`}
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>

          <div className="flex justify-between items-center p-4">
            <div>
              <p>Page {currentPage} of {totalPages}</p>
            </div>
            <div className="space-x-1">
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md ${
                  currentPage === 1
                    ? "cursor-not-allowed opacity-50"
                    : theme === "dark"
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                <ChevronLeft />
              </button>
              {[...Array(totalPages).keys()].map((num) => (
                <button
                  key={num + 1}
                  onClick={() => paginate(num + 1)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === num + 1
                      ? theme === "dark"
                        ? "bg-indigo-500 text-white"
                        : "bg-indigo-300 text-white"
                      : theme === "dark"
                      ? "bg-gray-700 hover:bg-indigo-600 text-gray-300"
                      : "bg-gray-200 hover:bg-indigo-400 text-gray-700"
                  }`}
                >
                  {num + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md ${
                  currentPage === totalPages
                    ? "cursor-not-allowed opacity-50"
                    : theme === "dark"
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </motion.div>

        {showDeleteModal && (
          <ConfirmationModal
            title="Confirm Deletion"
            message="Are you sure you want to delete this product?"
            onConfirm={handleDelete}
            onCancel={() => setShowDeleteModal(false)}
            confirmText="Delete"
            cancelText="Cancel"
          />
        )}

        {showProductModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`p-6 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-lg ${
                theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
              }`}
            >
              <h2 className="text-xl font-semibold mb-4">
                {isEditing ? "Edit Product" : "Add New Product"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-medium mb-1" htmlFor="name">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded-md border ${
                      errors.name
                        ? "border-red-500"
                        : theme === "dark"
                        ? "border-gray-600 bg-gray-800 text-white"
                        : "border-gray-300 bg-white"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block font-medium mb-1" htmlFor="description">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full px-3 py-2 rounded-md border resize-none ${
                      errors.description
                        ? "border-red-500"
                        : theme === "dark"
                        ? "border-gray-600 bg-gray-800 text-white"
                        : "border-gray-300 bg-white"
                    }`}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                  )}
                </div>
                <div>
                  <label className="block font-medium mb-1" htmlFor="price">
                    Price (USD) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded-md border ${
                      errors.price
                        ? "border-red-500"
                        : theme === "dark"
                        ? "border-gray-600 bg-gray-800 text-white"
                        : "border-gray-300 bg-white"
                    }`}
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                  )}
                </div>
                <div>
                  <label className="block font-medium mb-1" htmlFor="duration">
                    Duration (optional)
                  </label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded-md border ${
                      theme === "dark"
                        ? "border-gray-600 bg-gray-800 text-white"
                        : "border-gray-300 bg-white"
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1" htmlFor="category">
                    Category (optional)
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded-md border ${
                      theme === "dark"
                        ? "border-gray-600 bg-gray-800 text-white"
                        : "border-gray-300 bg-white"
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1" htmlFor="imageUrl">
                    Image URL (optional)
                  </label>
                  <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded-md border ${
                      theme === "dark"
                        ? "border-gray-600 bg-gray-800 text-white"
                        : "border-gray-300 bg-white"
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Features</label>
                  {formData.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center mb-2 space-x-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(idx, e.target.value)}
                        className={`flex-grow px-3 py-2 rounded-md border ${
                          theme === "dark"
                            ? "border-gray-600 bg-gray-800 text-white"
                            : "border-gray-300 bg-white"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => removeFeature(idx)}
                        disabled={formData.features.length === 1}
                        className={`p-2 rounded-md transition-colors ${
                          formData.features.length === 1
                            ? "opacity-50 cursor-not-allowed"
                            : theme === "dark"
                            ? "hover:bg-red-600 text-red-400 hover:text-white"
                            : "hover:bg-red-100 text-red-600"
                        }`}
                        title="Remove feature"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addFeature}
                    className={`mt-1 px-3 py-1 rounded-md transition-colors ${
                      theme === "dark"
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white"
                    }`}
                  >
                    + Add Feature
                  </button>
                </div>
                <div className="flex justify-end space-x-4 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setShowProductModal(false)}
                    className={`px-4 py-2 rounded-md ${
                      theme === "dark"
                        ? "bg-gray-700 hover:bg-gray-600 text-white"
                        : "bg-gray-300 hover:bg-gray-400 text-gray-800"
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-2 rounded-md ${
                      theme === "dark"
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white"
                    }`}
                  >
                    {isEditing ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;