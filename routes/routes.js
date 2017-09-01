var express = require('express');
var router = express.Router();
// exporto funciones de controller/index.js
var controllers = require('.././controllers');
var express=require("express");
var multer= require("multer");
var upload= multer({dest:"uploads/"});


//llamo a home controller y a la funcion index
router.get('/', controllers.login.login);
// router.post('/gestion', controllers.login.login);
router.get('/gestion', controllers.homecontroller.index);
router.get('/publica', controllers.homecontroller.publica);
router.post('/publica_matriculado', controllers.homecontroller.publica_matriculado);


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
router.post('/enviarNotificacion', controllers.matriculadocontroller.enviarNotificacion);

//rutas para rutaIda
router.get('/rutaIda', controllers.rutaIdacontroller.getRutaIda);
router.get('/nuevaRutaIda', controllers.rutaIdacontroller.getNuevaRutaIda);
router.post('/crearRutaIda', controllers.rutaIdacontroller.postNuevoRutaIda);
router.post('/eliminarRutaIda', controllers.rutaIdacontroller.eliminarRutaIda);
router.get('/modificarRutaIda/:idrutaIda', controllers.rutaIdacontroller.getModificarRutaIda);
router.post('/editarRutaIda', controllers.rutaIdacontroller.postModificarRutaIda);


//rutas para rutaVuelta
router.get('/rutavuelta', controllers.rutaVueltacontroller.getRutaVuelta);
router.get('/nuevaRutaVuelta', controllers.rutaVueltacontroller.getNuevaRutaVuelta);
router.post('/crearRutaVuelta', controllers.rutaVueltacontroller.postNuevoRutaVuelta);
router.post('/eliminarRutaVuelta', controllers.rutaVueltacontroller.eliminarRutaVuelta);
router.get('/modificarRutaVuelta/:idrutaVuelta', controllers.rutaVueltacontroller.getModificarRutaVuelta);
router.post('/editarRutaVuelta', controllers.rutaVueltacontroller.postModificarRutaVuelta);

//rutas para cursoescolar
router.get('/cursoescolar', controllers.cursoescolarcontroller.getCursoescolar);
router.get('/nuevoCursoescolar', controllers.cursoescolarcontroller.getNuevoCursoescolar);
router.post('/crearCursoescolar', controllers.cursoescolarcontroller.postNuevoCursoescolar);
router.post('/eliminarCursoescolar', controllers.cursoescolarcontroller.eliminarCursoescolar);
router.get('/modificarCursoescolar/:idcursoescolar', controllers.cursoescolarcontroller.getModificarCursoescolar);
router.post('/editarCursoescolar', controllers.cursoescolarcontroller.postModificarCursoescolar);

//rutas para pariente
router.get('/pariente', controllers.parientecontroller.getPariente);
router.get('/nuevoPariente', controllers.parientecontroller.getNuevoPariente);
router.post('/crearPariente', upload.single('foto'), controllers.parientecontroller.postNuevoPariente);
router.post('/eliminarPariente', controllers.parientecontroller.eliminarPariente);
router.get('/modificarPariente/:idpariente', controllers.parientecontroller.getModificarPariente);
router.post('/editarPariente',upload.single('foto'), controllers.parientecontroller.postModificarPariente);


//rutas para parada
router.get('/parada', controllers.paradacontroller.getParada);
router.get('/nuevaParada', controllers.paradacontroller.getNuevaParada);
router.post('/crearParada', controllers.paradacontroller.postNuevoParada);
router.post('/eliminarParada', controllers.paradacontroller.eliminarParada);
router.get('/modificarParada/:idparada', controllers.paradacontroller.getModificarParada);
router.post('/editarParada', controllers.paradacontroller.postModificarParada);


module.exports = router;
