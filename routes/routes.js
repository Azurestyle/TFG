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

//rutas para monitor
router.get('/monitor', controllers.monitorcontroller.getMonitor);
router.get('/nuevoMonitor', controllers.monitorcontroller.getNuevoMonitor);
router.post('/crearMonitor', controllers.monitorcontroller.postNuevoMonitor);
router.post('/eliminarMonitor', controllers.monitorcontroller.eliminarMonitor);
router.get('/modificarMonitor/:idmonitor', controllers.monitorcontroller.getModificarMonitor);
router.post('/editarMonitor', controllers.monitorcontroller.postModificarMonitor);

//rutas para ruta
router.get('/ruta', controllers.rutacontroller.getRuta);
router.get('/nuevaRuta', controllers.rutacontroller.getNuevaRuta);
router.post('/crearRuta', controllers.rutacontroller.postNuevoRuta);
router.post('/eliminarRuta', controllers.rutacontroller.eliminarRuta);
router.get('/modificarRuta/:idruta', controllers.rutacontroller.getModificarRuta);
router.post('/editarRuta', controllers.rutacontroller.postModificarRuta);
router.post('/enviarMail', controllers.rutacontroller.enviarMail);

//rutas para matriculado
router.get('/matriculado', controllers.matriculadocontroller.getMatriculado);
router.get('/nuevoMatriculado', controllers.matriculadocontroller.getNuevoMatriculado);
router.post('/crearMatriculado', controllers.matriculadocontroller.postNuevoMatriculado);
router.post('/eliminarMatriculado', controllers.matriculadocontroller.eliminarMatriculado);
router.get('/modificarMatriculado/:idmatriculado', controllers.matriculadocontroller.getModificarMatriculado);
router.post('/editarMatriculado', controllers.matriculadocontroller.postModificarMatriculado);


module.exports = router;
