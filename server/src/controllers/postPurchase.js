const { Preference, default: MercadoPagoConfig } = require("mercadopago");
const { Administrator, Autorizaciones } = require("../db");
const mercadopago = require("mercadopago"); // require

const postPurchase = async (req, res) => {
  try {
    const cliente = req.body.path;
    const administrator = await Administrator.findOne({
      where: { name: urlRecibida },
    });
    const administratorId = administrator.dataValues.id;
    const auth = await Autorizaciones.findOne({
      where: { AdministratorId: administratorId },
    });
    const token = auth.dataValues.access_token;

    const client = new MercadoPagoConfig({
      accessToken: token, 
    });
    const products = req.body.products;
    const body = {
      items: products,
      back_urls: {
        success: `https://mercadopago-7p1q.onrender.com/${cliente}/paymentsuccess`,
        // failure: "https://www.youtube.com",
        // pending: "https://www.youtube.com",
      },
      notification_url: `https://mercadopago-7p1q.onrender.com/${cliente}/paymentsuccess`,
    };
    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.json({
      id: result.id,
    });
  } catch (error) {
    console.log("error => ", error);
    res.status(500).json({
      error: "Error al crear la preferencia :(",
    });
  }
};
module.exports = postPurchase;
