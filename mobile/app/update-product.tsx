import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { updateProduct } from "../src/services/api";

export default function UpdateProductScreen() {
  const router = useRouter();
  const { id, title, price, description, image_url } =
    useLocalSearchParams<any>();

  const [newTitle, setTitle] = useState(title);
  const [newPrice, setPrice] = useState(price);
  const [newDesc, setDesc] = useState(description);
  const [newImage, setImage] = useState(image_url);

  const handleUpdate = async () => {
    try {
      await updateProduct(Number(id), {
        title: newTitle,
        price: Number(newPrice),
        description: newDesc,
        image_url: newImage,
        category_id: 1,
      });

      Alert.alert("Başarılı", "Ürün güncellendi");
      router.push("/products");
    } catch (err) {
      Alert.alert("Hata", "Güncelleme başarısız");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ürün Güncelle</Text>

      <TextInput
        style={styles.input}
        value={newTitle}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        value={String(newPrice)}
        keyboardType="numeric"
        onChangeText={setPrice}
      />
      <TextInput style={styles.input} value={newDesc} onChangeText={setDesc} />
      <TextInput
        style={styles.input}
        value={newImage}
        onChangeText={setImage}
      />

      <Button title="Kaydet" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 40 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    marginBottom: 15,
  },
});
