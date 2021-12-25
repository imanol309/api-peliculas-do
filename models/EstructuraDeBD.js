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


const userSchema = new Schema({
  email: String,
  password: String,
});


// crear el modelo

const Mascota = mongoose.model("infodominicanas", mascotaSchema);
const userNew = mongoose.model("userdominicanos", userSchema);


module.exports = {
  Mascota,
  userNew
};
