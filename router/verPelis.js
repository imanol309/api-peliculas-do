const express = require("express");
const routerVer = express.Router();
const { Mascota } = require("../models/EstructuraDeBD");

// Decir que pagina se va enviar al servidor y los datos
routerVer.get(`/`, (req, res) => {
  Mascota.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

routerVer.get("/:id", async (req, res) => {
  const id = req.params.id;
  await Mascota.findOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

routerVer.get("/titulo/:nombre", async (req, res) => {
  const id = req.params.nombre;
  const titulos = id.split("-").join(" ");
  await Mascota.findOne({ titulo: titulos })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

routerVer.get("/fecha/:years", async (req, res) => {
  const fecha = req.params.years;
  // const fechaOp = `${fecha}-01-01T00:00:00.000Z`;
  // console.log(fechaOp);
  await Mascota.find({ año: fecha })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

routerVer.get("/genero/:nombre", async (req, res) => {
  const generos = req.params.nombre;
  await Mascota.find({ genero: generos })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = {
  routerVer,
};
