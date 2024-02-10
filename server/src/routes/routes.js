const getAdministrator = require("../controllers/getAdministrator");
const postAdministrator = require("../controllers/postAdministrator");
const postPurchase = require("../controllers/postPurchase");

const router = require("express").Router();


router.post("/create_preference", postPurchase);
router.get("/administrator", getAdministrator);
router.post("/administrator", postAdministrator);


module.exports = router;
