 const {Administrator} = require("../db");

const postURL = async (req, res) => {
  const urlRecibida = req.body.pathToSend;

  const client = await Administrator.findOne({ where: { name: urlRecibida } });

  console.log(client.dataValues.key);

  return res.status(201).json(urlRecibida);
};

module.exports = postURL;
