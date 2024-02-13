const {Administrator , Autorizaciones} = require("../db");

const postKey = async (req, res) => {
  const urlRecibida = req.body.cliente;

  console.log('apikey', urlRecibida);

  const administrator = await Administrator.findOne({ where: { name: urlRecibida } });

  const administratorId = administrator.dataValues.id;


  const auth = await Autorizaciones.findOne({ where: { AdministratorId: administratorId } });

  // console.log(auth.dataValues.public_key);
  const key = auth.dataValues.public_key

  console.log('apikey', key);

  return res.status(201).json(key);
};

module.exports = postKey;