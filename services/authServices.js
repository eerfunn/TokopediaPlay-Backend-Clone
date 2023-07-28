const jwt = require("jsonwebtoken");
const { errorTemplate } = require("../services/errorService");

const signToken = async (req, res) => {
  console.log(req.user);
  const refreshToken = await jwt.sign(
    {
      userId: req.user.id,
      email: req.user.email,
      name: req.user.name,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "90d" }
  );
  const accessToken = await jwt.sign(
    {
      userId: req.user.id,
      email: req.user.email,
      name: req.user.name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30d" }
  );
  await res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  await res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 90 * 24 * 60 * 60 * 1000,
  });
  return accessToken;
};

const whoAmIService = (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token == null) return errorTemplate(401, "Please Login First!");
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decoded);
    return decoded;
  } catch (error) {
    if (error == "JsonWebTokenError: jwt malformed") {
      return errorTemplate(403, "JWT Token Invalid");
    }
    if (error == "TokenExpiredError: jwt expired") {
      return errorTemplate(403, "JWT Token Expired, Please Relogin!");
    }
    throw new Error(error);
  }
};

module.exports = {
  signToken,
  whoAmIService,
};
