require('dotenv').config();
const { Sequelize } = require('sequelize');
const AdministratorModel = require('./models/Administrator');

const { DB_USER, DB_PASSWORD, DB_HOST, PORT, DB_NAME } = process.env;

const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${PORT}/${DB_NAME}`,
   { logging: false, native: false }
);

// Configurar el modelo Administrator
AdministratorModel(sequelize);

// Obtener el modelo Administrator
const Administrator = sequelize.models.Administrator;

// Exportar modelos y la conexión Sequelize
module.exports = {
   Administrator, // Exportar el modelo Administrator
   ...sequelize.models, // Exportar otros modelos
   conn: sequelize, // Exportar la conexión Sequelize
};
