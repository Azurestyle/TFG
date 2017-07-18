$(function(){

  //funcion ajax para eliminar ruta Vuelta

  $('#tbl-rutaVuelta #btn-eliminar').click(function(e) {
    e.preventDefault();
    var elemento = $(this);
    var id = elemento.parent().parent().find('#id').text();

    var confirmar = confirm('¿Desea eliminar la ruta de ida?')

    if(confirmar){
      $.ajax({
        url : '/eliminarRutaVuelta',
        method : 'post',
        data : {idrutaVuelta : id},
        success : function(res){
            if(res.res){
              elemento.parent().parent().remove();
            }
        }
      });
    }

  });
});
