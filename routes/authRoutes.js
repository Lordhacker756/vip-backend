const express = require("express");
const router = express.Router();
const cors = require("cors");
const { login, register } = require("../controllers/authController");
// middleware
router.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

// routes
router.post("/register", register);
router.post("/login", login);

module.exports = router;
