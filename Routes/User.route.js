const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../Controllers/User.controller");


router.post("/auth/sign-up", registerUser);
router.post("/auth/login", loginUser);

module. exports = router;