//DataTables initialisation
$(document).ready(function() {
	var table = $('#table_id').DataTable( {
    columnDefs: [ {
    	orderable: false,
    	className: 'select-checkbox',
    	targets: 0
    }],
    select: {
    	style: 'os',
    	selector: 'td:first-child'
    },
    lengthChange: false,
    buttons: ['selectAll', 'copy', 'excel', 'pdf', 'colvis' , 'pageLength']
});
	table.buttons().container()
	.appendTo( $('div.eight.column:eq(0)', table.table().container()));
});
// Turn on dropdown
$('.ui.dropdown').dropdown(); 
// Turn on accordion effect
$('.ui.accordion').accordion(); 
// Turn on tab effect
$('.menu .item').tab(); 
// Turn on closable message boxes and "fade" closing transition
$('.message .close')
.on('click', function() {
	$(this)
	.closest('.message')
	.transition('fade')
	;
})
var filesList=new Array(); //FORM 1 : Nom des fichiers
$('.ui.dropdown').dropdown(); // activer dropdown effect
$('.ui.accordion').accordion(); // activer accordion effect
$('.menu .item').tab(); // activer tab effect
//activer modal effect au clic
$("#helpme").click(function(){
    $('.longer.modal').modal('show');
});
//fermer modal effect au clic
$("#cancel").click(function(){
    $('.longer.modal').modal('hide');
});
//fermer les messages a la demande
$('.message .close')
    .on('click', function() {
    $(this)
        .closest('.message')
        .transition('fade')
    ;
})
;