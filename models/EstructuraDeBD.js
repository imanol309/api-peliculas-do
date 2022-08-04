const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Extructura de como se van a introducir los datos en peliculas
const peliculaSchema = new Schema({
  titulo: { type: String },
  genero: String,
  Director: String,
  year: Date,
  Reparto: { type: String },
  img: { type: String },
  video: { type: String },
  time: String,
  descripcion: { type: String },
  type: { type: String },
  comments: [
    {
      emailUser: { type: String },
      name: String,
      logo: { type: String },
      signupDate: { type: Date, default: Date.now() },
      message: { type: String },
    },
  ],
});

// Estructura de como se van introducir los datos en usuarios
const userSchema = Schema({
  email: {
    type: String,
    require: true,
    index: true,
    unique: true,
    sparse: true,
  },
  name: String,
  password: { type: String },
  logo: { type: String },
  signupDate: { type: Date, default: Date.now() },
  favoriteMovies: [
    {
      _id: { type: String },
      titulo: { type: String },
      genero: { type: String },
      Director: { type: String },
      year: Date,
      Reparto: { type: String },
      img: { type: String },
      video: { type: String },
      time: String,
      descripcion: { type: String },
    },
  ],
});

// Estructura de como se van introducir los datos de las peliculas mas vistas
const peliculaVistasSchema = new Schema({
  _id: { type: String },
  titulo: { type: String },
  genero: String,
  Director: String,
  year: Date,
  Reparto: { type: String },
  img: { type: String },
  video: { type: String },
  time: String,
  descripcion: { type: String },
  recaudacion: { type: String },
  type: { type: String },
  comments: [
    {
      emailUser: { type: String },
      name: String,
      logo: { type: String },
      signupDate: { type: Date, default: Date.now() },
      message: { type: String },
    },
  ],
});

// crear el modelo
const Peliculas = mongoose.model("peliculasmarvels", peliculaSchema);
const PeliculasMVistas = mongoose.model(
  "masvistasmarvels",
  peliculaVistasSchema
);
const UserNew = mongoose.model("userdominicanos", userSchema);

module.exports = {
  Peliculas,
  UserNew,
  PeliculasMVistas,
};
