const {Administrator} = require("../db");

const postAdministrator = async (req, res) => {
  try {
    const data = req.body;
    console.log('crear user  =>', data);
    const newAdmin = await Administrator.create(data);
    return res.status(201).json(newAdmin);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postAdministrator;
