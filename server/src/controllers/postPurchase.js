const { Preference, default: MercadoPagoConfig } = require("mercadopago");
const {Administrator} = require("../db");
const mercadopago = require("mercadopago"); // require

const postPurchase = async (req, res) => {
    try {

        const urlRecibida = req.body.path;  

        // console.log(mercadopago.MerchantOrder);

        const searchToken = await Administrator.findOne({ where: { name: urlRecibida } }); 

        const token = searchToken.dataValues.token

        // dentro del modelo administrator
        //columna mercadopago token =>  si tiene, esta habilitado para recibir pagos
    

        const client = new MercadoPagoConfig({
            accessToken:
              token, //pasarle el token publico
          });

        
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: 10,
                    currency_id: "ARS",
                },
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: 50,
                    currency_id: "ARS",
                }
            ],
            back_urls: {
                success: `https://www.youtube.com`,
                failure: "https://www.youtube.com",
                pending: "https://www.youtube.com",
            },
            auto_return: "approved",
            // notification_url: "https://e720-190-237-16-208.sa.ngrok.io/webhook",
        };
        const preference =new Preference(client);
        const result = await preference.create({body});
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



