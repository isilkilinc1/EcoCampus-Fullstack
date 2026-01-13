import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { updateProduct } from "../src/services/api";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function EditProductScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [title, setTitle] = useState(params.title as string);
  const [price, setPrice] = useState(String(params.price));
  const [description, setDescription] = useState(params.description as string);
  const [image_url, setImageUrl] = useState(params.image_url as string);
  const [category_id] = useState("1");

  const handleUpdate = async () => {
    try {
      await updateProduct(Number(params.id), {
        title,
        price: Number(price),
        description,
        image_url,
        category_id: Number(category_id),
      });

      Alert.alert("Başarılı", "Ürün güncellendi!");
      router.push("/products");
    } catch (err) {
      console.log(err);
      Alert.alert("Hata", "Güncelleme başarısız");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ürünü Güncelle</Text>

      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        value={image_url}
        onChangeText={setImageUrl}
      />

      <Button title="Güncelle" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 40 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    marginBottom: 15,
  },
});
