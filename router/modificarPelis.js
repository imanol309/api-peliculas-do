// LLAMADNO ALGUNOS DE NPM QUE VOY A UTILIZAR
const express = require("express");
const routerModificar = express.Router();
const { Peliculas, PeliculasMVistas } = require("../models/EstructuraDeBD");
const { isAuth } = require("../middlewares/auth");

// TOMANDO UN ID PARA DESPUES BORRAR ESO DATOS DE LA BASE DE DATOS
routerModificar.put("/:id", isAuth, (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Peliculas.findByIdAndUpdate(
    id,
    body,
    { useFindAndModify: false },
    function (err, docs) {
      if (err) {
        res.json({
          estado: false,
          mensaje: `No se pudo editar el dato`,
          error: err,
        });
      } else {
        res.json({
          estado: true,
          mensaje: `Dato editado correctamente`,
          docs: docs,
        });
      }
    }
  );
});

// TOMANDO UN ID PARA DESPUES EDITAR UN DATO EN EXPESIFICIO
routerModificar.patch("/patch/:id", isAuth, (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Peliculas.findByIdAndUpdate(
    id,
    body,
    { useFindAndModify: false },
    function (err, docs) {
      if (err) {
        res.json({
          estado: false,
          mensaje: `No se pudo editar el dato`,
          error: err,
        });
      } else {
        res.json({
          estado: true,
          mensaje: `Dato editado correctamente`,
          docs: docs,
        });
      }
    }
  );
});

// TOMANDO UN ID PARA DESPUES BORRAR ESO DATOS DE LA BASE DE DATOS
routerModificar.put("/masVistas/:id", isAuth, (req, res) => {
  const id = req.params.id;
  const body = req.body;
  PeliculasMVistas.findByIdAndUpdate(
    id,
    body,
    { useFindAndModify: false },
    function (err, docs) {
      if (err) {
        res.json({
          estado: false,
          mensaje: `No se pudo editar el dato`,
          error: err,
        });
      } else {
        res.json({
          estado: true,
          mensaje: `Dato editado correctamente`,
          docs: docs,
        });
      }
    }
  );
});

// TOMANDO UN ID PARA DESPUES EDITAR UN DATO EN EXPESIFICIO
routerModificar.patch("/masVistas/patch/:id", isAuth, (req, res) => {
  const id = req.params.id;
  const body = req.body;
  PeliculasMVistas.findByIdAndUpdate(
    id,
    body,
    { useFindAndModify: false },
    function (err, docs) {
      if (err) {
        res.json({
          estado: false,
          mensaje: `No se pudo editar el dato`,
          error: err,
        });
      } else {
        res.json({
          estado: true,
          mensaje: `Dato editado correctamente`,
          docs: docs,
        });
      }
    }
  );
});

// EXPORTANDO AL MODULO PARA UTILIZANDOR EN OTRO DOCUMENTO
module.exports = {
  routerModificar,
};
