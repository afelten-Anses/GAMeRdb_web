//------------------------------------------------//
//          SemanticUI JS initialisation          //
//------------------------------------------------//
// Turn on dropdown
$('.ui.dropdown').dropdown(); 
// Turn on accordion effect
$('.ui.accordion').accordion(); 
// Turn on tab effect
$('.menu .item').tab(); 
// Turn on closable message boxes and "fade" closing transition
$('.message .close').on('click', function() 
{
    $(this)
    .closest('.message')
    .transition('fade')
});
$("#helpme").click(function()
{
    $('.longer.modal').modal({
    inverted: false
  }).modal('show');
});
//fermer modal effect au clic
$("#cancel").click(function()
{
    $('.longer.modal').modal('hide');
});
//fermer les messages a la demande
$('.message .close').on('click', function()
{
    $(this)
    .closest('.message')
    .transition('fade')
});
// Preview MultiQC au clic
$("#multiqc").click(function()
{
    $('#multiQC').modal('show');
});

$('.ui.sticky')
.sticky({
    offset : 80, // adjust all values so that content does not overlap any content between the top of the browser and the specified value
    bottomOffset: 20 // same for the bottom of the browser
});
//embed videos
$('.ui.embed').embed();



//------------------------------------------------//
//              Other JS functions                //
//------------------------------------------------//

//Generate uuids
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


//-------------------------------------------------//
// DataTables initialisation and behavior settings //
//-------------------------------------------------//
$(document).ready(function() { 
	var table = $('#table_id').DataTable( 
    {
        data: data,
        columns: 
        [   
            { data: 'ReferenceID' , "title": "Strain"},
			{ data: 'Accession_number' , "title": "Accession number"},
			{ data: 'Phylogeny.Subspecies' , "title": "Subspecies"},
            { data: 'Phylogeny.Serovar' , "title": "Serovar", "defaultContent": "-"},
			{ data: 'Phylogeny.SequenceType' , "title": "ST", "defaultContent": "-"},
            { data: 'ZIPpath', "title": " Archive"},
        ],
        columnDefs: 
        [   
            {
                "targets": 0,
                orderable: true,
                "data": "link",
                "render": function ( data, type, row, meta ) 
                {
                    return '<b>'+data+'</b>';
                }
            },
            {
                "targets": 5,
                orderable: false,
                "data": "link",
                "render": function ( data, type, row, meta ) 
                {
                    return '<a href="'+data+'" download>zip</a>';
                }
            }
        ],
        //"scrollX": true, // Vertically scrollable table
        select: 
            {
    	       style: 'os',
            },
        lengthChange: false, // do not display second lengthMenu button (used in order to add "show all" option in pageLength)
        colReorder: true,
        lengthMenu: [
            [ 10, 25, 50, -1 ],
            [ 'Show 10 rows', 'Show 25 rows', 'Show 50 rows', 'Show all rows' ]
        ],
        language: {
            search: 'Search: <span class="ui input">_INPUT_</span>'
            },
        buttons:[
                    //Redefine selectAll in order to be able to select all after a table filtration
                    {
                        extend: 'selectAll',
                        className: 'selectall',
                        action : function(e) {
                            e.preventDefault();
                            table.rows({page:'current'}).deselect();
                            table.rows({page:'current'}).select();
                        }
                    },
                    //copy button : export only STRAIN ID
                    { 
                        extend: 'copyHtml5', header : false , messageBottom:false,text: 'Copy ids',title:'',exportOptions: {columns: 0, orthogonal: 'fullNotes'}
                    },
                    //excel button : export only colums containing text metadatas (not links to files)
                    { 
                        extend: 'excel', text: 'Excel', messageBottom:false, exportOptions: {columns: [0,1,2,3]}
                    },
                    //pdf button : eexport only colums containing text metadatas (not links to files), at a landscape format (useful in order to do not crop table)
                    {
                        extend: 'pdfHtml5', orientation: 'landscape', pageSize: 'LEGAL', messageBottom:false, exportOptions: {columns: [0,1,2,3]}
                    },
                    //column visibility button
                    {
                        extend:  'colvis' , text: 'Columns'
                    },
                    //Show x rows button:  no config --> no {'extend',..}
                    'pageLength'
                    /*{
                        // Launch download on click
                        text: 'Download',action: function () 
                        {
                            //SERVER SIDE zip and download    /                   
                        }
                    }*/
                ]   
    });
    //Append content to DataTable
	table.buttons().container().appendTo( $('div.eight.column:eq(0)', table.table().container()));
    
    //-------------------------------------------------------------------------------------//
    // FROM HERE : everything that need to be declared/used after DataTatables processing  //
    //-------------------------------------------------------------------------------------//
     // Download files selected in DataTables
    $('#dtDownload').click(function(){
        let selectedRadios=$('.selected'); // contains <labels> from selected radio checkboxes
        // If there is no lines selected, show warning message
        if (selectedRadios.length===0) {
            //alert('Please select which kind of files you want to download (bottom section : download settings)')
            $('.small.modal.pleaseselect').modal('show')
        } else {
            // CLIENT SIDE zip and download
            const currentDate = new Date(Date.now()).toLocaleString();
            const count = table.rows( { selected: true } ).count(); // number of selected rows
            let toDownload=[];
            let zip = new JSZip();
            // Generate a directory within the Zip file structure  
            let allfiles = zip.folder();
            // Add an top-level, arbitrary text file with content
            allfiles.file("Readme.txt", "Reference genomes downloaded from GAMeR genomic database at : "+currentDate); 
            for (let i=0 ; i<count ; i ++){
                toDownload.push(table.rows( { selected: true } ).data({ selected: true })[i].ZIPpath);
            }
            let dldata=[];
            let promise=[];
            for (let i=0 ; i<count ; i ++){
                dldata[i]=toDownload[i]
                //Init download in a promise
                promise[i] = $.get({url: dldata[i],
                                    async:false}
                                   );
                // Add a file to the directory, in this case an image with data URI as contents
                allfiles.file(dldata[i],promise[i]);
                console.log(dldata[i])                
            }                
            // Generate the zip file asynchronously
            console.log("generateAsync")
            allfiles.generateAsync({
                type: "blob",
                compression: "STORE",
                streamFiles:true,
            })
                .then(function(blob) {
                // Launch download
                saveAs(blob, "Salmonella_references.zip");
            });     
        }    
    });  
});
