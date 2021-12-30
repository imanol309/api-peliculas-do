const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { routerVer } = require("./router/verPelis");
const { routerModificar } = require("./router/modificarPelis");
const { routerCrear } = require("./router/crearPelis");
const { routerDelete } = require("./router/eliminarPelis");
const { routerCrearUser } = require("./controllers/user");
const { isAuth } = require("./middlewares/auth");
const { signUp, signIn } = require("./controllers/user");
const bodyParser = require("body-parser");
require("dotenv").config();

// Motor de plantilla
app.set(`view engine`, `ejs`);
app.set(`views`, __dirname + `/views`);

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

//llamando ruta de ver la informacion de la pelicula
app.use("/verPelis", routerVer);

//llamando ruta de agregar nuevas peliculas
app.use("/crearPelis", routerCrear);

// llamando ruta de eliminar peliculas
app.use("/eliminarPelis", routerDelete);

//llamado ruta de modificar peliculas
app.use("/modificarPelis", routerModificar);

//llamando ruta para crear tu usuario para octener tu token propio
app.post("/crearUser", signUp);

// llamando ruta para logearte a ver si tienes una cuenta creada
app.post("/loginUser", signIn);

//Ruta principal html
app.use("/", (req, res) => {
  res.render(`index`);
});

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
