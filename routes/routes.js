var express = require('express');
var router = express.Router();
// exporto funciones de controller/index.js
var controllers = require('.././controllers');

/* GET home page. */
//llamo a home controller y a la funcion index
router.get('/', controllers.homecontroller.index);

//rutas para autobus
router.get('/autobus', controllers.autobuscontroller.getAutobus);
router.get('/nuevo', controllers.autobuscontroller.getNuevoAutobus);
router.post('/crearautobus', controllers.autobuscontroller.postNuevoAutobus);

module.exports = router;
