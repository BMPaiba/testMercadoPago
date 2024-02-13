const {Autorizaciones} = require("../db");


const getTokens = async (req, res) => {
try {
    const autorizaciones = await Autorizaciones.findAll();
    return res.status(201).json(autorizaciones);
} catch (error) {
    return res.status(500).json({error: error.message});
}

};

module.exports = getTokens;
