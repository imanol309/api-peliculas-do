const mongoose =  require('mongoose')
const mascotaSchema = require('../models/EstructuraDeBD')
const {userNew} = require("../models/EstructuraDeBD");


function signUp(req, res) {
    const user = new userNew({
        email: req.body.email,
        contraseña: req.body.contraseña
    })

    user.save((err) => {
        if (err) {
            res.status(500).send({message: `Error al crear el usuario ${err}`})
        }

        return res.status(200).send({token: service.createToken(user)})
    })
}


function signIn(req, res) {

}

module.exports = {
    signUp,
    signIn
}