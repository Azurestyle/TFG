$(function(){

  //funcion ajax para eliminar autobús

  $('#tbl-pariente #btn-eliminar').click(function(e) {
    e.preventDefault();
    var elemento = $(this);
    var id = elemento.parent().parent().find('#id').text();

    var confirmar = confirm('¿Desea eliminar al pariente?')

    if(confirmar){
      $.ajax({
        url : '/eliminarPariente',
        method : 'post',
        data : {idpariente : id},
        success : function(res){
            if(res.res){
              elemento.parent().parent().remove();
            }
        }
      });
    }

  });
});
