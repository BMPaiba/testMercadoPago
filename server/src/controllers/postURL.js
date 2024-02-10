const postURL = async (req, res) => {
  const urlRecibida = req.body.pathToSend ;
  return urlRecibida
};

module.exports = postURL;
