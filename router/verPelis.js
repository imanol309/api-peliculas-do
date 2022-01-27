const express = require("express");
const routerVer = express.Router();
const { Mascota } = require("../models/EstructuraDeBD");

// Decir que pagina se va enviar al servidor y los datos
routerVer.get(`/`, (req, res) => {
  Mascota.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// RUTA PARA BUSCAR LA PELICULA POR EL ID
routerVer.get("/:id", async (req, res) => {
  const id = req.params.id;
  await Mascota.findOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// RUTA PARA BUSCAR LA PELICULA POR EL NOMBRE DE LA PELI
routerVer.get("/titulo/:nombre", async (req, res) => {
  const id = req.params.nombre;
  const titulos = id.split("-").join(" ");
  await Mascota.findOne({ titulo: titulos })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// RUTA PARA BUSCAR LA PELICULA POR EL YEARS, PERO TIENE UN PEQUEÑO BUG(FALTA SOLUCIONAR)
routerVer.get("/fecha/:years", async (req, res) => {
  const fecha = req.params.years;
  await Mascota.find({ año: fecha })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// RUTA PARA BUSCAR LAS PELICULAS POR EL GENERO DE LA PELICULA
routerVer.get("/genero/:nombre", async (req, res) => {
  const generos = req.params.nombre;
  const nombreSG = id.split("-").join(" ");
  await Mascota.find({ genero: generos })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// DONDE EXPORTO LAS PELICULAS
module.exports = {
  routerVer,
};
