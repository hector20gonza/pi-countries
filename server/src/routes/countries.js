const { Router } = require("express");
const getCountries = require("../controllers/Countries/getCountries")
const getCountryId= require("../controllers/Countries/getCountryById")

const router = Router();

router.get("/", getCountries)
router.get("/:id", getCountryId)

module.exports = router;