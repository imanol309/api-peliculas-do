const express = require("express")
const router =  express.Router();

// Decir que pagina se va enviar al servidor y los datos
router.get(`/`, (req, res) => {
    res.render(`paginaOne`, {
      title: `Datos de revicion`,
      titleOne: `Datos de eliminacion`,
    });
});

module.exports = {
    router,
};