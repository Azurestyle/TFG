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
    db.query('SELECT * FROM autobus a,conductor c, monitor m, ruta r where a.idconductor = c.idconductor and a.idmonitor = m.idmonitor and a.idruta = r.idruta', function(err, rows, fields){
        if(err) throw err;
        autobus = rows;
        // console.log(autobus);
        db.end();
        //renderizamos la vista autobus.jade y le pasamos atributo autobus que son las rows
        res.render('autobus/autobus', {autobus : autobus});
    });
  },

  getNuevoAutobus : function(req, res, next){

    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();

    db.query('SELECT * from conductor', function(err, rows, fields){
        if(err) throw err;
        var conductor = rows;
        // console.log(autobus);

        db.query('SELECT * from monitor;', function(err, rows, fields){
            if(err) throw err;
            var monitor = rows;

            db.query('SELECT * from ruta;', function(err, rows, fields){
                if(err) throw err;
                var ruta = rows;
                // console.log(monitor);
                // console.log(conductor);
                // console.log(ruta);
                db.end();
                res.render('autobus/nuevo', {monitor : monitor, conductor : conductor, ruta : ruta});
            });

        });
    });

  },

  postNuevoAutobus : function(req, res, next){
    var fechaactual = new Date();
    var fecha = dateFormat(fechaactual, 'yyyy-mm-dd h:MM:ss');
    console.log(req.body)

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
    res.render('autobus/nuevo', {info : 'Autobus creado correctamente', ruta : autobus.idruta, monitor : autobus.idmonitor, conductor : autobus.idconductor});
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

    db.query('SELECT * FROM autobus a, conductor c, monitor m, ruta r where a.id = ? and a.idruta=r.idruta and a.idmonitor = m.idmonitor and a.idconductor = c.idconductor ',id,function(err,rows,fields){
      if(err) throw err;

      var autobus = rows;

      db.query('SELECT * from conductor', function(err, rows, fields){
          if(err) throw err;
          var conductor = rows;
          // console.log(autobus);

          db.query('SELECT * from monitor;', function(err, rows, fields){
              if(err) throw err;
              var monitor = rows;

              db.query('SELECT * from ruta;', function(err, rows, fields){
                  if(err) throw err;
                  var ruta = rows;
                  // console.log(autobus)
                  // console.log(autobus[0].idruta)
                  // console.log(autobus[0].nombreRuta)

                  db.end();
                  res.render('autobus/modificar', {autobus: autobus, ruta:ruta, monitor:monitor, conductor:conductor});
                });

            });
        });

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
    // console.log(autobus)
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
