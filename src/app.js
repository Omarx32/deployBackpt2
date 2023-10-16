const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer");
const mercadopago = require("mercadopago");
const routes = require("./routes/index.js");
// const mercadopagoRoutes = require("./routes/MpRoutes.js");
require("./db.js");

const server = express();

server.name = "API";

const storage = multer.diskStorage;

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);

mercadopago.configure({
  access_token:
    "TEST-2664276290314152-091023-a8dbce86749b18cb2960e492a1d25bea-1476921582",
});

module.exports = server;