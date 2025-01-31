const express = require("express");
const { register, login, googleLogin, getUser } = require("../controllers/userController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google-login", googleLogin);
router.get("/me", auth, getUser);

module.exports = router;