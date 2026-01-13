import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { addProduct } from "../src/services/api";
import { useRouter } from "expo-router";

export default function AddProductScreen() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [category_id, setCategoryId] = useState(1); // Varsayılan: 1 (Kitap)

  // Kategoriler listesi
  const categories = [
    { id: 1, name: "📚 Kitap" },
    { id: 2, name: "💻 Elektronik" },
    { id: 3, name: "👕 Kıyafet" },
  ];

  const handleAdd = async () => {
    if (!title || !price || !description || !image_url) {
      Alert.alert("Uyarı", "Lütfen tüm alanları doldurun!");
      return;
    }

    try {
      await addProduct({
        title,
        price: Number(price),
        description,
        image_url,
        category_id: Number(category_id), // Seçilen kategori ID'si gidiyor
      });

      Alert.alert("Başarılı", "Ürün başarıyla eklendi!");
      router.push("/products");
    } catch (error) {
      console.log(error);
      Alert.alert("Hata", "Ürün eklenemedi!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yeni Ürün Ekle</Text>

      <TextInput
        style={styles.input}
        placeholder="Ürün adı"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Fiyat (Bağış için 0)"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <TextInput
        style={styles.input}
        placeholder="Açıklama"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Fotoğraf URL"
        value={image_url}
        onChangeText={setImageUrl}
      />

      {/* --- KATEGORİ SEÇİM ALANI --- */}
      <Text style={styles.label}>Kategori Seçin:</Text>
      <View style={styles.categoryContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryButton,
              category_id === cat.id && styles.selectedCategory, // Seçiliyse rengini değiştir
            ]}
            onPress={() => setCategoryId(cat.id)}
          >
            <Text
              style={
                category_id === cat.id
                  ? styles.selectedText
                  : styles.categoryText
              }
            >
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleAdd}>
        <Text style={styles.saveButtonText}>İlanı Yayınla</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20, color: "#333" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 10, color: "#555" },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  categoryButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  selectedCategory: {
    borderColor: "#28a745",
    backgroundColor: "#e8f5e9", // Hafif yeşil (Eco tema)
  },
  categoryText: { color: "#555", fontSize: 12 },
  selectedText: { color: "#28a745", fontWeight: "bold", fontSize: 12 },
  saveButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
