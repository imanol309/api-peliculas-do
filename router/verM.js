const express = require("express")
const router =  express.Router();
const { Mascota } = require("../models/EstructuraDeBD");

// Decir que pagina se va enviar al servidor y los datos
router.get(`/`, (req, res) => {
  Mascota
  .find()
  .then((data) => res.json(data))
  .catch((error) => res.json({message: error}));
});

router.get("/:id", async (req, res) => {
  const id = req.params.id
    await Mascota
    .findOne({_id: id})
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
})

module.exports = {
    router,
};