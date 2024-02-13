const { MercadoPagoConfig, OAuth } = require("mercadopago");
require("dotenv").config();
const { ACCESS_TOKEN, CLIENT_ID, CLIENT_SECRET } = process.env;
const axios = require("axios");
const { Autorizaciones, Administrator } = require("../db");

const setToken = async (req, res) => {
  try {
    const { code, path } = req.body;

    const searchBoli = await Administrator.findOne({
      where: { name: path },
    });

    const boliId = searchBoli.dataValues.id;
    // console.log('boliche encontrado => ',boliId);

    const client = new MercadoPagoConfig({
      accessToken: ACCESS_TOKEN,
      options: { timeout: 5000 },
    });


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

    // const data = {
    //   access_token:
    //     "4APP_USR-7378685924902197-021209-90fc5433314244028aefc252ce86ea53-1672284877",
    //   token_type: "Bearer",
    //   expires_in: 15552000,
    //   scope: "offline_access read write",
    //   user_id: 1572284881,
    //   refresh_token: "TG-65ca21f08b82b10001674275-1672284877",
    //   public_key: "APP_USR-1f5e5952-6698-49c2-9b19-af32ab29dece",
    //   live_mode: true,
    // };

    data.AdministratorId = boliId;

    const newAutorization = await Autorizaciones.findOrCreate({
      where: { user_id: data.user_id },
      defaults: data,
    });

    // console.log('nuevos datos guardados en la base de datos',newAutorization[0].dataValues);

    return res.status(201).json(newAutorization[0].dataValues);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }

  //guardar datos en db
};

module.exports = setToken;
