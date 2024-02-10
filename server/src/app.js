const express = require("express");
const morgan = require("morgan");
const router = require("./routes/routes");
const server = express();
const cors = require("cors");
const bodyParser = require('body-parser');

// server.use(bodyParser.json());

//* Middlewares
server.use(cors());
server.use(express.json());
server.use(morgan("dev"));
server.use(router);

module.exports = server;