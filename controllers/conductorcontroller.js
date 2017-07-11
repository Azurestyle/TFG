var mysql = require('mysql');
var dateFormat = require('dateformat');
//autobus controller

module.exports = {

  //funciones del controladores
  getConductor : function(req, res, next){
    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();

    var conductor = null;
    db.query('SELECT * FROM conductor', function(err, rows, fields){
        if(err) throw err;
        conductor = rows;
        // console.log(conductor);
        db.end();
        //renderizamos la vista conductor.jade y le pasamos atributo conductor que son las rows
        res.render('conductor/conductor', {conductor : conductor});
    });
  },

  getNuevoConductor : function(req, res, next){

    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();

    db.query('SELECT * from conductor', function(err, rows, fields){
        if(err) throw err;
        var conductor = rows;
        // console.log(conductor)
        db.end();
        res.render('conductor/nuevoConductor', {conductor : conductor});

    });

  },

  postNuevoConductor : function(req, res, next){


    console.log(req.body)

    var conductor = {
      nombreConductor : req.body.nombreConductor,
      telefonoConductor : req.body.telefonoConductor
    }

    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();
    db.query('INSERT INTO conductor SET ?', conductor, function(err,rows,fields){
      if(err) throw err;
      db.end();
    });
    res.render('conductor/nuevoConductor', {info : 'conductor creado correctamente', conductor : conductor});
    // console.log(conductor);
},
  eliminarConductor : function(req, res, next){
      var id = req.body.idconductor;
      var config = require('.././database/config');
      var db = mysql.createConnection(config);
      db.connect();
      var respuesta = {res: false};
      db.query('DELETE FROM conductor WHERE idconductor = ?', id, function(err,rows,fields){
        if(err) throw err;

        db.end();
        respuesta.res = true;
        res.json(respuesta);
      });

  },

  getModificarConductor : function(req, res, next){
    var id = req.params.idconductor;
    var config = require('.././database/config');
    console.log(req.params);
    var db = mysql.createConnection(config);

    db.connect();

    var conductor = null;
    console.log(id);
    db.query('SELECT * FROM conductor where idconductor = ?',id,function(err,rows,fields){
      if(err) throw err;

      var conductor = rows;
      console.log(conductor);
      db.end();
      res.render('conductor/modificarConductor', {conductor: conductor});


    });
  },

  postModificarConductor : function(req, res, next){
    //recuperar conductor
    var conductor = {
      nombreConductor : req.body.nombreConductor,
      telefonoConductor : req.body.telefonoConductor
    };

    // console.log(conductor)
    var config = require('.././database/config');

    var db = mysql.createConnection(config);

    db.connect();
    db.query('UPDATE conductor SET ? WHERE ?',[conductor, {idconductor : req.body.idconductor}], function(err,rows,fields){
      if(err) throw err;
      db.end();
    });
    // res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.redirect('/conductor');


  }


}
