const { decodeToken } = require("../services/token.js");

// Funcion para ver si tienes autorizacion en la api
function isAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: "No tienes autorizacion" });
  }

  const token = req.headers.authorization.split(" ")[1];
  decodeToken(token)
    .then((response) => {
      req.user = response;
      next();
    })
    .catch((response) => {
      res.status(response.status);
    });
}

// Funcion para pedir un secret para poder utilizar algunas rutas privadas
function isAuthSecret(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: "No tienes autorizacion" });
  }
  if (req.headers.authorization === process.env.SECRET_TOKEN) {
    next();
  } else {
    return res.status(403).send({ message: "El SECRET es incorrecto" });
  }
}

// EXPORTANDO LAS FUNCIONES DE ESTE MODULE
module.exports = {
  isAuth,
  isAuthSecret,
};
