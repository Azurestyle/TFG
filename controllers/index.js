
var fs = require('fs');
var path = require('path');

var files = fs.readdirSync(__dirname);

//Recorre esta carpeta y recarga de manera asincrona los controladores

files.forEach(function(file){

    var fileName = path.basename(file, '.js');
    
    if(fileName !== 'index'){
      exports[fileName] = require('./'+ fileName);
    }

})
