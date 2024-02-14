const { Preference, default: MercadoPagoConfig } = require("mercadopago");
const {Administrator , Autorizaciones} = require("../db");
const mercadopago = require("mercadopago"); // require

const postDev =  async( req,res ) => {
    console.log(mercadopago.Payment);
    return res.json({saludo:'hola'})
}

module.exports = postDev