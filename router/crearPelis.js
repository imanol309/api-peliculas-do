const express = require("express");
const routerCrear = express.Router();
const { Mascota } = require("../models/EstructuraDeBD");

routerCrear.post("/", async (req, res) => {
  const body = req.body;
  try {
    const mascotaDB = new Mascota(body);
    await mascotaDB.save();
    res.json({ message: "Dato guardado con exito", status: 200 });
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  routerCrear,
};
