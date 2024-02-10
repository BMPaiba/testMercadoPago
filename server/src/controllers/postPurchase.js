const { Preference, default: MercadoPagoConfig } = require("mercadopago");
const {Administrator} = require("../db");
const mercadopago = require("mercadopago"); // require

const postPurchase = async (req, res) => {
    try {

        const urlRecibida = req.body.path;

        console.log(mercadopago.MerchantOrder);

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
                success: `https://www.youtube.com/watch?v=JUXxxjRECRg&ab_channel=LAMEDIAB%C3%81VARA`,
                failure: "https://www.youtube.com/watch?v=JUXxxjRECRg&ab_channel=LAMEDIAB%C3%81VARA",
                pending: "https://www.youtube.com/watch?v=JUXxxjRECRg&ab_channel=LAMEDIAB%C3%81VARA",
            },
            auto_return: "approved",
            notification_url: "https://e720-190-237-16-208.sa.ngrok.io/webhook",
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



//   const { v4: uuidv4 } = require('uuid');

// function generateAuthorizationUrl(clientId, redirectUri) {
//   // Genera un ID único para el estado
//   const state = uuidv4();

  
    
//   //mercadopago clientId =>  mi cuenta de vendedor de plataforma

//   // Construye la URL de autorización de MercadoPago
//   const authorizationUrl = `https://auth.mercadopago.com/authorization?client_id=${clientId}&response_type=code&platform_id=mp&state=${state}&redirect_uri=${redirectUri}`;

//   return authorizationUrl;
// }

// // Ejemplo de uso
// const clientId = "TU_CLIENT_ID"; // Reemplaza con tu ID de cliente de MercadoPago
// const redirectUri = "https://testmp-ro6r.onrender.com/mercadopago-authorization/success"; // Reemplaza con tu URL de redirección

// const authorizationUrl = generateAuthorizationUrl(clientId, redirectUri);
// console.log("URL de autorización de MercadoPago:", authorizationUrl);
