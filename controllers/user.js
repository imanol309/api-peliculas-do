const { UserNew } = require("../models/EstructuraDeBD");
const { createToken } = require("../services/token");
const bcryptjs = require("bcryptjs");

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

async function signUp(req, res) {
  const passwordNormal = req.body.password;
  const user = new UserNew({
    email: req.body.email,
    name: req.body.name,
    password: await bcryptjs.hash(passwordNormal, 8),
  });

  user.save((err) => {
    if (err) {
      res.status(500).send({ message: `Error al crear el usuario ${err}` });
    }

    return res.status(200).send({ token: createToken(user) });
  });
}

async function signIn(req, res) {
  await UserNew.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
    if (!user.email) {
      return res.status(404).send({ message: "Tu usuario no exicte en la BD" });
    }
    if (!bcryptjs.compareSync(req.body.password, user.password)) {
      return res
        .status(404)
        .send({ message: "Tu contraseña no exicte en la BD" });
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