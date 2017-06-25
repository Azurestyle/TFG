$(function(){
  $('.form-nuevoautobus form').form({
      matricula : {
        identifier : 'matricula',
        rules : [
          {
            type : 'empty',
            prompt : 'Por favor ingrese una matrícula'
          }
        ]
      },
      idruta : {
        identifier : 'idruta',
        rules : [
          {
            type : 'empty',
            prompt : 'Por favor ingrese una ruta'
          }
        ]
      },
      capacidad : {
        identifier : 'capacidad',
        rules : [
          {
            type : 'empty',
            prompt : 'Por favor ingrese una capacidad'

          },
          {
            type: 'integer',
            prompt: 'La capacidad debe de ser número entero'
          }

        ]
      },
      idconductor : {
        identifier : 'idconductor',
        rules : [
          {
            type : 'empty',
            prompt : 'Por favor ingrese un conductor'
          }
        ]
      }

  });

});
