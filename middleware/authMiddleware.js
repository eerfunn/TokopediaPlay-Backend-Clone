const jwt = require("jsonwebtoken");
const { errorTemplate } = require("../services/errorService");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token == null) return errorTemplate(401, "Please Login First!");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return errorTemplate(403, "Invalid Token!");
    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken };
