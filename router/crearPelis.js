const express = require("express");
const routerCrear = express.Router();
const { Peliculas, PeliculasMVistas } = require("../models/EstructuraDeBD");
const { isAuth } = require("../middlewares/auth");

routerCrear.post("/", isAuth, async (req, res) => {
  const body = req.body;
  try {
    const mascotaDB = new Peliculas(body);
    await mascotaDB.save();
    res.json({ message: "Dato guardado con exito", status: 200 });
  } catch (error) {
    console.log(error);
  }
});

routerCrear.post("/masVistas", isAuth, async (req, res) => {
  const body = req.body;
  try {
    const mascotaDB = new PeliculasMVistas(body);
    await mascotaDB.save();
    res.json({ message: "Dato guardado con exito", status: 200 });
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  routerCrear,
};
