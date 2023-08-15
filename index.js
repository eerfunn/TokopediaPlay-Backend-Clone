const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 5000;
const router = require("./router/routes");
const cors = require("cors");
const { DBConnect } = require("./config/config");

const app = express();

DBConnect();

app.use(cors());
app.use(express.json());
app.use("/api/v1", router);
app.listen(port, () => {
  console.log(`Express connected at http://localhost:${port}`);
});
