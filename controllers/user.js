const { UserNew } = require("../models/EstructuraDeBD");
const { createToken } = require("../services/token");
const bcryptjs = require("bcryptjs");
const { ObjectId } = require("mongodb");

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

//Ruta para crear un usuario nuevo
async function signUp(req, res) {
  const passwordNormal = req.body.password;
  const user = new UserNew({
    email: req.body.email,
    name: req.body.name,
    password: await bcryptjs.hash(passwordNormal, 8),
    logo: req.body.logo,
  });

  await user.save((err, datos) => {
    if (err) {
      res.status(500).send({ message: `Error al crear el usuario ${err}` });
    }

    return res.status(200).send({ mensaje: "Cuenta creada correctamente", Datos: datos });
  });
}

//Ruta para agregar una nueva pelicula a la lista de pelicula favoritas
async function addMovieToMyList(req, res) {
  const id = req.params.id;
  const moviesNew = {
    _id: req.body._id,
    titulo: req.body.titulo,
    genero: req.body.genero,
    Director: req.body.Director,
    year: req.body.year,
    Reparto: req.body.Reparto,
    img: req.body.img,
    video: req.body.video,
    time: req.body.time,
    descripcion: req.body.descripcion,
  };

  UserNew.findByIdAndUpdate(
    {_id: id},
    { $addToSet: { favoriteMovies: moviesNew } },
    {new: true},
    (err, user) => {
      if (err) {
        res.status(500).send({ message: `Error al agregar una pelicula a tu lista de favorita ${err}` });
      }
      return res
        .status(200)
        .send({ mensaje: "Pelicula agregda con exito", moviesNew: user });
    }
  );
}

// Ruta para eliminar las peliculas de mi lista de favoritos
async function DeleteMyList(req, res) {
  await UserNew.findByIdAndUpdate(
    { _id: req.params.id},
    { $pull: { favoriteMovies: { _id: req.body.id } } },
    {new: true},
    (err, user) => {
      if (err) {
        res.status(500).send({ message: `Error al crear el usuario ${err}` });
      }
      return res
        .status(200)
        .send({ mensaje: "Pelicula eliminada con exito", moviesNew: user });
    }
  );
}

// Ruta para ver si esta logeado en la api
async function signIn(req, res) {
  await UserNew.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res
        .status(500)
        .send({ message: "Hubo un error vuelve a intentarlo", error: err });
    }
    if (!user?.email) {
      return res.status(404).send({ message: "Tu usuario no existe en la BD" });
    }
    if (!bcryptjs.compareSync(req.body.password, user?.password)) {
      return res
        .status(404)
        .send({ message: "Tu contraseña no existe en la BD" });
    }

    res.status(200).send({
      message: "Te has logueado correctamente",
      DatosLogin: user,
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
        mensaje: `No eliminado`,
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
    {new: true},
    { useFindAndModify: false },
    function (err, docs) {
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
  addMovieToMyList,
  DeleteMyList,
};
