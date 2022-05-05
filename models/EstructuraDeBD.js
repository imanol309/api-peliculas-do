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


const peliculaVistasSchema = new Schema({
  titulo: { type: String, unique: true },
  genero: String,
  Director: String,
  year: Date,
  Reparto: { type: String },
  img: { type: String, unique: true },
  video: { type: String, unique: true },
  descripcion: { type: String, unique: true },
  duracion: String,
});

// crear el modelo
const Peliculas = mongoose.model("infodominicanas", peliculaSchema);
const PeliculasMVistas = mongoose.model("masvitasdominicanos", peliculaVistasSchema);
const UserNew = mongoose.model("userdominicanos", userSchema);


module.exports = {
  Peliculas,
  UserNew,
  PeliculasMVistas
};
