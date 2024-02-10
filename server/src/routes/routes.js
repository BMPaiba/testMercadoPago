const getAdministrator = require("../controllers/getAdministrator");
const postAdministrator = require("../controllers/postAdministrator");
const postKey = require("../controllers/postKey");
const postPurchase = require("../controllers/postPurchase");
const postURL = require("../controllers/postURL");

const router = require("express").Router();


router.post("/create_preference", postPurchase);
router.get("/administrator", getAdministrator);
router.post("/administrator", postAdministrator);

router.post('/url', postURL)
router.post('/key', postKey)

//router.get( '/mercadopago-authorization/success' , setToken) //guardar token publico del administrador => redireccionar al panel y mostrar como autorizado
//o a otro componente =>  autorizacion completa


module.exports = router;
