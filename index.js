const express = require("express");
require("dotenv").config();
const port = process.env.port || 3000;
const router = require("./router/routes");
const { DBConnect } = require("./config/config");

const app = express();

DBConnect();

app.use(express.json());
app.use("/api/v1", router);
app.listen(port, () => {
  console.log(`Express connected at http://localhost:${port}!`);
});
