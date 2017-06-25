var mysql = require('mysql');

//autobus controller

module.exports = {

  //funciones del controladores
  getAutobus : function(req, res, next){
    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();

    var autobus = null;
    db.query('SELECT * FROM autobus', function(err, rows, fields){
        if(err) throw err;
        autobus = rows;
        db.end();
        //renderizamos la vista autobus.jade y le pasamos atributo autobus que son las rows
        res.render('autobus/autobus', {autobus : autobus});
    });
  },

  getNuevoAutobus : function(req, res, next){
    res.render('autobus/nuevo');

  },

  postNuevoAutobus : function(req, res, next){
    console.log(req.body);

}
}
