const pool = require("../config/db");

const createUser = (username, email, password) => {
  return pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
    [username, email, password]
  );
};

const findUserByEmail = (email) => {
  return pool.query("SELECT * FROM users WHERE email = $1", [email]);
};

module.exports = {
  createUser,
  findUserByEmail,
};
