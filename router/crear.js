const express = require("express");
const routerTwo = express.Router();
const { Mascota } = require("../models/EstructuraDeBD");


routerTwo.get('/',(req,res) =>{
    res.render('crear')
})

routerTwo.post('/', async(req,res) =>{
    const body = req.body
    try {
        const mascotaDB = new Mascota(body)
        await mascotaDB.save()

        res.redirect('/mascotas')
    } catch (error) {
        console.log(error);
    }
})


module.exports = {
    routerTwo,
}