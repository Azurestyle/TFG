var mysql = require('mysql');
var dateFormat = require('dateformat');
//autobus controller

module.exports = {

  //funciones del controladores
  getAutobus : function(req, res, next){
    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();

    var autobus = null;
    db.query('SELECT * FROM autobus', function(err, rows, fields){
        if(err) throw err;
        autobus = rows;
        db.end();
        //renderizamos la vista autobus.jade y le pasamos atributo autobus que son las rows
        res.render('autobus/autobus', {autobus : autobus});
    });
  },

  getNuevoAutobus : function(req, res, next){
    res.render('autobus/nuevo');

  },

  postNuevoAutobus : function(req, res, next){
    var fechaactual = new Date();
    var fecha = dateFormat(fechaactual, 'yyyy-mm-dd h:MM:ss');

    var autobus = {
      matricula : req.body.matricula,
      idruta : req.body.idruta,
      capacidad : req.body.capacidad,
      idconductor : req.body.idconductor,
      idmonitor : req.body.idmonitor
    }
    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();
    db.query('INSERT INTO autobus SET ?', autobus, function(err,rows,fields){
      if(err) throw err;
      db.end();
    });
    res.render('autobus/nuevo', {info : 'Autobus creado correctamente'});
    // console.log(autobus);
}
}
