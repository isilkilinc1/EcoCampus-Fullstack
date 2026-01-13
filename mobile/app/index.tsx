import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";
import { login } from "../src/services/api";
import { useRouter } from "expo-router"; // ✅ EKLENDİ

export default function LoginScreen() {
  const router = useRouter(); // ✅ EKLENDİ

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const token = await login(email, password);
      alert("Giriş başarılı 🎉 Token kaydedildi!");
      console.log("Token:", token);

      router.push("/products"); // 🚀 YÖNLENDİRME
    } catch (error) {
      alert("Giriş başarısız ❌");
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EcoCampus Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Şifre"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Giriş Yap" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, textAlign: "center", marginBottom: 20 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
