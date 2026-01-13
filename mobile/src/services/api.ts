import axios, { AxiosHeaders } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 📌 Backend URL — kendi IP adresini yazmalısın
const API = axios.create({
  baseURL: "http://192.168.1.103:5000/api",
  timeout: 15000,
});

// 📌 INTERCEPTOR — Tüm isteklerde token ekler
API.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");

  // Axios v1.7+ ile headers'ı böyle kullanıyoruz
  config.headers = new AxiosHeaders(config.headers);

  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
    config.headers.set("Content-Type", "application/json");
  }

  return config;
});

// 🟦 LOGIN
export const login = async (email: string, password: string) => {
  const res = await API.post("/auth/login", { email, password });
  const token = res.data.token;

  await AsyncStorage.setItem("token", token);

  return token;
};

// 🟩 ÜRÜNLERİ GETİR (Token gerekmez)
export const getProducts = async () => {
  const res = await API.get("/products");
  return res.data;
};

// 🟧 ÜRÜN EKLE (Token zorunlu)
export const addProduct = async (data: {
  title: string;
  price: number;
  description: string;
  image_url: string;
  category_id: number;
}) => {
  const res = await API.post("/products", data);
  return res.data;
};

// 🟥 ÜRÜN SİL (Token zorunlu)
export const deleteProduct = async (id: number) => {
  const res = await API.delete(`/products/${id}`);
  return res.data;
};

// 🟨 ÜRÜN GÜNCELLE (Token zorunlu)
export const updateProduct = async (
  id: number,
  data: {
    title: string;
    price: number;
    description: string;
    image_url: string;
    category_id: number;
  }
) => {
  const res = await API.put(`/products/${id}`, data);
  return res.data;
};

export default API;
