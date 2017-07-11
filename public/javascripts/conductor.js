$(function(){

  //funcion ajax para eliminar autobús

  $('#tbl-conductor #btn-eliminar').click(function(e) {
    e.preventDefault();
    var elemento = $(this);
    var id = elemento.parent().parent().find('#id').text();

    var confirmar = confirm('¿Desea eliminar el conductor?')

    if(confirmar){
      $.ajax({
        url : '/eliminarConductor',
        method : 'post',
        data : {idconductor : id},
        success : function(res){
            if(res.res){
              elemento.parent().parent().remove();
            }
        }
      });
    }

  });
});
