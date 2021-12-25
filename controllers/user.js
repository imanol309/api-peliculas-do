const {userNew} = require("../models/EstructuraDeBD");
const createToken = require('../services/token')
const express = require("express");
const routerCrearUser = express.Router();


routerCrearUser.post("/user" ,(req, res) => {
    const user = new userNew({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    })

    user.save((err) => {
        if (err) {
            res.status(500).send({message: `Error al crear el usuario ${err}`})
        }

        return res.status(200).send({token: createToken(user)})
    })
})


// function signIn(req, res) {

// }

module.exports = {
    // signUp,
    // signIn,
    routerCrearUser
}