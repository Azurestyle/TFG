var mysql = require('mysql');
var dateFormat = require('dateformat');
//rutaIda controller

module.exports = {

  //funciones del controladores
  getRutaIda : function(req, res, next){
    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();

    var rutaIda = null;
    db.query('SELECT * FROM rutaIda', function(err, rows, fields){
        if(err) throw err;
        rutaIda = rows;
        // console.log(rutaIda);
        db.end();
        //renderizamos la vista rutaIda.jade y le pasamos atributo rutaIda que son las rows
        res.render('rutaIda/rutaIda', {rutaIda : rutaIda});
    });
  },

  getNuevaRutaIda : function(req, res, next){

    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();

    db.query('SELECT * from rutaIda', function(err, rows, fields){
        if(err) throw err;
        var rutaIda = rows;
        // console.log(rutaIda)
        db.end();
        res.render('rutaIda/nuevaRutaIda', {rutaIda : rutaIda});

    });

  },

  postNuevoRutaIda : function(req, res, next){


    console.log(req.body)

    var rutaIda = {
      nombreRutaIda : req.body.nombreRutaIda,
      numParadasIda : req.body.numParadasIda

    }

    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();
    db.query('INSERT INTO rutaIda SET ?', rutaIda, function(err,rows,fields){
      if(err) throw err;
      db.end();
    });
    res.render('rutaIda/nuevaRutaIda', {info : 'Ruta de Ida creada correctamente', rutaIda : rutaIda});
    // console.log(rutaIda);
},
  eliminarRutaIda : function(req, res, next){
      var id = req.body.idrutaIda;
      var config = require('.././database/config');
      var db = mysql.createConnection(config);
      db.connect();
      var respuesta = {res: false};
      db.query('DELETE FROM rutaIda WHERE idrutaIda = ?', id, function(err,rows,fields){
        if(err) throw err;

        db.end();
        respuesta.res = true;
        res.json(respuesta);
      });

  },

  getModificarRutaIda : function(req, res, next){
    var id = req.params.idrutaIda;
    var config = require('.././database/config');
    console.log(req.params);
    var db = mysql.createConnection(config);

    db.connect();

    var rutaIda = null;
    console.log(id);
    db.query('SELECT * FROM rutaIda where idrutaIda = ?',id,function(err,rows,fields){
      if(err) throw err;

      var rutaIda = rows;
      console.log(rutaIda);
      db.end();
      res.render('rutaIda/modificarRutaIda', {rutaIda: rutaIda});


    });
  },

  postModificarRutaIda : function(req, res, next){
    //recuperar rutaIda
    var rutaIda = {
      nombreRutaIda : req.body.nombreRutaIda,
      numParadasIda : req.body.numParadasIda
      
    };

    // console.log(rutaIda)
    var config = require('.././database/config');

    var db = mysql.createConnection(config);

    db.connect();
    db.query('UPDATE rutaIda SET ? WHERE ?',[rutaIda, {idrutaIda : req.body.idrutaIda}], function(err,rows,fields){
      if(err) throw err;
      db.end();
    });
    // res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.redirect('/rutaIda');


  }


}
