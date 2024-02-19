const { Router } = require("express");
const router = Router();
const getActi = require("../controllers/Activities/getActivities")
const addActivity = require("../controllers/Activities/addActivity")
const deleteActivity = require("../controllers/Activities/DeleteActivity")
const patchActivity = require("../controllers/Activities/PatchActivity")
router.get("/", getActi)
router.post("/", addActivity)
router.delete("/:activityId/:countryId",deleteActivity)
router.patch("/:activityId/:countryId",patchActivity)
module.exports = router;