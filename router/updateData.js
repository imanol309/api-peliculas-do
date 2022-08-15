// LLAMADNO ALGUNOS DE NPM QUE VOY A UTILIZAR
const express = require("express");
const updateData = express.Router();
const { Peliculas, PeliculasMVistas } = require("../models/EstructuraDeBD");
const { isAuth, isAuthSecret } = require("../middlewares/auth");

// TOMANDO UN ID PARA DESPUES BORRAR ESO DATOS DE LA BASE DE DATOS
updateData.put("/:id", isAuthSecret, (req, res) => {
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
updateData.patch("/patch/:id", isAuthSecret, (req, res) => {
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

//Ruta para agregar una nueva pelicula a la lista de pelicula favoritas
updateData.patch("/comments/patch/:id", isAuthSecret, (req, res) => {
  const id = req.params.id;
  const commentsNew = {
    emailUser: req.body.email,
    name: req.body.name,
    logo: req.body.logo,
    message: req.body.message,
  };

  Peliculas.findByIdAndUpdate(
    { _id: id },
    { $addToSet: { comments: commentsNew } },
    { new: true },
    (err, user) => {
      if (err) {
        res.status(500).send({
          message: `Error al agregar un comentario en la pelicula ${err}`,
        });
      }
      return res
        .status(200)
        .send({ mensaje: "Comentario agregda con exito", commentsNew: user });
    }
  );
});

// TOMANDO UN ID PARA DESPUES BORRAR ESO DATOS DE LA BASE DE DATOS
updateData.put("/masVistas/:id", isAuthSecret, (req, res) => {
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
updateData.patch("/masVistas/patch/:id", isAuthSecret, (req, res) => {
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

// EDITANDO UN CAMPO DE TODA LA BASE DE DATOS COMPLETA
updateData.put("/modificarTodoBD", isAuthSecret, async (req, res) => {
  const bodyType = req.body.type;
  await Peliculas.updateMany({}, { type: bodyType }, function (err, docs) {
    if (err) {
      res.json({
        estado: false,
        mensaje: "Datos no se pudieron editar",
        error: err,
      });
    } else {
      res.json({
        estado: true,
        mensaje: "Datos editados completamente",
        docs: docs,
      });
    }
  });
});

// EDITANDO UN CAMPO DE TODA LA BASE DE DATOS COMPLETA DE LAS PELICULAS MAS VISTAS
updateData.put("/modificarTodoBD/masVistas", isAuthSecret, async (req, res) => {
  const bodyType = req.body.type;
  await PeliculasMVistas.updateMany(
    {},
    { type: bodyType },
    function (err, docs) {
      if (err) {
        res.json({
          estado: false,
          mensaje: "Datos no se pudieron editar",
          error: err,
        });
      } else {
        res.json({
          estado: true,
          mensaje: "Datos editados completamente",
          docs: docs,
        });
      }
    }
  );
});
// EXPORTANDO AL MODULO PARA UTILIZANDOR EN OTRO DOCUMENTO
module.exports = {
  updateData,
};
