import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Giriş" }} />
      <Stack.Screen name="products" options={{ title: "Ürünler" }} />
      <Stack.Screen name="add-product" options={{ title: "Yeni Ürün" }} />
      <Stack.Screen name="product-detail" options={{ title: "Ürün Detayı" }} />
      <Stack.Screen
        name="update-product"
        options={{ title: "Ürün Güncelle" }}
      />
    </Stack>
  );
}
