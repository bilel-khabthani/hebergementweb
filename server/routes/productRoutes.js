import express from 'express';
import userAuth from '../middleware/userAuth.js';
import requireAdmin from '../middleware/requireAdmin.js';
import Product from "../models/productModel.js";

import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';

const productRoute = express.Router();

// ✅ Routes protégées
productRoute.post('/create-product', userAuth, requireAdmin, createProduct);
productRoute.get('/get-all-products', userAuth, requireAdmin, getAllProducts);
productRoute.get('/get-product/:id', userAuth, requireAdmin, getProductById);
productRoute.put('/update-product/:id', userAuth, requireAdmin, updateProduct);
productRoute.delete('/delete-product/:id', userAuth, requireAdmin, deleteProduct);

// ✅ Route publique : GET /api/products
productRoute.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// ✅ Route publique : POST /api/products
productRoute.post("/", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
productRoute.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }  // pour retourner le produit mis à jour
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: "Produit non trouvé" });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Export correct
export default productRoute;
