const { UserNew } = require("../models/EstructuraDeBD");
const { createToken } = require("../services/token");
const bcryptjs = require("bcryptjs");

// Ruta para ver usuarios
function verUser(req, res) {
  UserNew.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
}

// Ruta para ver un usuario en espesifico
function verUserId(req, res) {
  const id = req.params.id;
  UserNew.findOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
}

//Ruta para crear un usuario nuevo y token
async function signUp(req, res) {
  const passwordNormal = req.body.password;
  const userToken = {
    email: req.body.email,
    name: req.body.name,
    password: await bcryptjs.hash(passwordNormal, 8),
  };

  const user = new UserNew({
    email: req.body.email,
    name: req.body.name,
    password: await bcryptjs.hash(passwordNormal, 8),
    token: createToken(userToken),
  });

  user.save((err) => {
    if (err) {
      res.status(500).send({ message: `Error al crear el usuario ${err}` });
    }

    return res.status(200).send({ token: createToken(userToken) });
  });
}

// Ruta para ver si esta logeado en la api
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

// Ruta para eliminar los usuarios que no deseo
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

// Ruta para editar la contraseña de un usuario ya creado
async function signUpdate(req, res) {
  const id = req.params.id;
  req.body.password = await bcryptjs.hash(req.body.password, 8);
  UserNew.findByIdAndUpdate(
    id,
    req.body,
    { useFindAndModify: false },
    function (err, docs) {
      console.log(docs);
      if (err) {
        res.json({
          estado: false,
          mensaje: `No se pudo editar la contraseña`,
          error: err,
        });
      } else {
        res.json({
          estado: true,
          mensaje: `La contraseña fue modificada correctamente`,
          docs: docs,
        });
      }
    }
  );
}

// Exportando todas las rutas
module.exports = {
  verUser,
  verUserId,
  signUp,
  signIn,
  signDelete,
  signUpdate,
};
