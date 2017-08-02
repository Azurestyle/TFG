var mysql = require('mysql');
var dateFormat = require('dateformat');
//parada controller

module.exports = {

  //funciones del controladores
  getParada : function(req, res, next){
    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();

    var parada = null;
    db.query('SELECT * FROM parada p, ruta r, rutaida r2, rutavuelta r3 where p.idruta = r.idruta and p.idrutaIda = r2.idrutaIda and p.idrutaVuelta = r3.idrutaVuelta', function(err, rows, fields){
        if(err) throw err;
        parada = rows;
        console.log(parada);
        db.end();
        //renderizamos la vista parada.jade y le pasamos atributo parada que son las rows
        res.render('parada/parada', {parada : parada});
    });
  },

  getNuevaParada : function(req, res, next){

    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();

    db.query('SELECT * from rutaida;', function(err, rows, fields){
        if(err) throw err;
        var rutaida = rows;

        db.query('SELECT * from rutavuelta;', function(err, rows, fields){
            if(err) throw err;
            var rutavuelta = rows;

            db.query('SELECT * from ruta;', function(err, rows, fields){
                if(err) throw err;
                var ruta = rows;


    db.query('SELECT * from parada;', function(err, rows, fields){
        if(err) throw err;
        var parada = rows;

        db.end();
        res.render('parada/nuevaParada', {parada : parada, rutaida : rutaida, rutavuelta : rutavuelta, ruta : ruta});

    });
    });
    });
    });

  },

  postNuevoParada : function(req, res, next){

    var parada = {
      nombreParada : req.body.nombreParada,
      idruta : req.body.idruta,
      idrutaIda : req.body.idrutaIda,
      idrutaVuelta : req.body.idrutaVuelta,
      tiempoparada : req.body.tiempoparada,
      coordenadas : req.body.coordenadas,
      horaIdaLlegada : req.body.horaIdaLlegada,
      horaIdaSalida : req.body.horaIdaSalida,
      horaVueltaLlegada : req.body.horaVueltaLlegada,
      horaVueltaSalida : req.body.horaVueltaSalida

    };
    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();
    db.query('INSERT INTO parada SET ?', parada, function(err,rows,fields){
      if(err) throw err;
      db.end();
    });
    res.render('parada/nuevaParada', {info : 'Parada creada correctamente', rutaida : parada.idrutaIda, rutavuelta : parada.idrutaVuelta, ruta : parada.idruta});
    // console.log(parada);
},
  eliminarParada : function(req, res, next){
      var id = req.body.idparada;
      var config = require('.././database/config');
      var db = mysql.createConnection(config);
      db.connect();
      var respuesta = {res: false};
      db.query('DELETE FROM parada WHERE idparada = ?', id, function(err,rows,fields){
        if(err) throw err;

        db.end();
        respuesta.res = true;
        res.json(respuesta);
      });

  },

  getModificarParada : function(req, res, next){
    var id = req.params.idparada;
    var config = require('.././database/config');

    var db = mysql.createConnection(config);

    db.connect();

    var parada = null;

    db.query('SELECT * FROM parada p, ruta r, rutaida r2, rutavuelta r3 where p.idruta = r.idruta and p.idparada = ? and p.idrutaIda = r2.idrutaIda and p.idrutaVuelta = r3.idrutaVuelta ',id,function(err,rows,fields){
      if(err) throw err;

      var parada = rows;

      db.query('SELECT * from rutaida', function(err, rows, fields){
          if(err) throw err;
          var rutaida = rows;

          db.query('SELECT * from rutavuelta', function(err, rows, fields){
              if(err) throw err;
              var rutavuelta = rows;
              // console.log(autobus);
              db.query('SELECT * from ruta', function(err, rows, fields){
                  if(err) throw err;
                  var ruta = rows;
      db.end();
      res.render('parada/modificarParada', {parada: parada, rutaida : rutaida, rutavuelta : rutavuelta, ruta : ruta});
      });
      });
      });
    });
  },

  postModificarParada : function(req, res, next){
    //recuperar parada
    var parada = {
      nombreParada : req.body.nombreParada,
      idruta : req.body.idruta,
      idrutaIda : req.body.idrutaIda,
      idrutaVuelta : req.body.idrutaVuelta,
      tiempoparada : req.body.tiempoparada,
      coordenadas : req.body.coordenadas,
      horaIdaLlegada : req.body.horaIdaLlegada,
      horaIdaSalida : req.body.horaIdaSalida,
      horaVueltaLlegada : req.body.horaVueltaLlegada,
      horaVueltaSalida : req.body.horaVueltaSalida

    };


    // console.log(parada);
    // console.log(req.body);
    var config = require('.././database/config');

    var db = mysql.createConnection(config);

    db.connect();
    db.query('UPDATE parada SET ? WHERE ?',[parada, {idparada : req.body.idparada}], function(err,rows,fields){
      if(err) throw err;
      db.end();
    });
    // res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.redirect('/parada');


  },

}
