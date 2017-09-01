var mysql = require('mysql');
var dateFormat = require('dateformat');
//matriculado controller

module.exports = {

  //funciones del controladores
  getMatriculado : function(req, res, next){
    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();

    var matriculado = null;
    db.query('SELECT * FROM matriculado m, cursoescolar c, ruta r, rutaida r2, rutavuelta r3 where m.idruta = r.idruta and m.idcursoescolar = c.idcursoescolar and m.rutaIda = r2.idrutaIda and m.rutaVuelta = r3.idrutaVuelta ', function(err, rows, fields){
        if(err) throw err;
        var matriculado = rows;
        console.log(matriculado);

        db.end();
    //renderizamos la vista matriculado.jade y le pasamos atributo matriculado que son las rows
        res.render('matriculado/matriculado', {matriculado : matriculado});

    });
  },

  getNuevoMatriculado : function(req, res, next){

    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();

    db.query('SELECT * from cursoescolar', function(err, rows, fields){
        if(err) throw err;
        var cursoescolar = rows;
        // console.log(matriculado);

        db.query('SELECT * from ruta;', function(err, rows, fields){
            if(err) throw err;
            var ruta = rows;

            db.query('SELECT * from rutaida;', function(err, rows, fields){
                if(err) throw err;
                var rutaida = rows;

                db.query('SELECT * from rutavuelta;', function(err, rows, fields){
                    if(err) throw err;
                    var rutavuelta = rows;
                    db.end();
                    res.render('matriculado/nuevoMatriculado', {cursoescolar : cursoescolar, ruta : ruta, rutaida : rutaida, rutavuelta : rutavuelta});

              });
              });
        });
    });

  },

  postNuevoMatriculado : function(req, res, next){


    var matriculado = {
      primer_nombre : req.body.primer_nombre,
      segundo_nombre : req.body.segundo_nombre,
      apellido_paterno : req.body.apellido_paterno,
      apellido_materno : req.body.apellido_materno,
      dni : req.body.dni,
      idruta : req.body.idruta,
      idcursoescolar : req.body.idcursoescolar,
      estado : req.body.estado,
      rutaIda : req.body.idrutaIda,
      rutaVuelta : req.body.idrutaVuelta
    };

    console.log(matriculado);
    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();
    db.query('INSERT INTO matriculado SET ?', matriculado, function(err,rows,fields){
      if(err) throw err;
      db.end();
    });
    res.render('matriculado/nuevoMatriculado', {info : 'Matriculado creado correctamente', ruta : matriculado.idruta, cursoescolar : matriculado.idcursoescolar, rutaida : matriculado.rutaIda, rutavuelta : matriculado.rutaVuelta});
    // console.log(matriculado);
},
  eliminarMatriculado : function(req, res, next){
      var id = req.body.idmatriculado;
      var config = require('.././database/config');
      var db = mysql.createConnection(config);
      db.connect();
      var respuesta = {res: false};
      db.query('DELETE FROM matriculado WHERE idmatriculado = ?', id, function(err,rows,fields){
        if(err) throw err;

        db.end();
        respuesta.res = true;
        res.json(respuesta);
      });

  },

  getModificarMatriculado : function(req, res, next){
    var id = req.params.idmatriculado;
    var config = require('.././database/config');

    var db = mysql.createConnection(config);

    db.connect();

    var matriculado = null;

    db.query('SELECT * FROM matriculado m, ruta r, cursoescolar c, rutaida r2, rutavuelta r3  where m.idmatriculado = ? and m.idruta=r.idruta and m.idcursoescolar = c.idcursoescolar and m.rutaIda = r2.idrutaIda and m.rutaVuelta = r3.idrutaVuelta',id,function(err,rows,fields){
      if(err) throw err;

      var matriculado = rows;

      db.query('SELECT * from cursoescolar', function(err, rows, fields){
          if(err) throw err;
          var cursoescolar = rows;
          // console.log(matriculado);

          db.query('SELECT * from ruta;', function(err, rows, fields){
              if(err) throw err;
              var ruta = rows;

              db.query('SELECT * from rutaida;', function(err, rows, fields){
                  if(err) throw err;
                  var rutaida = rows;
                  // console.log(matriculado)
                  // console.log(matriculado[0].idruta)
                  // console.log(matriculado[0].nombreRuta)

                  db.query('SELECT * from rutavuelta;', function(err, rows, fields){
                      if(err) throw err;
                      var rutavuelta = rows;
                      // console.log(matriculado)
                      // console.log(matriculado[0].idruta)
                      // console.log(matriculado[0].nombreRuta)

              db.end();
              res.render('matriculado/modificarMatriculado', {matriculado: matriculado, ruta : ruta, rutaida:rutaida, rutavuelta : rutavuelta, cursoescolar:cursoescolar});
                });
              });
            });
        });

    });
  },

  postModificarMatriculado : function(req, res, next){
    //recuperar matriculado
    var matriculado = {
      primer_nombre : req.body.primer_nombre,
      segundo_nombre : req.body.segundo_nombre,
      apellido_paterno : req.body.apellido_paterno,
      apellido_materno : req.body.apellido_materno,
      dni : req.body.dni,
      idruta : req.body.idruta,
      idcursoescolar : req.body.idcursoescolar,
      estado : req.body.estado,
      rutaIda : req.body.idrutaIda,
      rutaVuelta : req.body.idrutaVuelta
    };
    // console.log(matriculado)
    var config = require('.././database/config');

    var db = mysql.createConnection(config);

    db.connect();
    db.query('UPDATE matriculado SET ? WHERE ?',[matriculado, {idmatriculado : req.body.idmatriculado}], function(err,rows,fields){
      if(err) throw err;
      db.end();
    });
    // res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.redirect('/matriculado');


  },

  enviarNotificacion : function(req, res, next){
      var id = req.body.idmatriculado;

      var config = require('.././database/config');
      var db = mysql.createConnection(config);
      db.connect();
      var respuesta = {res: false};
      db.query('SELECT * FROM matriculado WHERE idmatriculado = ?', id, function(err,rows,fields){
        if(err) throw err;
        var matriculado = rows;
        db.query('SELECT * from pariente where idmatriculado = ?;', id, function(err, rows, fields){
            if(err) throw err;
            pariente = rows;
        db.end();


        var rexec = require('remote-exec');


        var connection_options = {
            port: 22,
            username: 'root',
            password: 'Dx1234!!'

        };

        var hosts = [
            '81.202.177.112'
        ];

        var cmds = [
            './script_telegram.sh '+ pariente[0].nombre + ' "' + "Estado de " + matriculado[0].primer_nombre + ": "
            + matriculado[0].estado + "." + " Compruebe nuestra aplicación para más información" + '"'
        ];

        rexec(hosts, cmds, connection_options, function(err){
            if (err) {
                console.log(err);
            } else {
                console.log('Envío Correcto');
            }
        });

        respuesta.res = true;
        res.json(respuesta);

      });
      });
    // console.log(ruta.email);

  }


}
