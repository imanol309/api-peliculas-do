const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mascotaSchema = new Schema({
  titulo: String,
  genero: String,
  Director: String,
  año: Date,
  Reparto: String,
  img: String
});

// crear el modelo

const Mascota = mongoose.model("infodominicanas", mascotaSchema);

module.exports = {
  Mascota,
};
