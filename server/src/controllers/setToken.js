const { MercadoPagoConfig, OAuth } = require("mercadopago");
require("dotenv").config();
const { ACCESS_TOKEN, CLIENT_ID, CLIENT_SECRET } = process.env;
const axios = require("axios");

const setToken = async (req, res) => {
  try {
  const client = new MercadoPagoConfig({
    accessToken: ACCESS_TOKEN,
    options: { timeout: 5000 },
  });

  const { code } = req.body;
  const redirect_uri =
    "https://mercadopago-7p1q.onrender.com/mercadopago-authorization/success";

  const postData = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: code,
    grant_type: "authorization_code",
    redirect_uri: redirect_uri,
  };

    const { data } = await axios.post(
      "https://api.mercadopago.com/oauth/token",
      postData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
      console.log(data);
      return res.status(201).json(data)

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  // axios
  //   .post("https://api.mercadopago.com/oauth/token", postData, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //   .then((response) => {
  //     console.log("Respuesta exitosa:", response.data);
  //   })
  //   .catch((error) => {
  //     console.error("Error en la solicitud:", error.response.data);
  //   });
};

module.exports = setToken;
