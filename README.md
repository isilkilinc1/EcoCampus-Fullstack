# 🌿 EcoCampus - Sürdürülebilir Kampüs Pazaryeri

EcoCampus, üniversite öğrencilerinin kullanmadıkları eşyaları paylaşabildikleri veya bağışlayabildikleri, döngüsel ekonomiyi destekleyen bir Fullstack platformdur.

## 🚀 Proje Yapısı

Bu proje üç ana bölümden oluşmaktadır:

- **Backend:** Node.js, Express ve PostgreSQL kullanılarak geliştirilen REST API.
- **Web:** React (Vite) ile geliştirilen, kullanıcıların kendi ilanlarını yönettiği Dashboard.
- **Mobile:** React Native (Expo) ile geliştirilen, tüm kullanıcıların ürünleri keşfettiği ana uygulama.

---

## 🛠️ Kurulum ve Çalıştırma

Projeyi yerel bilgisayarınızda çalıştırmak için aşağıdaki sırayı takip ediniz:

### 1. Veritabanı Hazırlığı

PostgreSQL üzerinde `ecocampus` adında bir veritabanı oluşturun ve projede paylaşılan SQL komutlarıyla `users`, `categories` ve `products` tablolarını kurun.

### 2. Backend Sunucusunu Başlatma

```bash
cd backend
npm install
# .env dosyanızı oluşturun (DB_USER, DB_PASSWORD, JWT_SECRET)
npm run dev
Sunucu varsayılan olarak http://localhost:5000 adresinde çalışacaktır.

### 3. Web Panelini Başlatma
cd web
cd web !!!(2. kez web klasörüne giriyoruz)!!!
npm install
npm run dev
Web arayüzüne http://localhost:5173 adresinden erişebilirsiniz.

Test Giriş Bilgileri:

Email: isil@mail.com
Şifre: 123456

Email2: deneme@mail.com
Şifre2: 123456

###4. Mobil Uygulamayı Başlatma
cd mobile
npm install
npx expo start
Mobil cihazdan bağlanmak için mobile/src/services/api.ts !!!dosyasındaki IP adresini bilgisayarınızın yerel IP'si ile güncellemeyi unutmayın.!!!



🛡️ Teknik Özellikler
Kimlik Doğrulama: JWT (JSON Web Token)

Şifreleme: Bcrypt Hashing

Veritabanı Mimari: MVC (Model-View-Controller)

Frontend: React Router, Axios Interceptors

Mobil: Expo Router, AsyncStorage

Teslim Tarihi: 14 Ocak 2026

Ders: YMH3007 Fullstack Web ve Mobil Uygulama Geliştirme
```
