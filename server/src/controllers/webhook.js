const { Preference, default: MercadoPagoConfig } = require("mercadopago");
const {Administrator , Autorizaciones} = require("../db");
const mercadopago = require("mercadopago"); // require

const webhook =  async( req,res ) => {
    console.log(req.query);

    res.send('webhook')


}

module.exports = webhook

// https://www.mercadopago.com.ar/checkout/v1/payment/redirect/5cbb7d4d-19a8-42b5-b3e5-29f0ca453eb9/congrats/approved/?preference-id=1681919110-d8c5e33d-e45a-4fce-a3b1-565073a1ecc5&correlation_id=15744ecb-d744-48b9-b34c-7ca336feee8a&sniffing-rollout=sniffing-api&router-request-id=5abcbde9-d3e0-44c4-a1fd-cf62d8ef0f49&p=f89c1ff1ad40bc898dfe77156af39243