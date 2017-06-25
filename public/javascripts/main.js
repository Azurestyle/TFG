$(function(){
  $('.message .close').click(function() {
    /* Act on the event */
    $(this).closest('.message').fadeOut();
  });

});
