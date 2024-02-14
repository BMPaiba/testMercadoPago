const getAdministrator = require("../controllers/getAdministrator");
const getTokens = require("../controllers/getAutorizaciones");
const postAdministrator = require("../controllers/postAdministrator");
const postDev = require("../controllers/postDev");
const postKey = require("../controllers/postKey");
const postPurchase = require("../controllers/postPurchase");
const postURL = require("../controllers/postURL");
const setToken = require("../controllers/setToken");
const webhook = require("../controllers/webhook");

const router = require("express").Router();


router.post("/create_preference", postPurchase);
router.get("/administrator", getAdministrator);
router.post("/administrator", postAdministrator);

router.post('/url', postURL)
router.post('/key', postKey)

router.post('/mercadopago-authorization/success' , setToken)
router.get('/mercadopago-authorization/success' , getTokens)
router.post('/refunded' , postDev)
router.get('/webhook', webhook)

//router.get( '/mercadopago-authorization/success' , setToken) //guardar token publico del administrador => redireccionar al panel y mostrar como autorizado
//o a otro componente =>  autorizacion completa


module.exports = router;
