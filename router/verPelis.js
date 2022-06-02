const express = require("express");
const routerVer = express.Router();
const { Peliculas, PeliculasMVistas } = require("../models/EstructuraDeBD");

// Decir que pagina se va enviar al servidor y los datos

// RUTA PARA VER TODAS LAS PELICULAS
routerVer.get(`/`, (req, res) => {
  Peliculas.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// RUTA PARA VER TODAS LAS PELICULAS MAS VISTAS
routerVer.get(`/masVistas`, (req, res) => {
  PeliculasMVistas.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// RUTA PARA BUSCAR LA PELICULA POR EL ID
routerVer.get("/:id", async (req, res) => {
  const id = req.params.id;
  await Peliculas.findOne({ _id: id })
    .then((data) => res.json([data]))
    .catch((error) => res.json({ message: error }));
});

// RUTA PARA BUSCAR LA PELICULA POR EL ID EN LAS MAS VISTAS
routerVer.get("/masVistas/:id", async (req, res) => {
  const id = req.params.id;
  await PeliculasMVistas.findOne({ _id: id })
    .then((data) => res.json([data]))
    .catch((error) => res.json({ message: error }));
});

// RUTA PARA BUSCAR LA PELICULA POR EL NOMBRE DE LA PELI
routerVer.get("/titulo/:nombre", async (req, res) => {
  const titulos = req.params.nombre;
  await Peliculas.find({ titulo: { $regex: titulos, $options: "i" } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// RUTA PARA BUSCAR LA PELICULA POR EL NOMBRE DE LA PELI
routerVer.get("/masVistas/titulo/:nombre", async (req, res) => {
  const titulos = req.params.nombre;
  await PeliculasMVistas.find({ titulo: { $regex: titulos, $options: "i" } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// RUTA PARA BUSCAR LA PELICULA POR EL YEARS, PERO TIENE UN PEQUEÑO BUG(FALTA SOLUCIONAR)
routerVer.get("/fecha/:years", async (req, res) => {
  const fecha = req.params.years;
  await Peliculas.find({ año: fecha })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// RUTA PARA BUSCAR LAS PELICULAS POR EL GENERO DE LA PELICULA
routerVer.get("/genero/:nombre", async (req, res) => {
  const generos = req.params.nombre;
  await Peliculas.find({ genero: generos })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// DONDE EXPORTO LAS PELICULAS
module.exports = {
  routerVer,
};
