import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <p>Yükleniyor...</p>;

  return (
    <div>
      <h2>{product.title}</h2>

      <img src={product.image_url} alt={product.title} width="300" />

      <p>{Number(product.price) === 0 ? "🎁 Bağış" : `${product.price} TL`}</p>

      <p>{product.description}</p>
    </div>
  );
}
