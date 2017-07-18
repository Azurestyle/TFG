var mysql = require('mysql');
var dateFormat = require('dateformat');
//rutaVuelta controller

module.exports = {

  //funciones del controladores
  getRutaVuelta : function(req, res, next){
    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();

    var rutaVuelta = null;
    db.query('SELECT * FROM rutaVuelta', function(err, rows, fields){
        if(err) throw err;
        rutaVuelta = rows;
        // console.log(rutaVuelta);
        db.end();
        //renderizamos la vista rutaVuelta.jade y le pasamos atributo rutaVuelta que son las rows
        res.render('rutaVuelta/rutaVuelta', {rutaVuelta : rutaVuelta});
    });
  },

  getNuevaRutaVuelta : function(req, res, next){

    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();

    db.query('SELECT * from rutaVuelta', function(err, rows, fields){
        if(err) throw err;
        var rutaVuelta = rows;
        // console.log(rutaVuelta)
        db.end();
        res.render('rutaVuelta/nuevaRutaVuelta', {rutaVuelta : rutaVuelta});

    });

  },

  postNuevoRutaVuelta : function(req, res, next){


    console.log(req.body)

    var rutaVuelta = {
      nombreRutaVuelta : req.body.nombreRutaVuelta,
      numParadasVuelta : req.body.numParadasVuelta

    }

    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();
    db.query('INSERT INTO rutaVuelta SET ?', rutaVuelta, function(err,rows,fields){
      if(err) throw err;
      db.end();
    });
    res.render('rutaVuelta/nuevaRutaVuelta', {info : 'Ruta de Vuelta creada correctamente', rutaVuelta : rutaVuelta});
    // console.log(rutaVuelta);
},
  eliminarRutaVuelta : function(req, res, next){
      var id = req.body.idrutaVuelta;
      var config = require('.././database/config');
      var db = mysql.createConnection(config);
      db.connect();
      var respuesta = {res: false};
      db.query('DELETE FROM rutaVuelta WHERE idrutaVuelta = ?', id, function(err,rows,fields){
        if(err) throw err;

        db.end();
        respuesta.res = true;
        res.json(respuesta);
      });

  },

  getModificarRutaVuelta : function(req, res, next){
    var id = req.params.idrutaVuelta;
    var config = require('.././database/config');
    console.log(req.params);
    var db = mysql.createConnection(config);

    db.connect();

    var rutaVuelta = null;
    console.log(id);
    db.query('SELECT * FROM rutaVuelta where idrutaVuelta = ?',id,function(err,rows,fields){
      if(err) throw err;

      var rutaVuelta = rows;
      console.log(rutaVuelta);
      db.end();
      res.render('rutaVuelta/modificarRutaVuelta', {rutaVuelta: rutaVuelta});


    });
  },

  postModificarRutaVuelta : function(req, res, next){
    //recuperar rutaVuelta
    var rutaVuelta = {
      nombreRutaVuelta : req.body.nombreRutaVuelta,
      numParadasVuelta : req.body.numParadasVuelta

    };

    // console.log(rutaVuelta)
    var config = require('.././database/config');

    var db = mysql.createConnection(config);

    db.connect();
    db.query('UPDATE rutaVuelta SET ? WHERE ?',[rutaVuelta, {idrutaVuelta : req.body.idrutaVuelta}], function(err,rows,fields){
      if(err) throw err;
      db.end();
    });
    // res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.redirect('/rutaVuelta');


  }


}
