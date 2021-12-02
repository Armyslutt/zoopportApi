const router = require("express").Router();

const apiRolRouter = require("./api/rol");
const apiSolicitudAdopcionRouter = require("./api/solicitudAdopcion");
const apiUsuariosRouter = require("./api/usuarios");
const apiUsuarioRolRouter = require("./api/usuarioRol");
const apiCredencialesRouter = require("./api/credenciales");
const apiTipoDocRouter = require("./api/tipoDoc");
const apiPaisRouter = require("./api/pais");
const apiCiudadRouter = require("./api/ciudad");
const apiTipoArticuloDonado = require("./api/TipoArticuloDonadoRoute");
const apiArticuloDonado = require("./api/ArticuloDonadoRoute");
const apiSolicitudDonacionEspecie = require("./api/SolicitudDonacionEspecieRoute");
const apiMetodoDePagoRouter = require("./api/MetodoDePagoRoute");
const apiDonacionEconomica = require("./api/DonacionEconomicaRoute");
const apiTipoAnimalRouter = require("./api/tipoAnimal");
const apiTratamientoRouter = require("./api/tratamiento");
const apiEnfermedadRouter = require("./api/enfermedad");
const apiAnimalRouter = require("./api/animal");
const apiSedeRouter = require("./api/sede");
const apiCitaRouter = require("./api/cita");

const middleware = require("./middelwares/middelwares");
const verifyUser = require("./middelwares/verifyUser");

//modulo Usuario
router.use("/rol", /* middleware.checkToken, */ apiRolRouter);
router.use(
  "/usuarios",
  /* middleware.checkToken, */
  /* verifyUser.checkUser, */ apiUsuariosRouter
);
router.use(
  "/usuarioRol",
  /* middleware.checkToken, verifyUser.checkUser, */ apiUsuarioRolRouter
);

router.use("/tipodoc", /* middleware.checkToken, */ apiTipoDocRouter);

router.use("/pais", /* middleware.checkToken, */ apiPaisRouter);
router.use("/ciudad", /* middleware.checkToken, */ apiCiudadRouter);


router.use(
  "/tipoArticuloDonado",
  /* middleware.checkToken, */ apiTipoArticuloDonado
);
router.use("/articuloDonado", /* middleware.checkToken, */ apiArticuloDonado);
router.use(
  "/solicitudDonacionEspecie",
  middleware.checkToken, apiSolicitudDonacionEspecie
);
router.use("/metodoDePago", /* middleware.checkToken, */ apiMetodoDePagoRouter);
router.use(
  "/donacionEconomica",
  /* middleware.checkToken, */ apiDonacionEconomica
);

router.use(
  "/solicitudAdopcion",
  /* middleware.checkToken, */ apiSolicitudAdopcionRouter
);
router.use("/tipoAnimal", /* middleware.checkToken, */ apiTipoAnimalRouter);

router.use("/tratamiento", /* middleware.checkToken, */ apiTratamientoRouter);

router.use("/enfermedad", /* middleware.checkToken, */ apiEnfermedadRouter);
router.use("/animal", /* middleware.checkToken, */ apiAnimalRouter);
router.use("/sede", /* middleware.checkToken, */ apiSedeRouter);
router.use("/cita", /* middleware.checkToken, */ apiCitaRouter);

//credenciales
router.use("/credenciales", apiCredencialesRouter);

module.exports = router;
