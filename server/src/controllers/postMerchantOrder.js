const { Preference, default: MercadoPagoConfig } = require("mercadopago");
const {Administrator} = require("../db");
const mercadopago = require("mercadopago"); // require

const postMerchantOrder = async (req, res) => {
    try {
        const urlRecibida = req.body.path;

        //buscar el id del producto, si no existe, enviar error
        //si existe, buscar el token de la empresa

        const searchToken = await Administrator.findOne({ where: { name: urlRecibida } });
        const token = searchToken.dataValues.token

        const client = new MercadoPagoConfig({
            accessToken:
              token,
          });

          //en el carrito ir agregando y sumar el total
          //el carrito se elimine
          //guaro el id de los productos y su cantidad. Para evitar errores, guardar todos los datos del producto en caso de que se elimine en un futuro
          //(id del producto/nombre/precio) =>  si el id no existe. Añadir 'este producto ya no esta dispobible' / 'este precio fue solo por la compra'
          //en el historial de compras muestro los productos relacionados al carrito
          //en mercado pago figura el monto total nomas
          //manejar con un estado el progreso del carrito (en progreso y pagado)

          //finalizado el pago en la tabla pagos, puedo guardar los datos de mercado pago. Relacionando el carritoID

          //tener en cuenta problemas cuando se elimina un producto
        
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
              },
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
  

  module.exports = postMerchantOrder