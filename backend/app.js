const express = require("express");
const cors = require("cors");
const remiRoutes = require("./src/routes/remi.routes");
const logger = require("./src/middleware/remi.logger");

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);
app.use("/remi", remiRoutes);

module.exports = app;
