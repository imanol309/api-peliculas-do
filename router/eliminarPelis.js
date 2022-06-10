// LLAMADNO ALGUNOS DE NPM QUE VOY A UTILIZAR
const express = require("express");
const routerDelete = express.Router();
const { Peliculas, PeliculasMVistas } = require("../models/EstructuraDeBD");
const { isAuth, isAuthSecret } = require("../middlewares/auth");

// TOMANDO UN ID PARA DESPUES BORRAR ESO DATOS DE LA BASE DE DATOS
routerDelete.delete("/:id", isAuthSecret, async (req, res) => {
  const id = req.params.id;
  try {
    const mascotasDB = await Peliculas.findByIdAndDelete({ _id: id });
    if (mascotasDB) {
      res.json({
        estado: true,
        mensaje: `Elimando`,
      });
    } else {
      res.json({
        estado: false,
        mensaje: `Archivo no eliminado`,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

routerDelete.patch("/comments/:id", isAuthSecret, async (req, res) => {
  await Peliculas.findByIdAndUpdate(
    { _id: req.params.id },
    { $pull: { comments: { _id: req.body.id } } },
    { new: true },
    (err, user) => {
      if (err) {
        res.status(500).send({ message: `Error al eliminar el comentario ${err}` });
      }
      return res
        .status(200)
        .send({ mensaje: "Pelicula eliminada con exito", moviesNew: user });
    }
  );
});

// TOMANDO UN ID PARA DESPUES BORRAR ESO DATOS DE LA BASE DE DATOS DE LAS PELICULAS MAS VISTAS
routerDelete.delete("/masVistas/:id", isAuthSecret, async (req, res) => {
  const id = req.params.id;
  try {
    const mascotasDB = await PeliculasMVistas.findByIdAndDelete({ _id: id });
    if (mascotasDB) {
      res.json({
        estado: true,
        mensaje: `Elimando`,
      });
    } else {
      res.json({
        estado: false,
        mensaje: `Archivo no eliminado`,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  routerDelete,
};
