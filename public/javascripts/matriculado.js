$(function(){

  //funcion ajax para eliminar autobús

  $('#tbl-matriculado #btn-eliminar').click(function(e) {
    e.preventDefault();
    var elemento = $(this);
    var id = elemento.parent().parent().find('#id').text();

    var confirmar = confirm('¿Desea eliminar el autobus?')

    if(confirmar){
      $.ajax({
        url : '/eliminarmatriculado',
        method : 'post',
        data : {idmatriculado : id},
        success : function(res){
            if(res.res){
              elemento.parent().parent().remove();
            }
        }
      });
    }

  });



  $('#tbl-matriculado #estado').click(function(e) {
    e.preventDefault();
    var elemento = $(this);
    var id = elemento.parent().parent().find('#id').text();


    var confirmar = confirm('¿Desea mandar una notificación de Telegram a los padres de los alumnos?')

    if(confirmar){
      $.ajax({
        url : '/enviarNotificacion',
        method : 'post',
        data : {idmatriculado : id},
        success : function(res){
            if(res.res){
              alert("Notificacion mandanda correctamente");
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
table = document.getElementById("tbl-matriculado");
tr = table.getElementsByTagName("tr");
console.log(tr)
for (i = 0; i < tr.length; i++) {
  td = tr[i].getElementsByTagName("td")[5];
  if (td) {
    if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
}
}

function remote_connection() {
  var rexec = require('remote-exec');

  console.log(rexec);
  var connection_options = {
      port: 22,
      username: 'root',
      privateKey: require('fs').readFileSync('C:/Users/Usuario/Desktop/rsa_id'),
      passphrase: 'patata'
  };

  var hosts = [
      '172.17.0.3'
  ];

  var cmds = [
      'ls -l',
      'cat /etc/hosts'
  ];

  try {
      ;
  }
  catch(err) {
      document.getElementById("tbl-matriculado").innerHTML = err.message;
  rexec(hosts, cmds, connection_options, function(err){
      if (err) {
          console.log(err);
      } else {
          console.log('Great Success!!');
      }
  });
}
