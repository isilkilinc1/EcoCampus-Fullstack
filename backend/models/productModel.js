const pool = require("../config/db");

/**
 * 📥 TÜM ÜRÜNLER
 */
// users tablosundan email'i de çekelim ki iletişim bilgisi görünsün
const getAllProducts = () => {
  return pool.query(
    `SELECT products.*, users.email, categories.name AS category_name
     FROM products
     JOIN users ON products.user_id = users.id
     JOIN categories ON products.category_id = categories.id`
  );
};

/**
 * 👤 SADECE GİRİŞ YAPAN KULLANICININ ÜRÜNLERİ
 */
const getMyProducts = (userId) => {
  return pool.query(
    `SELECT products.*, categories.name AS category_name
     FROM products
     JOIN categories ON products.category_id = categories.id
     WHERE products.user_id = $1`,
    [userId]
  );
};

/**
 * ➕ ÜRÜN OLUŞTUR
 */
const createProduct = (
  title,
  price,
  description,
  image_url,
  user_id,
  category_id
) => {
  return pool.query(
    `INSERT INTO products
     (title, price, description, image_url, user_id, category_id)
     VALUES ($1,$2,$3,$4,$5,$6)
     RETURNING *`,
    [title, price, description, image_url, user_id, category_id]
  );
};

/**
 * 🔍 TEK ÜRÜN (YETKİ KONTROLÜ İÇİN)
 */
const getProductById = (id) => {
  return pool.query("SELECT * FROM products WHERE id = $1", [id]);
};

/**
 * 🗑️ ÜRÜN SİL (GERÇEKTEN SİLİNDİ Mİ KONTROLÜ İÇİN)
 */
const deleteProduct = (id) => {
  return pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);
};

/**
 * ✏️ ÜRÜN GÜNCELLE
 */
const updateProduct = (
  id,
  title,
  price,
  description,
  image_url,
  category_id
) => {
  return pool.query(
    `UPDATE products
     SET title=$1,
         price=$2,
         description=$3,
         image_url=$4,
         category_id=$5
     WHERE id=$6
     RETURNING *`,
    [title, price, description, image_url, category_id, id]
  );
};

module.exports = {
  getAllProducts,
  getMyProducts, // 👈 EKLENDİ
  createProduct,
  getProductById,
  deleteProduct,
  updateProduct,
};
