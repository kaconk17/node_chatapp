const jwt = require("jsonwebtoken");
const { errorMessage, status } = require("../middlewares/status");
require("dotenv").config();

const decode = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    errorMessage.error = "Token tidak ditemukan";
    return res.status(status.bad).send(errorMessage);
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = {
      email: decoded.email,
      user_id: decoded.user_id,
    };
    next();
  } catch (error) {
    errorMessage.error = "Gagal Autentikasi";
    return res.status(status.unauthorized).send(errorMessage);
  }
};

const encode = async (email, id) => {
  try {
    const token = jwt.sign(
      {
        email,
        user_id: id,
      },
      process.env.SECRET,
      { expiresIn: "3d" },
    );
    return token;
  } catch (error) {
    return error;
  }
};

module.exports = {
  encode,
  decode,
};
