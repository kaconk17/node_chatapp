const jwt = require("jsonwebtoken");
require("dotenv").config();

const decode = (token, decoded) => {
  try {
    decoded = jwt.verify(token, process.env.SECRET);
    // req.user = {
    //   email: decoded.email,
    //   user_id: decoded.user_id,
    // };
    // next();
    return decoded;
  } catch (error) {
    return next(new Error("invalid Token"));
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
