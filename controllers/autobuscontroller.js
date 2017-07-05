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
},
  eliminarAutobus : function(req, res, next){
      var id = req.body.id;
      var config = require('.././database/config');
      var db = mysql.createConnection(config);
      db.connect();
      var respuesta = {res: false};
      db.query('DELETE FROM autobus WHERE id = ?', id, function(err,rows,fields){
        if(err) throw err;

        db.end();
        respuesta.res = true;
        res.json(respuesta);
      });

  },

  getModificarAutobus : function(req, res, next){
    var id = req.params.id;
    var config = require('.././database/config');

    var db = mysql.createConnection(config);

    db.connect();

    var autobus = null;

    db.query('SELECT * FROM autobus where id = ?',id,function(err,rows,fields){
      if(err) throw err;

      autobus = rows;
      db.end();
      res.render('autobus/modificar', {autobus: autobus});
    });
  },

  postModificarAutobus : function(req, res, next){
    //recuperar autobus
    var autobus = {
      matricula : req.body.matricula,
      idruta : req.body.idruta,
      capacidad : req.body.capacidad,
      idconductor : req.body.idconductor,
      idmonitor : req.body.idmonitor
    };
    var config = require('.././database/config');

    var db = mysql.createConnection(config);

    db.connect();
    db.query('UPDATE autobus SET ? WHERE ?',[autobus, {id : req.body.id}], function(err,rows,fields){
      if(err) throw err;
      db.end();
    });
    // res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.redirect('/autobus');


  }


}
