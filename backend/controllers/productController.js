const productModel = require("../models/productModel");

/**
 * 📥 TÜM ÜRÜNLERİ GETİR (AÇIK)
 * GET /api/products
 */
const getProducts = async (req, res) => {
  try {
    const products = await productModel.getAllProducts();
    res.json(products.rows);
  } catch (error) {
    console.log("❌ GET PRODUCTS ERROR:", error.message);
    res.status(500).json({ message: "Ürünler alınamadı" });
  }
};

/**
 * 👤 SADECE GİRİŞ YAPAN KULLANICININ ÜRÜNLERİ
 * GET /api/products/my
 */
const getMyProducts = async (req, res) => {
  try {
    const userId = req.user.id;
    const products = await productModel.getMyProducts(userId);
    res.json(products.rows);
  } catch (error) {
    console.log("❌ GET MY PRODUCTS ERROR:", error.message);
    res.status(500).json({ message: "Ürünler alınamadı" });
  }
};

/**
 * 🔍 TEK ÜRÜN GETİR (AÇIK)
 * GET /api/products/:id
 * (Edit & Detail sayfaları için ZORUNLU)
 */
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await productModel.getProductById(id);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Ürün bulunamadı" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.log("❌ GET PRODUCT BY ID ERROR:", error.message);
    res.status(500).json({ message: "Ürün alınamadı" });
  }
};

/**
 * ➕ ÜRÜN EKLE (TOKEN ZORUNLU)
 * POST /api/products
 */
const addProduct = async (req, res) => {
  try {
    let { title, price, description, image_url, category_id } = req.body;
    const user_id = req.user.id;

    price = Number(price);
    category_id = Number(category_id);

    if (!title || !description) {
      return res.status(400).json({ message: "Zorunlu alanlar eksik" });
    }

    if (isNaN(price) || isNaN(category_id)) {
      return res.status(400).json({ message: "Fiyat ve kategori sayı olmalı" });
    }

    const product = await productModel.createProduct(
      title,
      price,
      description,
      image_url,
      user_id,
      category_id
    );

    res.status(201).json(product.rows[0]);
  } catch (error) {
    console.log("❌ ADD PRODUCT ERROR:", error.message);
    res.status(500).json({ message: "Ürün eklenemedi" });
  }
};

/**
 * 🗑️ ÜRÜN SİL
 * DELETE /api/products/:id
 * (Sadece ürünün sahibi)
 */
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user.id;

    const result = await productModel.getProductById(productId);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Ürün bulunamadı" });
    }

    const product = result.rows[0];

    if (String(product.user_id) !== String(userId)) {
      return res.status(403).json({ message: "Bu işlem için yetkiniz yok" });
    }

    const deleted = await productModel.deleteProduct(productId);

    if (deleted.rows.length === 0) {
      return res.status(400).json({ message: "Silme işlemi başarısız" });
    }

    res.json({ message: "Ürün başarıyla silindi" });
  } catch (error) {
    console.log("❌ DELETE PRODUCT ERROR:", error.message);
    res.status(500).json({ message: "Ürün silinemedi" });
  }
};

/**
 * ✏️ ÜRÜN GÜNCELLE
 * PUT /api/products/:id
 * (Sadece ürünün sahibi)
 */
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user.id;

    const result = await productModel.getProductById(productId);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Ürün bulunamadı" });
    }

    const product = result.rows[0];

    if (String(product.user_id) !== String(userId)) {
      return res.status(403).json({ message: "Bu işlem için yetkiniz yok" });
    }
    let { title, price, description, image_url, category_id } = req.body;

    title = title ?? product.title;
    description = description ?? product.description;
    image_url = image_url ?? product.image_url;
    price = price !== undefined ? Number(price) : product.price;
    category_id =
      category_id !== undefined ? Number(category_id) : product.category_id;

    const updated = await productModel.updateProduct(
      productId,
      title,
      price,
      description,
      image_url,
      category_id
    );

    if (updated.rows.length === 0) {
      return res.status(400).json({ message: "Güncelleme işlemi başarısız" });
    }

    res.json(updated.rows[0]);
  } catch (error) {
    console.log("❌ UPDATE PRODUCT ERROR:", error.message);
    res.status(500).json({ message: "Ürün güncellenemedi" });
  }
};

module.exports = {
  getProducts,
  getMyProducts, // 👈 EKLENDİ
  getProductById,
  addProduct,
  deleteProduct,
  updateProduct,
};
