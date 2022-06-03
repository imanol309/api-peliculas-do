const express = require("express");
const routerCrear = express.Router();
const { Peliculas, PeliculasMVistas } = require("../models/EstructuraDeBD");
const { isAuthSecret } = require("../middlewares/auth");

// RUTA PARA CREAR PELICULAS EN LA BASE DE DATOS
routerCrear.post("/", isAuthSecret, async (req, res) => {
  const body = req.body;
  try {
    const mascotaDB = new Peliculas(body);
    await mascotaDB.save();
    res.json({ message: "Dato guardado con exito", status: 200 });
  } catch (error) {
    console.log(error);
  }
});

// RUTA PARA CREAR PELICULAS EN LA BASE DE DATOS DE LAS MAS VISTAS LISTA.
routerCrear.post("/masVistas", isAuthSecret, async (req, res) => {
  const body = req.body;
  try {
    const mascotaDB = new PeliculasMVistas(body);
    await mascotaDB.save();
    res.json({ message: "Dato guardado con exito", status: 200 });
  } catch (error) {
    res.json({ message: error, status: 500 });
  }
});

module.exports = {
  routerCrear,
};
