$(function(){

  //funcion ajax para eliminar autobús

  $('#tbl-cursoescolar #btn-eliminar').click(function(e) {
    e.preventDefault();
    var elemento = $(this);
    var id = elemento.parent().parent().find('#id').text();

    var confirmar = confirm('¿Desea eliminar el curso?')

    if(confirmar){
      $.ajax({
        url : '/eliminarCursoescolar',
        method : 'post',
        data : {idcursoescolar : id},
        success : function(res){
            if(res.res){
              elemento.parent().parent().remove();
            }
        }
      });
    }

  });
});
