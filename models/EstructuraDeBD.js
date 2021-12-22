const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mascotaSchema = new Schema({
  titulo: String,
  genero: String,
  Director: String,
  Reparto: String,
});

// crear el modelo

const Mascota = mongoose.model("dominicanas", mascotaSchema);

module.exports = {
  Mascota,
};
