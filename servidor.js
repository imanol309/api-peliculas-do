const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { router } = require("./router/paginaPrincipal");
const { routerOne } = require("./router/mascotas");
const { routerTwo } = require("./router/crear")
const bodyParser = require('body-parser')
require('dotenv').config()


// Motor de plantilla
app.set(`view engine`, `ejs`);
app.set(`views`, __dirname + `/views`);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

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

//llamando mis rutas
app.use("/", router);

//llamando mis rutas de crear nuevas mascotas
app.use('/crearMascota',routerTwo)


// llamando mis rutas de mascotas
// app.use("/crearMascota", routerOne);




// pagina para cuando no se encuentre los datos de las paginas
app.use((req, res, next) => {
  res.status(404).render(`404`);
});

// Activar servidor web
app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor puesto en servicio en la puerto ${process.env.PORT || 3000}`);
});
