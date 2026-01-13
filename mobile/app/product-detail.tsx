import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function ProductDetailScreen() {
  const router = useRouter();
  const { id, title, price, description, image_url } =
    useLocalSearchParams<any>();

  return (
    <View style={styles.container}>
      <Image source={{ uri: image_url }} style={styles.image} />

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.price}>
        {Number(price) === 0 ? "🎁 Bağış" : `${price} TL`}
      </Text>

      <Text style={styles.desc}>{description}</Text>

      <Button
        title="✏️ Güncelle"
        onPress={() =>
          router.push({
            pathname: "/update-product",
            params: { id, title, price, description, image_url },
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 40 },
  image: { width: "100%", height: 220, borderRadius: 10 },
  title: { fontSize: 24, fontWeight: "bold", marginTop: 15 },
  price: { fontSize: 20, marginVertical: 10 },
  desc: { fontSize: 16, marginBottom: 20 },
});
