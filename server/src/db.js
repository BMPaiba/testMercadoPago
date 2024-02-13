require('dotenv').config();
const { Sequelize } = require('sequelize');
const AdministratorModel = require('./models/Administrator');
const AutorizacionesModel = require('./models/Autorizaciones');

const fs = require("fs");
const path = require("path");

const { DB_USER, DB_PASSWORD, DB_HOST, PORT, DB_NAME } = process.env;

const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${PORT}/${DB_NAME}`,
   { logging: false, native: false }
);

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);


// Configurar el modelo Administrator
AdministratorModel(sequelize);
AutorizacionesModel(sequelize);

// Obtener el modelo Administrator
const {Administrator , Autorizaciones} = sequelize.models;

Administrator.hasOne(Autorizaciones); // A HasOne B

// Exportar modelos y la conexión Sequelize
module.exports = {
   ...sequelize.models, // Exportar otros modelos
   conn: sequelize, // Exportar la conexión Sequelize
};


