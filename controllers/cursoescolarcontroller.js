var mysql = require('mysql');
var dateFormat = require('dateformat');
//cursoescolar controller

module.exports = {

  //funciones del controladores
  getCursoescolar : function(req, res, next){
    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();

    var cursoescolar = null;
    db.query('SELECT * FROM cursoescolar', function(err, rows, fields){
        if(err) throw err;
        cursoescolar = rows;
        // console.log(cursoescolar);
        db.end();
        //renderizamos la vista cursoescolar.jade y le pasamos atributo cursoescolar que son las rows
        res.render('cursoescolar/cursoescolar', {cursoescolar : cursoescolar});
    });
  },

  getNuevoCursoescolar : function(req, res, next){

    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();

    db.query('SELECT * from cursoescolar', function(err, rows, fields){
        if(err) throw err;
        var cursoescolar = rows;
        // console.log(cursoescolar)
        db.end();
        res.render('cursoescolar/nuevoCursoescolar', {cursoescolar : cursoescolar});

    });

  },

  postNuevoCursoescolar : function(req, res, next){


    console.log(req.body)

    var cursoescolar = {
      nombrecurso : req.body.nombrecurso,
      clase : req.body.clase

    }

    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();
    db.query('INSERT INTO cursoescolar SET ?', cursoescolar, function(err,rows,fields){
      if(err) throw err;
      db.end();
    });
    res.render('cursoescolar/nuevoCursoescolar', {info : 'Cursoescolar creado correctamente', cursoescolar : cursoescolar});
    // console.log(cursoescolar);
},
  eliminarCursoescolar : function(req, res, next){
      var id = req.body.idcursoescolar;
      var config = require('.././database/config');
      var db = mysql.createConnection(config);
      db.connect();
      var respuesta = {res: false};
      db.query('DELETE FROM cursoescolar WHERE idcursoescolar = ?', id, function(err,rows,fields){
        if(err) throw err;

        db.end();
        respuesta.res = true;
        res.json(respuesta);
      });

  },

  getModificarCursoescolar : function(req, res, next){
    var id = req.params.idcursoescolar;
    var config = require('.././database/config');
    console.log(req.params);
    var db = mysql.createConnection(config);

    db.connect();

    var cursoescolar = null;
    console.log(id);
    db.query('SELECT * FROM cursoescolar where idcursoescolar = ?',id,function(err,rows,fields){
      if(err) throw err;

      var cursoescolar = rows;
      console.log(cursoescolar);
      db.end();
      res.render('cursoescolar/modificarCursoescolar', {cursoescolar: cursoescolar});


    });
  },

  postModificarCursoescolar : function(req, res, next){
    //recuperar cursoescolar
    var cursoescolar = {
      nombrecurso : req.body.nombrecurso,
      clase : req.body.clase
    };

    // console.log(cursoescolar)
    var config = require('.././database/config');

    var db = mysql.createConnection(config);

    db.connect();
    db.query('UPDATE cursoescolar SET ? WHERE ?',[cursoescolar, {idcursoescolar : req.body.idcursoescolar}], function(err,rows,fields){
      if(err) throw err;
      db.end();
    });
    // res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.redirect('/cursoescolar');


  }


}
