  $(document)
    .ready(function() {
      $('.ui.form')
        .form({
          fields: {
            email: {
              identifier  : 'email',
              rules: [
                {
                  type   : 'empty',
                  prompt : 'Por favor escribe tu usuario'
                },
                {
                  type   : 'is',
                  value : 'administrador',
                  prompt : 'Usuario incorrecto'
                }
              ]
            },
            password: {
              identifier  : 'password',
              rules: [
                {
                  type   : 'empty',
                  prompt : 'Por favor escribe tu contraseña'
                },
                {
                  type   : 'length[6]',
                  prompt : 'Your password must be at least 6 characters',

                },
                {
                  type : 'is',
                  value   : "administrador",
                  prompt : 'Contraseña incorrecta',

                }
              ]
            }
          }
        })
      ;
    })
  ;
