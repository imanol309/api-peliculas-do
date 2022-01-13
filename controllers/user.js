const { UserNew } = require("../models/EstructuraDeBD");
const { createToken } = require("../services/token");

function verUser(req, res) {
  UserNew.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
}

function verUserId(req, res) {
  const id = req.params.id;
  UserNew.findOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
}

function signUp(req, res) {
  const user = new UserNew({
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
  UserNew.find({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
    if (!user) {
      return res.status(404).send({ message: "No existe el usuario" });
    }

    req.user = user;
    res.status(200).send({
      message: "Te has logueado correctamente",
      token: createToken(user),
    });
  });
}

async function signDelete(req, res) {
  const id = req.params.id;
  try {
    const signDB = await UserNew.findByIdAndDelete({ _id: id });
    if (signDB) {
      res.json({
        estado: true,
        mensaje: `Eliminado`,
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
}

module.exports = {
  verUser,
  verUserId,
  signUp,
  signIn,
  signDelete,
};
