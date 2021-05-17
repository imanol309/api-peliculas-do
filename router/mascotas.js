const express = require("express");
const routerOne = express.Router();
const {
  Mascota
} = require("../models/EstructuraDeBD");

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

routerOne.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const mascotaDB = await Mascota.findOne({
      _id: id
    })

    res.render('detalle', )
    console.log(mascotaDB);
  } catch (error) {
    console.log('error en base de datos',error);
  }
})


module.exports = {
  routerOne,
};