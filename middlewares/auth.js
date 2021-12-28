const jwt = require("jwt-simple");
const moment = require("moment");

function isAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: "No tienes autorizacion" });
  }

  const token = req.headers.authorization.split(" ")[1];
  const payload = jwt.decode(token, process.env.SECRET_TOKEN);

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: "El token ha expirado" });
  }
  req.user = payload.sub;
  next();
}

module.exports = isAuth;
