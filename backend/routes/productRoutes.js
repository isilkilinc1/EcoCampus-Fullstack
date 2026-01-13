const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * 📥 TÜM ÜRÜNLER (AÇIK)
 * GET /api/products
 */
router.get("/", productController.getProducts);

/**
 * 👤 SADECE BENİM ÜRÜNLERİM (TOKEN ZORUNLU)
 * GET /api/products/my
 */
router.get("/my", authMiddleware, productController.getMyProducts);

/**
 * 🔍 TEK ÜRÜN (AÇIK)
 * GET /api/products/:id
 */
router.get("/:id", productController.getProductById);

/**
 * ➕ ÜRÜN EKLE
 */
router.post("/", authMiddleware, productController.addProduct);

/**
 * ✏️ ÜRÜN GÜNCELLE
 */
router.put("/:id", authMiddleware, productController.updateProduct);

/**
 * 🗑️ ÜRÜN SİL
 */
router.delete("/:id", authMiddleware, productController.deleteProduct);

module.exports = router;
