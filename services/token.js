// los paquetes que estoy utilizando para crear el token
const jwt = require("jwt-simple"); // Paquete para crear token jwt
const moment = require("moment"); //Paquete para el tiempo de la creacion del token

// Funcion para crear el token con los datos que le envies de los usuarios.
function createToken(user) {
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(350, "days").unix(),
  };

  return jwt.encode(payload, process.env.SECRET_TOKEN);
}

// Funcion para decifrar el token
function decodeToken(token) {
  const decoded = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, process.env.SECRET_TOKEN);
      if (payload.exp <= moment().unix()) {
        reject({
          status: 401,
          message: "El token ha expirado",
        });
      }
      resolve(payload.sub);
    } catch (err) {
      reject({
        status: 500,
        message: "Invalido token",
      });
    }
  });

  return decoded;
}

// Modulo para esportar las dos funcion
module.exports = { createToken, decodeToken };
