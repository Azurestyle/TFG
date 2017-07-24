var mysql = require('mysql');
var dateFormat = require('dateformat');
var multer= require("multer");
var storage = multer.diskStorage({
   destination: function(req, file, callback) {
       callback(null, 'uploads/')
},
   filename: function(req, file, callback) {
       callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
}
});
//pariente controller

module.exports = {

  //funciones del controladores
  getPariente : function(req, res, next){
    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();

    var pariente = null;
    db.query('SELECT * FROM pariente p, matriculado m where p.idmatriculado = m.idmatriculado', function(err, rows, fields){
        if(err) throw err;
        pariente = rows;
        // console.log(pariente);
        db.end();
        //renderizamos la vista pariente.jade y le pasamos atributo pariente que son las rows
        res.render('pariente/pariente', {pariente : pariente});
    });
  },

  getNuevoPariente : function(req, res, next){

    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();

    db.query('SELECT * from matriculado;', function(err, rows, fields){
        if(err) throw err;
        var matriculado = rows;




    db.query('SELECT * from pariente;', function(err, rows, fields){
        if(err) throw err;
        var pariente = rows;

        db.end();
        res.render('pariente/nuevoPariente', {pariente : pariente, matriculado : matriculado});


    });
    });

  },

  postNuevoPariente : function(req, res, next){

    var pariente = {
      nombre : req.body.nombre,
      foto : req.body.foto,
      idmatriculado : req.body.idmatriculado,
      email : req.body.email,
      telefono : req.body.telefono

    };
    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();
    db.query('INSERT INTO pariente SET ?', pariente, function(err,rows,fields){
      if(err) throw err;
      db.end();
    });
    res.render('pariente/nuevoPariente', {info : 'Pariente creado correctamente', matriculado : pariente.idmatriculado});
    // console.log(pariente);
},
  eliminarPariente : function(req, res, next){
      var id = req.body.idpariente;
      var config = require('.././database/config');
      var db = mysql.createConnection(config);
      db.connect();
      var respuesta = {res: false};
      db.query('DELETE FROM pariente WHERE idpariente = ?', id, function(err,rows,fields){
        if(err) throw err;

        db.end();
        respuesta.res = true;
        res.json(respuesta);
      });

  },

  getModificarPariente : function(req, res, next){
    var id = req.params.idpariente;
    var config = require('.././database/config');

    var db = mysql.createConnection(config);

    db.connect();

    var pariente = null;

    db.query('SELECT * FROM pariente p, matriculado m where p.idpariente = ? and p.idmatriculado = m.idmatriculado ',id,function(err,rows,fields){
      if(err) throw err;

      var pariente = rows;

      db.query('SELECT * from matriculado', function(err, rows, fields){
          if(err) throw err;
          var matriculado = rows;


              // console.log(autobus);
      db.end();
      res.render('pariente/modificarPariente', {pariente: pariente, matriculado : matriculado});

      });
    });
  },

  postModificarPariente : function(req, res, next){
    //recuperar pariente
    var pariente = {
      nombre : req.body.nombre,
      foto : req.file.filename,
      idmatriculado : req.body.idmatriculado,
      email : req.body.email,
      telefono : req.body.telefono

    };
    console.log(req.body);
    console.log(pariente);
    console.log(req.file);
    // var upload = multer({storage: storage}).single('foto');

    var config = require('.././database/config');

    var db = mysql.createConnection(config);

    db.connect();
    db.query('UPDATE pariente SET ? WHERE ?',[pariente, {idpariente : req.body.idpariente}], function(err,rows,fields){
      if(err) throw err;
      db.end();
    });
    // res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.redirect('/pariente');


  }



}
