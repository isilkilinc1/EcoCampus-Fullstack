const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await userModel.createUser(username, email, hashedPassword);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Kayıt hatası", detail: error.message });
  }
};

const login = async (req, res) => {
  console.log("LOGIN BODY:", req.body);

  const { email, password } = req.body;
  console.log("EMAIL:", email);
  try {
    const result = await userModel.findUserByEmail(email);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    const user = result.rows[0];
    const correct = await bcrypt.compare(password, user.password);

    if (!correct) {
      return res.status(401).json({ message: "Şifre yanlış" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Giriş hatası", detail: error.message });
  }
};

module.exports = { register, login };
