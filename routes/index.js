const express = require("express");
// controllers
//import users from '../controllers/user.js';
// middlewares
const { encode } = ('../middlewares/jwt.js');

const router = express.Router();

router
  .post('/login/:userId', encode, (req, res, next) => { });

module.exports = router;