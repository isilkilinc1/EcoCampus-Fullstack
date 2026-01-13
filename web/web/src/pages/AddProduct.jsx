import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function AddProduct() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [category_id, setCategoryId] = useState(1); // Başlangıçta 1 (Kitap)

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Konsolda ne gönderdiğimizi görelim (Hata ayıklama için)
    console.log("Gönderilen Veriler:", { title, price, category_id });

    try {
      await API.post("/products", {
        title,
        price: Number(price),
        description,
        image_url,
        category_id: Number(category_id), // Sayıya çevirerek gönderiyoruz
      });

      alert("Ürün başarıyla eklendi ✅");
      navigate("/dashboard");
    } catch (error) {
      console.error("Ürün ekleme hatası:", error.response?.data || error);
      alert(
        "Ürün eklenemedi ❌: " +
          (error.response?.data?.message || "Sunucu hatası")
      );
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>Yeni Ürün Ekle</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          placeholder="Ürün Başlığı"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Fiyat (Bağış için 0 yazın)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <textarea
          placeholder="Ürün Açıklaması"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          placeholder="Fotoğraf URL (https://...)"
          value={image_url}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />

        <label style={{ textAlign: "left", fontSize: "14px" }}>
          Kategori Seçin:
        </label>
        <select
          value={category_id}
          onChange={(e) => setCategoryId(Number(e.target.value))} // 👈 KRİTİK DÜZELTME
        >
          <option value={1}>Kitap</option>
          <option value={2}>Elektronik</option>
          <option value={3}>Kıyafet</option>
        </select>

        <button
          type="submit"
          style={{ backgroundColor: "#28a745", color: "white" }}
        >
          Kaydet
        </button>
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          style={{ backgroundColor: "#ccc" }}
        >
          İptal
        </button>
      </form>
    </div>
  );
}
