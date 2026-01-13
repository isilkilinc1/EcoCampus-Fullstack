import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ProductDetail from "./pages/ProductDetail"; // 👈 Detay sayfasını içe aktardık

// Giriş yapılmamışsa login sayfasına yönlendiren koruma bileşeni
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <Routes>
      {/* --- HERKESE AÇIK YOLLAR (Login Gerektirmez) --- */}
      <Route path="/login" element={<Login />} />

      {/* Ürün detayını herkes görebilmeli, o yüzden PrivateRoute dışında bıraktık */}
      <Route path="/product/:id" element={<ProductDetail />} />

      {/* --- KORUMALI YOLLAR (Login Zorunlu) --- */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/add"
        element={
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        }
      />

      <Route
        path="/edit/:id"
        element={
          <PrivateRoute>
            <EditProduct />
          </PrivateRoute>
        }
      />

      {/* --- VARSAYILAN YÖNLENDİRME --- */}
      {/* Eğer gidilen yol hiçbirine uymuyorsa Dashboard'a atar (O da login ister) */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}
