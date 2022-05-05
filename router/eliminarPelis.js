// LLAMADNO ALGUNOS DE NPM QUE VOY A UTILIZAR
const express = require("express");
const routerDelete = express.Router();
const { Peliculas, PeliculasMVistas } = require("../models/EstructuraDeBD");
const { isAuth } = require("../middlewares/auth");

// TOMANDO UN ID PARA DESPUES BORRAR ESO DATOS DE LA BASE DE DATOS
routerDelete.delete("/:id", isAuth, async (req, res) => {
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

// TOMANDO UN ID PARA DESPUES BORRAR ESO DATOS DE LA BASE DE DATOS
routerDelete.delete("/masVistas/:id", isAuth, async (req, res) => {
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
