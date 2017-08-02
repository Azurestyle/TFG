$(function(){

  //funcion ajax para eliminar parada

  $('#tbl-parada #btn-eliminar').click(function(e) {
    e.preventDefault();
    var elemento = $(this);
    var id = elemento.parent().parent().find('#id').text();

    var confirmar = confirm('¿Desea eliminar la parada?')

    if(confirmar){
      $.ajax({
        url : '/eliminarParada',
        method : 'post',
        data : {idparada : id},
        success : function(res){
            if(res.res){
              elemento.parent().parent().remove();
            }
        }
      });
    }

  });


});
