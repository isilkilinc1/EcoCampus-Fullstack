import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { getProducts, deleteProduct } from "../src/services/api";
import { useRouter } from "expo-router";

export default function ProductsScreen() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    loadProducts();
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Ürünler</Text>
            <Button
              title="➕ Yeni Ürün"
              onPress={() => router.push("/add-product")}
            />
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/product-detail",
                params: item,
              })
            }
          >
            <View style={styles.card}>
              <Image source={{ uri: item.image_url }} style={styles.image} />
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.price}>
                {item.price === 0 ? "🎁 Bağış" : `${item.price} TL`}
              </Text>

              <Button
                title="Sil"
                color="red"
                onPress={() => handleDelete(item.id)}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 40 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  card: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 15,
  },
  image: { width: "100%", height: 150, borderRadius: 10 },
  name: { fontSize: 18, fontWeight: "600", marginTop: 10 },
  price: { fontSize: 16, marginTop: 5 },
});
