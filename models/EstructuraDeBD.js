const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Extructura de como se van a introducir los datos en peliculas
const peliculaSchema = new Schema({
  titulo: { type: String, unique: true },
  genero: String,
  Director: String,
  año: Date,
  Reparto: { type: String, unique: true },
  img: { type: String, unique: true },
  video: { type: String, unique: true },
});

// Estructura de como se van introducir los datos en usuarios
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  name: String,
  password: { type: String },
  token: { type: String },
  signupDate: { type: Date, default: Date.now() },
});

// crear el modelo
const Peliculas = mongoose.model("infodominicanas", peliculaSchema);
const UserNew = mongoose.model("userdominicanos", userSchema);

module.exports = {
  Peliculas,
  UserNew,
};
