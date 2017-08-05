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


function myFunction() {
var input, filter, table, tr, td, i;
input = document.getElementById("filtro");
// console.log(input);
filter = input.value.toUpperCase();
table = document.getElementById("tbl-monitor");
tr = table.getElementsByTagName("tr");
console.log(tr)
for (i = 0; i < tr.length; i++) {
  td = tr[i].getElementsByTagName("td")[1];
  if (td) {
    if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
}
}

function myFunction2() {
var input, filter, table, tr, td, i;
input = document.getElementById("filtroMail");
// console.log(input);
filter = input.value.toUpperCase();
table = document.getElementById("tbl-monitor");
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
