const express = require("express");
const port = process.env.port || 3000;
const router = require("./router/routes");
const { DBConnect } = require("./config/config");
const dotenv = require(dotenv);
const app = express();

dotenv.config();

DBConnect();
app.use(express.json());
app.use("/api/v1", router);
app.listen(port, () => {
  console.log(`Express connected at http://localhost:${port}!`);
});
