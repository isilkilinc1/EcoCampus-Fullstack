import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    if (window.confirm("Çıkış yapmak istediğinize emin misiniz?")) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    let mounted = true;

    const fetchProducts = async () => {
      try {
        // Sadece giriş yapan kullanıcının ürünlerini çeker
        const res = await API.get("/products/my");
        if (mounted) {
          setProducts(res.data);
        }
      } catch (error) {
        console.error("Ürünler yüklenirken hata oluştu:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      mounted = false;
    };
  }, []);

  const handleDelete = async (id) => {
    const ok = window.confirm("Bu ilanı kalıcı olarak silmek istiyor musunuz?");
    if (!ok) return;

    try {
      await API.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      alert("Ürün silindi.");
    } catch (error) {
      console.error("Silme hatası:", error);
      alert("Ürün silinirken bir hata oluştu.");
    }
  };

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Ürünler yükleniyor...
      </p>
    );

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>İlanlarım</h2>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#dc3545",
            color: "white",
            padding: "8px 15px",
            borderRadius: "5px",
          }}
        >
          Çıkış Yap 🚪
        </button>
      </div>

      <Link to="/add">
        <button
          style={{
            marginBottom: "20px",
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
          }}
        >
          ➕ Yeni Ürün Ekle
        </button>
      </Link>

      {products.length === 0 ? (
        <p style={{ textAlign: "center", color: "#888" }}>
          Henüz bir ilanınız bulunmuyor.
        </p>
      ) : (
        products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "15px",
              display: "flex",
              gap: "15px",
              alignItems: "center",
              backgroundColor: "#f9f9f9",
            }}
          >
            {p.image_url ? (
              <img
                src={p.image_url}
                alt={p.title}
                onError={(e) => {
                  console.log(
                    "Resim yüklenemedi, URL hatalı olabilir:",
                    p.image_url
                  );
                  e.target.src = "https://via.placeholder.com/100?text=Hata"; // Resim bozuksa bunu gösterir
                }}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "5px",
                  display: "block", // Bazı durumlarda inline elementler sorun çıkarabilir
                }}
              />
            ) : (
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: "#eee",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                }}
              >
                Resim Yok
              </div>
            )}

            <div style={{ flex: 1 }}>
              <h3 style={{ margin: "0 0 5px 0" }}>{p.title}</h3>
              <p
                style={{
                  color: "#666",
                  fontSize: "14px",
                  margin: "0 0 10px 0",
                }}
              >
                {p.description}
              </p>
              <p style={{ fontWeight: "bold", margin: 0 }}>
                {Number(p.price) === 0 ? "🎁 Bağış" : `${p.price} TL`}
              </p>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <Link
                to={`/edit/${p.id}`}
                style={{
                  padding: "5px 15px",
                  backgroundColor: "#ffc107",
                  color: "black",
                  textDecoration: "none",
                  borderRadius: "5px",
                  textAlign: "center",
                  fontSize: "14px",
                }}
              >
                ✏️ Düzenle
              </Link>
              <button
                onClick={() => handleDelete(p.id)}
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #dc3545",
                  color: "#dc3545",
                  padding: "5px 15px",
                }}
              >
                🗑️ Sil
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
