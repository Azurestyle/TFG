$(function(){

  //funcion ajax para eliminar autobús

  $('#tbl-monitor #btn-eliminar').click(function(e) {
    e.preventDefault();
    var elemento = $(this);
    var id = elemento.parent().parent().find('#id').text();

    var confirmar = confirm('¿Desea eliminar el monitor?')

    if(confirmar){
      $.ajax({
        url : '/eliminarMonitor',
        method : 'post',
        data : {idmonitor : id},
        success : function(res){
            if(res.res){
              elemento.parent().parent().remove();
            }
        }
      });
    }

  });
});
