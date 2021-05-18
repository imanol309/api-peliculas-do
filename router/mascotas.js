// LLAMADNO ALGUNOS DE NPM QUE VOY A UTILIZAR 

const express = require("express");
const routerOne = express.Router();
const {
  Mascota
} = require("../models/EstructuraDeBD");

// RUTA DE EL LINK MASCOTAS

routerOne.get("/", async (req, res) => {
  try {
    const arrayMascotas = await Mascota.find();
    res.render(`Mascotas`, {
      arrayMascotas
    })
  } catch (error) {
    console.log(error);
  }
});

// TOMANDO EL ID DE UNO DE LOS IMAGENES PARA EDITARLO

routerOne.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const mascotaDB = await Mascota.findOne({
      _id: id
    })
    console.log(mascotaDB);
    res.render('detalle', {
      mascota: mascotaDB,
      error: false
    })

  } catch (error) {
    console.log('error en base de datos', error);
    res.render('detalle', {
      error: true,
      mensaje: `el ID ${id} no se encuentra.`
    })
  }
})

// TOMANDO UN ID PARA DESPUES BORRAR ESO DATOS DE LA BASE DE DATOS Y DE LA PAGINA

routerOne.delete("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const mascotasDB = await Mascota.findByIdAndDelete({
      _id: id
    })
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

// TOMANDO UN ID PARA DESPUES BORRAR ESO DATOS DE LA BASE DE DATOS Y DE LA PAGINA

routerOne.put("/:id", async (req, res) => {
  const id = req.param.id
  const body = req.body

  console.log(id);
  console.log(`bdoy`, body);
   
  try {
    const mascotasDB = await Mascota.findByIdAndUpdate(id, body, { useFindAndModify: false })
    console.log(mascotasDB);
    res.json({
      estado: true,
      mensaje: `Datos editado`
    })

  } catch (error) {
    console.log(error);
    res.json({
      estado: false,
      mensaje: `Datos NO editado`
    })
  }
})


// EXPORTANDO AL MODULO PARA UTILIZANDOR EN OTRO DOCUMENTO
module.exports = {
  routerOne,
};