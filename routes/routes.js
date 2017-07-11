var express = require('express');
var router = express.Router();
// exporto funciones de controller/index.js
var controllers = require('.././controllers');


//llamo a home controller y a la funcion index
router.get('/', controllers.homecontroller.index);

//rutas para autobus
router.get('/autobus', controllers.autobuscontroller.getAutobus);
router.get('/nuevo', controllers.autobuscontroller.getNuevoAutobus);
router.post('/crearautobus', controllers.autobuscontroller.postNuevoAutobus);
router.post('/eliminarautobus', controllers.autobuscontroller.eliminarAutobus);
router.get('/modificar/:id', controllers.autobuscontroller.getModificarAutobus);
router.post('/editar', controllers.autobuscontroller.postModificarAutobus);

//rutas para conductor
router.get('/conductor', controllers.conductorcontroller.getConductor);
router.get('/nuevoConductor', controllers.conductorcontroller.getNuevoConductor);
router.post('/crearConductor', controllers.conductorcontroller.postNuevoConductor);
router.post('/eliminarConductor', controllers.conductorcontroller.eliminarConductor);
router.get('/modificarConductor/:idconductor', controllers.conductorcontroller.getModificarConductor);
router.post('/editarConductor', controllers.conductorcontroller.postModificarConductor);


module.exports = router;
