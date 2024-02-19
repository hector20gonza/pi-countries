const { Router } = require("express");
const getUser = require("../controllers/Users/getUser")
const registerUser = require("../controllers/Users/register")
const loggin = require("../controllers/Users/login")

const router = Router();

//router.get("/", getUser)
router.get("/login", loggin)
router.post("/register", registerUser)

module.exports = router;