const { Preference, default: MercadoPagoConfig } = require("mercadopago");

const postPurchase = async (req, res) => {
    try {
        const client = new MercadoPagoConfig({
            accessToken:
              "APP_USR-203586994908608-020721-8aa31fc02541f3b0d8b3fcf720a360eb-1674411644",
          });
  
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price),
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