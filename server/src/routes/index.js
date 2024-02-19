const { Router } = require("express");
const users_Router = require("./users")
const countries_Router = require("./countries")
const activities_Router = require("./activities")

const router = Router();

router.use("/users", users_Router)
router.use("/countries", countries_Router );
router.use("/activities", activities_Router);

module.exports = router;