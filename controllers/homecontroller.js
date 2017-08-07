var mysql = require('mysql');
//home controller

module.exports = {

  //funciones del controladores
  index : function(req, res, next){
    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();

    var cursoescolar = null;
    db.query('SELECT * FROM autobus', function(err, rows, fields){
        if(err) throw err;
        autobus = rows.length;
        db.query('SELECT * from pariente', function(err, rows, fields){
            if(err) throw err;
            var pariente = rows.length;

            db.query('SELECT * from matriculado', function(err, rows, fields){
                if(err) throw err;
                var matriculado = rows.length;

                db.query('SELECT * from conductor', function(err, rows, fields){
                    if(err) throw err;
                    var conductor = rows.length;

                    db.query('SELECT * from monitor', function(err, rows, fields){
                        if(err) throw err;
                        var monitor = rows.length;

                        db.query('SELECT * from ruta', function(err, rows, fields){
                            if(err) throw err;
                            var ruta = rows.length;

                            db.query('SELECT * from parada', function(err, rows, fields){
                                if(err) throw err;
                                var parada = rows.length;

                                db.query('SELECT * from cursoescolar', function(err, rows, fields){
                                    if(err) throw err;
                                    var cursoescolar = rows.length;
        // console.log(autobus);
        db.end();
    res.render('index', {title : 'Autobús CP', autobus: autobus, pariente: pariente, matriculado:matriculado, conductor:conductor, monitor : monitor, ruta:ruta, parada:parada, cursoescolar:cursoescolar  });
      });
        });
          });
          });
          });
          });
          });
          });
  }

}
