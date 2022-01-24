const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mascotaSchema = new Schema({
  titulo: { type: String, unique: true },
  genero: String,
  Director: String,
  año: Date,
  Reparto: { type: String, unique: true },
  img: { type: String, unique: true },
  video: { type: String, unique: true },
});

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  name: String,
  password: { type: String },
  token: { type: String },
  signupDate: { type: Date, default: Date.now() },
});

// crear el modelo

const Mascota = mongoose.model("infodominicanas", mascotaSchema);
const UserNew = mongoose.model("userdominicanos", userSchema);

module.exports = {
  Mascota,
  UserNew,
};
