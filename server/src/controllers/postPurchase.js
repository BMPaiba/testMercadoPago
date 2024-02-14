const { Preference, default: MercadoPagoConfig } = require("mercadopago");
const {Administrator , Autorizaciones} = require("../db");
const mercadopago = require("mercadopago"); // require

const postPurchase = async (req, res) => {
    try {

        // console.log(mercadopago);

        const urlRecibida = req.body.path;  

            console.log('token', urlRecibida);

            const administrator = await Administrator.findOne({ where: { name: urlRecibida } });

            const administratorId = administrator.dataValues.id;
          
          
            const auth = await Autorizaciones.findOne({ where: { AdministratorId: administratorId } });
          
        
            const token = auth.dataValues.access_token

            console.log('token', token);

        // const token = searchToken.dataValues.token

        // dentro del modelo administrator
        //columna mercadopago token =>  si tiene, esta habilitado para recibir pagos
    

        const client = new MercadoPagoConfig({
            accessToken:
              token, //pasarle el token publico
          });

          const products = req.body.products;  

          console.log(products);
        
        const body = {
            items: products,
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
        console.log('error => ', error);
        res.status(500).json({
            error: "Error al crear la preferencia :("
        });
    }
  
  };
  

  module.exports = postPurchase



//   https://www.mercadopago.com.ar/checkout/v1/payment/redirect/e4d090ce-a217-4254-9a4f-08d68d598ff8/congrats/approved/?preference-id=1681919110-c138874c-f1e0-44d2-b5cb-b6b0df052cc1&correlation_id=1b237b49-0be1-496e-b873-9a3c6d032a8e&sniffing-rollout=sniffing-api&router-request-id=f236fd20-9f74-4e27-8af8-1fcdc37a8c54&p=72f5bc1d72d0bae0385b00c3c93b69f7  