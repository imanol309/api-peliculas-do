const express = require("express");
const routerOne = express.Router();
const { Mascota } = require("../models/EstructuraDeBD");

routerOne.get("/", async (req, res) => {
  try {
    const arrayMascotas = await Mascota.find();
    res.render(`Mascotas`, {
      arrayMascotas
    })
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  routerOne,
};