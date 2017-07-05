$(function(){

  //funcion ajax para eliminar autobús

  $('#tbl-autobus #btn-eliminar').click(function(e) {
    e.preventDefault();
    var elemento = $(this);
    var id = elemento.parent().parent().find('#id').text();

    var confirmar = confirm('¿Desea eliminar el autobus?')

    if(confirmar){
      $.ajax({
        url : '/eliminarautobus',
        method : 'post',
        data : {id : id},
        success : function(res){
            if(res.res){
              elemento.parent().parent().remove();
            }
        }
      });
    }

  });
});
