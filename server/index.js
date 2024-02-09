const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const {  MercadoPagoConfig,Preference } = require("mercadopago");


const client = new MercadoPagoConfig({
  accessToken:
    "TEST-203586994908608-020721-78e30702a617374fd03ee1ce0eab3ed6-1674411644",
});

const server = express();
const port = 3000;

server.use(cors());
server.use(morgan("dev"));
server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hello World!");
});

server.post("/create_preference", async (req, res) => {
  try {

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

});


server.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
});