const {Administrator} = require("../db");


const getAdministrator = async (req, res) => {
try {
    const administrators = await Administrator.findAll();
    return res.status(201).json(administrators);
} catch (error) {
    return res.status(500).json({error: error.message});
}

};

module.exports = getAdministrator;
