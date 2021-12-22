// LLAMADNO ALGUNOS DE NPM QUE VOY A UTILIZAR 
const express = require("express");
const routerDelete = express.Router();
const {
  Mascota
} = require("../models/EstructuraDeBD");

// TOMANDO UN ID PARA DESPUES BORRAR ESO DATOS DE LA BASE DE DATOS
routerDelete.delete("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const mascotasDB = await Mascota.findByIdAndDelete({_id: id})
    if (mascotasDB) {
      res.json({
        estado: true,
        mensaje: `elimando`
      })

    } else {
      res.json({
        estado: false,
        mensaje: `archivo no eliminado`
      })
    }
  } catch (error) {
    console.log(error);
  }
})


module.exports = {
    routerDelete,
};