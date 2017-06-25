
//home controller

module.exports = {

  //funciones del controladores
  index : function(req, res, next){
    res.render('index', {title : 'Bienvenido al crud'});
  }

}
