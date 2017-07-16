var mysql = require('mysql');
var dateFormat = require('dateformat');
//ruta controller

module.exports = {

  //funciones del controladores
  getRuta : function(req, res, next){
    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();

    var ruta = null;
    db.query('SELECT * FROM ruta r, rutaida r2, rutavuelta r3 where r.idrutaIda = r2.idrutaIda and r.idrutaVuelta = r3.idrutaVuelta', function(err, rows, fields){
        if(err) throw err;
        ruta = rows;
        console.log(ruta);
        db.end();
        //renderizamos la vista ruta.jade y le pasamos atributo ruta que son las rows
        res.render('ruta/ruta', {ruta : ruta});
    });
  },

  getNuevaRuta : function(req, res, next){

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

        db.end();
        res.render('ruta/nuevaRuta', {ruta : ruta, rutaida : rutaida, rutavuelta : rutavuelta});

    });
    });
    });

  },

  postNuevoRuta : function(req, res, next){

    var ruta = {
      nombreRuta : req.body.nombreRuta,
      numParadas : req.body.numParadas,
      idrutaIda : req.body.idrutaIda,
      idrutaVuelta : req.body.idrutaVuelta

    };
    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();
    db.query('INSERT INTO ruta SET ?', ruta, function(err,rows,fields){
      if(err) throw err;
      db.end();
    });
    res.render('ruta/nuevaRuta', {info : 'Ruta creada correctamente', rutaida : ruta.idrutaIda, rutavuelta : ruta.idrutaVuelta});
    // console.log(ruta);
},
  eliminarRuta : function(req, res, next){
      var id = req.body.idruta;
      var config = require('.././database/config');
      var db = mysql.createConnection(config);
      db.connect();
      var respuesta = {res: false};
      db.query('DELETE FROM ruta WHERE idruta = ?', id, function(err,rows,fields){
        if(err) throw err;

        db.end();
        respuesta.res = true;
        res.json(respuesta);
      });

  },

  getModificarRuta : function(req, res, next){
    var id = req.params.idruta;
    var config = require('.././database/config');

    var db = mysql.createConnection(config);

    db.connect();

    var ruta = null;

    db.query('SELECT * FROM ruta r, rutaida r2, rutavuelta r3 where r.idruta = ? and r.idrutaIda = r2.idrutaIda and r.idrutaVuelta = r3.idrutaVuelta ',id,function(err,rows,fields){
      if(err) throw err;

      var ruta = rows;

      db.query('SELECT * from rutaida', function(err, rows, fields){
          if(err) throw err;
          var rutaida = rows;

          db.query('SELECT * from rutavuelta', function(err, rows, fields){
              if(err) throw err;
              var rutavuelta = rows;
              // console.log(autobus);
      db.end();
      res.render('ruta/modificarRuta', {ruta: ruta, rutaida : rutaida, rutavuelta : rutavuelta});
      });
      });
    });
  },

  postModificarRuta : function(req, res, next){
    //recuperar ruta
    var ruta = {
      nombreRuta : req.body.nombreRuta,
      numParadas : req.body.numParadas,
      idrutaIda : req.body.idrutaIda,
      idrutaVuelta : req.body.idrutaVuelta

    };


    console.log(ruta);
    console.log(req.body);
    var config = require('.././database/config');

    var db = mysql.createConnection(config);

    db.connect();
    db.query('UPDATE ruta SET ? WHERE ?',[ruta, {idruta : req.body.idruta}], function(err,rows,fields){
      if(err) throw err;
      db.end();
    });
    // res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.redirect('/ruta');


  },

  enviarMail : function(req, res, next){
      var id = req.body.idruta;
      // console.log(id)
      // console.log(req.body);
      var config = require('.././database/config');
      var db = mysql.createConnection(config);
      db.connect();
      var respuesta = {res: false};
      db.query('SELECT p.email, r.nombreRuta, m.primer_nombre FROM ruta r, matriculado m, pariente p WHERE r.idruta = ? AND r.idruta = m.idruta AND m.idmatriculado = p.idmatriculado', id, function(err,rows,fields){
        if(err) throw err;
        db.end();
        var nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: 'aplicacionautobustfg@gmail.com',
            pass: 'manolo17'
          }
        });
        for (row in rows) {


        var mailOptions = {
          from: 'AplicacionAutobus',
          to: rows[row].email,
          subject: 'Atasco en la ruta '+rows[row].nombreRuta,
          text: 'Hola, le informo de que el autobús que lleva al alumno '+rows[row].primer_nombre+' se ha retrasado debido a un atasco, disculpe las molestias.'
        };
        transporter.sendMail(mailOptions, function(error, info){
          if (error){
            console.log(error);
            res.send(500, err.message);
          } else {
            console.log("Email Enviado");
            res.status(200).jsonp(req.body);
          }
        });

        }
        respuesta.res = true;
        res.json(respuesta);

      });
    // console.log(ruta.email);

  },


}
