const express = require("express");
const mongoose = require("mongoose");
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
} = require("./controllers/user");
const bodyParser = require("body-parser");
const RateLimit = require('express-rate-limit');
require("dotenv").config();
const { isAuth, isAuthSecret } = require("./middlewares/auth");

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// set up rate limiter: maximum of five requests per minute
var limiter = RateLimit({
  windowMs: 1*60*1000, // 1 minute
  max: 1000
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

// Carpeta estatica para tener el css y js
app.use(express.static(__dirname + `/public`));

// llamando ruta de ver la informacion de la pelicula
app.use("/api/verPelis", routerVer);

// llamando ruta de agregar nuevas peliculas
app.use("/api/crearPelis", routerCrear);

// apply rate limiter to all requests
// llamando ruta de eliminar peliculas
app.use("/api/eliminarPelis", routerDelete, limiter);

// apply rate limiter to all requests
// llamado ruta de modificar peliculas
app.use("/api/modificarPelis", routerModificar, limiter);

// LOS ENDPOINT para los usuarios logeados

// llamando ruta para ver los usuarios que sean creados, sin su contraseña
app.get("/api/user/verUser", isAuth, verUser);

// llamando ruta para ver el usuario por id
app.get("/api/user/verUserId/:id", isAuth, verUserId);

// llamando ruta para crear tu usuario para octener tu token propio
app.post("/api/user/crearUser", isAuthSecret, signUp);

// llamando ruta para logearte a ver si tienes una cuenta creada
app.post("/api/user/loginUser", signIn);

// Llamando ruta para modificar las contraseña de los usuarios
app.patch("/api/user/modificarUser/:id", isAuthSecret, signUpdate);

// llamando ruta para eliminar los usuario que se crear su token
app.delete("/api/user/deleteUser/:id", isAuthSecret, signDelete);

// pagina para cuando no se encuentre los datos de las paginas
app.use((req, res, next) => {
  res.status(404).render(`404`);
});

// Activar servidor web
app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Servidor puesto en servicio en la puerto ${process.env.PORT || 3000}`
  );
});
