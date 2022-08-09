const express = require("express");
const mongoose = require("mongoose");
const morgan =  require("morgan")
const app = express();
const { routerVer } = require("./router/verPelis");
const { routerModificar } = require("./router/modificarPelis");
const { routerCrear } = require("./router/crearPelis");
const { routerDelete } = require("./router/eliminarPelis");
const {
  signUp,
  signIn,
  signDelete,
  verUser,
  verUserId,
  signUpdate,
  addMovieToMyList,
  DeleteMyList,
} = require("./controllers/user");
const bodyParser = require("body-parser");
const RateLimit = require("express-rate-limit");
require("dotenv").config();
const { isAuth, isAuthSecret } = require("./middlewares/auth");
const cors = require("cors");

// using the cors package to be able to configure who can make requests for this api
app.use(cors());

// Usando morgan para ver todas peticiones que hace mi servidor
app.use(morgan('dev'))

// set up rate limiter: maximum of five requests per minute
var limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 2000,
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// conectar con una base de datos con mongoDB
mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`base de datos conectada`))
  .catch((e) => console.log(`error en la base de datos`, e));

// Carpeta estatica para ver la pagina principal 
app.use(express.static(__dirname + `/public`));

// llamando ruta de ver la informacion de la pelicula
app.use("/api/verPelis", routerVer);

// llamando ruta de agregar nuevas peliculas
app.use("/api/crearPelis", routerCrear);

// llamando ruta de eliminar peliculas
app.use("/api/eliminarPelis", routerDelete, limiter);

// llamado ruta de modificar peliculas
app.use("/api/modificarPelis", routerModificar);

// LOS ENDPOINT para los usuarios logeados

// llamando ruta para ver los usuarios que sean creados, sin su contraseña
app.get("/api/user/verUser", isAuthSecret, verUser);

// llamando ruta para ver el usuario por id
app.get("/api/user/verUserId/:id", isAuthSecret, verUserId);

// llamando ruta para crear tu usuario para octener tu token propio
app.post("/api/user/crearUser", signUp);

// llamando ruta para crear una nueva pelicula en tu lista
app.post("/api/user/addMovieList/:id", addMovieToMyList);

// llamando ruta para logearte a ver si tienes una cuenta creada
app.post("/api/user/loginUser", signIn);

// Llamando ruta para modificar las contraseña de los usuarios
app.patch("/api/user/modificarUser/:id", isAuthSecret, signUpdate);

// llamando ruta para eliminar los usuario que se crear su token
app.delete("/api/user/deleteUser/:id", isAuthSecret, signDelete);

// llamando ruta para eliminar las pelicula de tu lista de favorito
app.put("/api/user/deleteaddMovieList/:id", DeleteMyList);

// Pagina para cuando no se encuentre los datos de las paginas
app.use((req, res, next) => {
  res.status(404).render(`404`);
});

// Activar servidor web
app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Servidor puesto en servicio en la puerto ${process.env.PORT || 3000}`
  );
});
