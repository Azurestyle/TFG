$(function(){
  $('.message .close').click(function() {
    /* Act on the event */
    $(this).closest('.message').fadeOut();
  });
  $('.ui.dropdown')
  .dropdown()
;

$('.ui.accordion')
  .accordion()
;

$('#desplegar').click(function(event) {
  $('#menuDesplegable').sidebar('toggle');
});

});
