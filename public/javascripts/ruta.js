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

  $('#tbl-ruta #email').click(function(e) {
    e.preventDefault();
    var elemento = $(this);
    var id = elemento.parent().parent().find('#id').text();


    var confirmar = confirm('¿Desea mandar un aviso de atasco a los padres de los alumnos?')

    if(confirmar){
      $.ajax({
        url : '/enviarMail',
        method : 'post',
        data : {idruta : id},
        success : function(res){
            if(res.res){
              alert("Mail mandando correctamente");
            }
        }
      });
    }

  });


});


function myFunction() {
var input, filter, table, tr, td, i;
input = document.getElementById("filtro");
// console.log(input);
filter = input.value.toUpperCase();
table = document.getElementById("tbl-ruta");
tr = table.getElementsByTagName("tr");
console.log(tr)
for (i = 0; i < tr.length; i++) {
  td = tr[i].getElementsByTagName("td")[2];
  if (td) {
    if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
}
}
