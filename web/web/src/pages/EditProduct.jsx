import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState(1); // Varsayılan olarak 1 (Kitap) yaptık
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setTitle(res.data.title);
        setPrice(res.data.price);
        setImageUrl(res.data.image_url);
        setCategoryId(res.data.category_id); // Veritabanındaki kategori neyse onu seçili getirir
      } catch (err) {
        console.error("Ürün alınamadı", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/products/${id}`, {
        title,
        price,
        image_url: imageUrl,
        category_id: Number(categoryId),
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Güncelleme hatası", err);
    }
  };

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>İlan Düzenle</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Başlık"
      />

      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        placeholder="Fiyat"
      />

      <input
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Fotoğraf URL"
      />
      <label>Kategori Seç:</label>
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(Number(e.target.value))}
      >
        <option value={1}>Kitap</option>
        <option value={2}>Elektronik</option>
        <option value={3}>Kıyafet</option>
      </select>
      <button type="submit">Kaydet</button>
    </form>
  );
}
