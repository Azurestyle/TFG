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
    db.query('SELECT * FROM matriculado m, cursoescolar c, ruta r where m.idruta = r.idruta and m.idcursoescolar = c.idcursoescolar ', function(err, rows, fields){
        if(err) throw err;
        var matriculado = rows;
        // console.log(matriculado);

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

            db.end();
            res.render('matriculado/nuevoMatriculado', {cursoescolar : cursoescolar, ruta : ruta});


        });
    });

  },

  postNuevoMatriculado : function(req, res, next){


    var matriculado = {
      primer_nombre : req.body.primer_nombre,
      segundonombre : req.body.segundonombre,
      apellidopaterno : req.body.apellidopaterno,
      idruta : req.body.idruta,
      idcursoescolar : req.body.idcursoescolar,
      estado : req.body.estado,
      rutaIda : req.body.rutaIda,
      rutaVuelta : req.body.rutaVuelta
    };
    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();
    db.query('INSERT INTO matriculado SET ?', matriculado, function(err,rows,fields){
      if(err) throw err;
      db.end();
    });
    res.render('matriculado/nuevoMatriculado', {info : 'Matriculado creado correctamente', ruta : matriculado.idruta, cursoescolar : matriculado.idcursoescolar, rutaIda : matriculado.idrutaIda, rutaVuelta : matriculado.idrutaVuelta});
    // console.log(matriculado);
},
  eliminarMatriculado : function(req, res, next){
      var id = req.body.id;
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

    db.query('SELECT * FROM matriculado m, ruta r, cursoescolar c  where m.idmatriculado = ? and m.idruta=r.idruta and m.idcursoescolar = c.idcursoescolar',id,function(err,rows,fields){
      if(err) throw err;

      var matriculado = rows;

      db.query('SELECT * from cursoescolar', function(err, rows, fields){
          if(err) throw err;
          var cursoescolar = rows;
          // console.log(matriculado);

          db.query('SELECT * from ruta;', function(err, rows, fields){
              if(err) throw err;
              var ruta = rows;
              // console.log(matriculado)
              // console.log(matriculado[0].idruta)
              // console.log(matriculado[0].nombreRuta)

              db.end();
              res.render('matriculado/modificarMatriculado', {matriculado: matriculado, ruta:ruta, cursoescolar:cursoescolar});


            });
        });

    });
  },

  postModificarMatriculado : function(req, res, next){
    //recuperar matriculado
    var matriculado = {
      primer_nombre : req.body.primer_nombre,
      segundonombre : req.body.segundonombre,
      apellidopaterno : req.body.apellidopaterno,
      idruta : req.body.idruta,
      idcursoescolar : req.body.idcursoescolar,
      estado : req.body.estado,
      rutaIda : req.body.rutaIda,
      rutaVuelta : req.body.rutaVuelta
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


  }


}
