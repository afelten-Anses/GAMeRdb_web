// activer dropdown
$('.ui.dropdown').dropdown(); 
// activer fermeture des boites de message
$('.message .close')
  .on('click', function() {
    $(this)
      .closest('.message')
      .transition('fade')
    ;
  })