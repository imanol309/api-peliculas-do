// LLAMADNO ALGUNOS DE NPM QUE VOY A UTILIZAR 
const express = require("express");
const routerOne = express.Router();
const {
  Mascota
} = require("../models/EstructuraDeBD");

// TOMANDO UN ID PARA DESPUES BORRAR ESO DATOS DE LA BASE DE DATOS

routerOne.delete("/delete/:id", async (req, res) => {
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

// TOMANDO UN ID PARA DESPUES BORRAR ESO DATOS DE LA BASE DE DATOS

routerOne.put("/put/:id", (req, res) => {
  const id = req.params.id
  const body = req.body
  Mascota.findByIdAndUpdate(id, body, { useFindAndModify: false },
    function(err, docs) {
      if(err) {
        res.json({
          estado: false,
          mensaje: `No se pudo editar el dato`,
          error: err
        })
      } else {
        res.json({
          estado: true,
          mensaje: `Dato editado correctamente`,
          docs: docs
        })
      }
    }
  )
})


// EXPORTANDO AL MODULO PARA UTILIZANDOR EN OTRO DOCUMENTO

module.exports = {
  routerOne,
};