$(function(){

  //funcion ajax para eliminar ruta

  $('#tbl-ruta #btn-eliminar').click(function(e) {
    e.preventDefault();
    var elemento = $(this);
    var id = elemento.parent().parent().find('#id').text();

    var confirmar = confirm('¿Desea eliminar la ruta?')

    if(confirmar){
      $.ajax({
        url : '/eliminarRuta',
        method : 'post',
        data : {idruta : id},
        success : function(res){
            if(res.res){
              elemento.parent().parent().remove();
            }
        }
      });
    }

  });
});
