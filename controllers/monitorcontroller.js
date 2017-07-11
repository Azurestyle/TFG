var mysql = require('mysql');
var dateFormat = require('dateformat');
//monitor controller

module.exports = {

  //funciones del controladores
  getMonitor : function(req, res, next){
    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();

    var monitor = null;
    db.query('SELECT * FROM monitor', function(err, rows, fields){
        if(err) throw err;
        monitor = rows;
        // console.log(monitor);
        db.end();
        //renderizamos la vista monitor.jade y le pasamos atributo monitor que son las rows
        res.render('monitor/monitor', {monitor : monitor});
    });
  },

  getNuevoMonitor : function(req, res, next){

    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();

    db.query('SELECT * from monitor', function(err, rows, fields){
        if(err) throw err;
        var monitor = rows;
        // console.log(monitor)
        db.end();
        res.render('monitor/nuevoMonitor', {monitor : monitor});

    });

  },

  postNuevoMonitor : function(req, res, next){


    console.log(req.body)

    var monitor = {
      nombreMonitor : req.body.nombreMonitor,
      email : req.body.email,
      telefonoMonitor : req.body.telefonoMonitor
    }

    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();
    db.query('INSERT INTO monitor SET ?', monitor, function(err,rows,fields){
      if(err) throw err;
      db.end();
    });
    res.render('monitor/nuevoMonitor', {info : 'Monitor creado correctamente', monitor : monitor});
    // console.log(monitor);
},
  eliminarMonitor : function(req, res, next){
      var id = req.body.idmonitor;
      var config = require('.././database/config');
      var db = mysql.createConnection(config);
      db.connect();
      var respuesta = {res: false};
      db.query('DELETE FROM monitor WHERE idmonitor = ?', id, function(err,rows,fields){
        if(err) throw err;

        db.end();
        respuesta.res = true;
        res.json(respuesta);
      });

  },

  getModificarMonitor : function(req, res, next){
    var id = req.params.idmonitor;
    var config = require('.././database/config');
    console.log(req.params);
    var db = mysql.createConnection(config);

    db.connect();

    var monitor = null;
    console.log(id);
    db.query('SELECT * FROM monitor where idmonitor = ?',id,function(err,rows,fields){
      if(err) throw err;

      var monitor = rows;
      console.log(monitor);
      db.end();
      res.render('monitor/modificarMonitor', {monitor: monitor});


    });
  },

  postModificarMonitor : function(req, res, next){
    //recuperar monitor
    var monitor = {
      nombreMonitor : req.body.nombreMonitor,
      email : req.body.email,
      telefonoMonitor : req.body.telefonoMonitor
    };

    // console.log(monitor)
    var config = require('.././database/config');

    var db = mysql.createConnection(config);

    db.connect();
    db.query('UPDATE monitor SET ? WHERE ?',[monitor, {idmonitor : req.body.idmonitor}], function(err,rows,fields){
      if(err) throw err;
      db.end();
    });
    // res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.redirect('/monitor');


  }


}
