$(function(){

  //funcion ajax para eliminar autobús

  $('#tbl-rutaIda #btn-eliminar').click(function(e) {
    e.preventDefault();
    var elemento = $(this);
    var id = elemento.parent().parent().find('#id').text();

    var confirmar = confirm('¿Desea eliminar la ruta de ida?')

    if(confirmar){
      $.ajax({
        url : '/eliminarRutaIda',
        method : 'post',
        data : {idrutaIda : id},
        success : function(res){
            if(res.res){
              elemento.parent().parent().remove();
            }
        }
      });
    }

  });
});
