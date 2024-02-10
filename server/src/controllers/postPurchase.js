const { Preference, default: MercadoPagoConfig } = require("mercadopago");
const {Administrator} = require("../db");
const mercadopago = require("mercadopago"); // require

const postPurchase = async (req, res) => {
    try {

        const urlRecibida = req.body.path;

        // console.log(' esta es la url recibida => ',urlRecibida);

        const searchToken = await Administrator.findOne({ where: { name: urlRecibida } });

        const token = searchToken.dataValues.token
      
        console.log('este es el token => ',token);


        const client = new MercadoPagoConfig({
            accessToken:
              token,
          });

        
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: 10,
                    currency_id: "ARS",
                },
            ],
            back_urls: {
                success: `https://www.youtube.com/watch?v=JUXxxjRECRg&ab_channel=LAMEDIAB%C3%81VARA`,
                failure: "https://www.youtube.com/watch?v=JUXxxjRECRg&ab_channel=LAMEDIAB%C3%81VARA",
                pending: "https://www.youtube.com/watch?v=JUXxxjRECRg&ab_channel=LAMEDIAB%C3%81VARA",
            },
            auto_return: "approved",
        };
        const preference =new Preference(client);
        const result = await preference.create({body});
        // console.log(mercadopago)
        res.json({
            id : result.id,
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error al crear la preferencia :("
        });
    }
  
  };
  

  module.exports = postPurchase