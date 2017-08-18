var mysql = require('mysql');
//home controller

module.exports = {

  //funciones del controladores
  login : function(req, res, next){
    // var config = require('.././database/config');
    // var db = mysql.createConnection(config);
    // db.connect();
    //
    //
    //
    //     db.end();
    res.render('login', {title : 'Autobús CP' });


  },

  publica : function(req, res, next){

    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();
    db.query('SELECT * from ruta;', function(err, rows, fields){
        if(err) throw err;
        var ruta = rows;

    db.end();
    res.render('publica', {title : 'Autobús CP', ruta:ruta});

    });

  }

}
