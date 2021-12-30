const { userNew } = require("../models/EstructuraDeBD");
const { createToken } = require("../services/token");
const express = require("express");
const routerCrearUser = express.Router();

function signUp(req, res) {
  const user = new userNew({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
  });

  user.save((err) => {
    if (err) {
      res.status(500).send({ message: `Error al crear el usuario ${err}` });
    }

    return res.status(200).send({ token: createToken(user) });
  });
}

function signIn(req, res) {
  userNew.find({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ message: err });
    if (!user) return res.status(404).send({ message: "No existe el usuario" });

    req.user = user;
    res.status(200).send({
      message: "Te has logueado correctamente",
      token: createToken(userNew),
    });
  });
}

module.exports = {
  signUp,
  signIn,
};
