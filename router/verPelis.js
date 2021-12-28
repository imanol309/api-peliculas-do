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
  console.log(titulos);
  await Mascota.findOne({ titulo: titulos })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = {
  routerVer,
};
