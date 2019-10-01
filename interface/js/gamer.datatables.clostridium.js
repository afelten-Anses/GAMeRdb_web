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
            { data: 'SampleID' , "title": "Strain ID"},
            { data: 'Project' , "title": "Project"},
            { data: 'Reads.Center' , "title": "Center"},
            { data: 'Reads.FASTQC_pair1', "title": " Fastqc R1"},
            { data: 'Reads.FASTQC_pair2' , "title": "Fastqc R2"},
            { data: 'Contam.ContamStatus' , "title": "ContamStatus"},
            { data: 'Contam.NumContamSNVs' , "title": "NumContamSNVs"},
            { data: 'Contam.percentContam' , "title": "percentContam" },
            { data: 'Reads.FASTQ_pair1' , "title": "Normalized reads R1"},
            { data: 'Reads.FASTQ_pair2' , "title": "Normalized reads R2"},
            { data: 'Reads.VCF' , "title": "Variants"},
            { data: 'Genome.Contigs' , "title": "Contigs"},
            { data: 'Genome.Assembly' , "title": "Assembly"},
            { data: 'Genome.QUAST' , "title": "Assembly quality"},
            { data: 'Genome.GFF' , "title": "GFF"},
            { data: 'Genome.GBK' , "title": "GBK"},
            { data: 'Report' , "title": "ARTwork report"},
            { data: 'Report' , "title": "ARTwork HTML report"},
            { data: 'Reads.NbReads' , "title": "Number of reads"},
	    { data: 'Reads.BreadthCoverage' , "title": "Breadth coverage (%)"},
	    { data: 'Genome.N50' , "title": "N50"},
	    { data: 'Genome.NbContigs' , "title": "Number of contigs"},
	    { data: 'Genome.GenomeFraction' , "title": "Genome fraction (%)"},
	    { data: 'Genome.LargestContig' , "title": "Largest contig"},
	    { data: 'Genome.TotalLength' , "title": "Total assembly length"},
	    { data: 'Reads.RefSNP' , "title": "SNP reference"},
	    { data: 'Genome.RefScaffold' , "title": "Scaffolding reference"},
        { data: 'Gene.resfinder' , "title": "Antibiotic resistance"},
        { data: 'Gene.vfdb' , "title": "Virulence factors"}
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
                "targets":2,
                visible:false
            },
            {
                "targets": 3,
                orderable: false,
                "data": "link",
                "render": function ( data, type, row, meta ) 
                {
                    return '<a href="'+data+'" target="_blank" rel="noopener noreferrer">R1</a>';
                }
            },
            {
                "targets":4,
                orderable: false,
                "data": "link",
                "render": function ( data, type, row, meta ) 
                {
                    return '<a href="'+data+'" target="_blank" rel="noopener noreferrer">R2</a>';
                }
            },
            {
                "targets":6,
                visible:false
            },
            {
                "targets":7,
                visible:false
            },
            {
                "targets":8,
                orderable: false,
		visible:false,
                "data": "download_link",
                "render": function ( data, type, row, meta ) 
                {
                    return '<a href="'+data+'" download>R1</a>';
                }
            },
            {
                "targets":9,
                orderable: false,
		visible:false,
                "data": "download_link",
                "render": function ( data, type, row, meta )
                {
                    return '<a href="'+data+'" download>R2</a>';
                }
            },
            {
                "targets":10,
                orderable: false,
                "data": "download_link",
                "render": function ( data, type, row, meta ) 
                {
                    return '<a href="'+data+'" download>gVCF</a>';
                }
            },
            {
                "targets":11,
                visible:false,
                orderable: false,
                "data": "link",
                "render": function ( data, type, row, meta ) 
                {
                    return '<a href="'+data+'" target="_blank" rel="noopener noreferrer">Fasta</a>';
                }
            },
            {
                "targets":12,
                orderable: false,
                "data": "link",
                "render": function ( data, type, row, meta ) 
                {
                    return '<a href="'+data+'" target="_blank" rel="noopener noreferrer">Fasta</a>';
                }
            },
            {
                "targets":13,
                orderable: false,
                "data": "link",
                "render": function ( data, type, row, meta ) 
                {
                    return '<a href="'+data+'" target="_blank" rel="noopener noreferrer">Quast</a>';
                }
            },
            {
                "targets":14,
                visible:false,
                orderable: false,
                "data": "link",
                "render": function ( data, type, row, meta ) 
                {
                    return '<a href="'+data+'" target="_blank" rel="noopener noreferrer">GFF</a>';
                }
            },
            {
                "targets":15,
                orderable: false,
                "data": "link",
                "render": function ( data, type, row, meta ) 
                {
                    return '<a href="'+data+'" target="_blank" rel="noopener noreferrer">GBK</a>';
                }
            },
            {
                "targets":16,
                visible:false,
                orderable: false,
                "data": "link",
                "render": function ( data, type, row, meta ) 
                {
                    return '<a href="'+data+'" target="_blank" rel="noopener noreferrer">Txt</a>';
                }
            },
            {
                "targets":17,
                visible:false,
                orderable: false,
                "data": "link",
                "render": function ( data, type, row, meta ) 
                {
                    return '<a href="'+data+'.html'+'" target="_blank" rel="noopener noreferrer">View</a>'; //important ==> format txt.html
                }
            },
            {
                "targets":18,
                visible:false
            },
	    {
                "targets":19,
                visible:false
            },
	    {
                "targets":20,
                visible:false
            },
	    {
                "targets":21,
                visible:false
            },
	    {
                "targets":22,
                visible:false
            },
	    {
                "targets":23,
                visible:false
            },
	    {
                "targets":24,
                visible:false
            },
	    {
                "targets":25,
                visible:false
            },
	    {
                "targets":26,
                visible:false
            },
        {
            "targets":27,
            orderable: false,
	    visible:false,
            "data": "link",
            "render": function ( data, type, row, meta ) 
            {
                return '<a href="genes?param='+data+'" target="_blank" rel="noopener noreferrer">View</a>';
            }
            },
        {
            "targets":28,
            orderable: false,
            "data": "link",
            "render": function ( data, type, row, meta ) 
            {
                return '<a href="genes?param='+data+'" target="_blank" rel="noopener noreferrer">View</a>';
            }
            }
        ],
        //"scrollX": true, // Vertically scrollable table
        select: 
            {
    	       style: 'os',
            },
        scrollX : true,
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
                        extend: 'excel', text: 'Excel', messageBottom:false, exportOptions: {columns: [0,1,2,5,6,7,18,19,20,21,22,23,24,25,26]}
                    },
                    //pdf button : eexport only colums containing text metadatas (not links to files), at a landscape format (useful in order to do not crop table)
                    {
                        extend: 'pdfHtml5', orientation: 'landscape', pageSize: 'LEGAL', messageBottom:false, exportOptions: {columns: [0,1,2,5,6,7,18,19,20,21,22,23,24,25,26]}
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
    
    // Add download settings checkbox event listeners
    $('.ui.radio.checkbox').checkbox('attach events','.ui.slider.checkbox', 'onBeforeChecked'); //"onBeforeChecked" = invert (check) status. More useful than "check"
    // Réinit "ui sticky" menu if DataTables length was modified by the client. Then sticky menu can stay sticky by considering the new page length.
    $('#table_id').on('length.dt', function()
    {
        $('.ui.sticky').sticky({
        offset : 80, // adjust all values so that content does not overlap any content between the top of the browser and the specified value
        bottomOffset:-1 // same for the bottom of the browser
        });
    });
    // Download files selected in DataTables
    $('#dtDownload').click(function(){
        var currentDate = new Date(Date.now()).toLocaleString();
        var count = table.rows( { selected: true } ).count(); // number of selected rows
        var toDownload={}; 
        var formatToDownload=[];
        var selectedRadios=$('.ui.radio.checkbox.checked label') // contains <labels> from selected radio checkboxes
        if (selectedRadios.length===0)
        {
            //alert('Please select which kind of files you want to download (bottom section : download settings)')
            $('.small.modal.pleaseselect').modal('show')
        }
        else // launch file compression only if file format is selected
        {
            $('.basic.modal.preparing').modal('show')
            for (var i=0;i<selectedRadios.length;i++)
            {
                formatToDownload.push(selectedRadios[i].innerHTML) //add <labels> (Normalised reads, Variants...) content to formatToDownload[]
            }

            for (var i=0 ; i<count ; i ++) // Create a JSON containing href links to download
            {    
                // Generates a JSON including all files that meets the formats included in formatToDownload[]
                if(formatToDownload.includes('Normalized reads (fastq)')) // add Fastq if Normalized reads selected
                {
                    toDownload["FASTQ_pair1_"+i]=table.rows( { selected: true } ).data({ selected: true })[i].Reads.FASTQ_pair1
                    toDownload["FASTQ_pair2_"+i]=table.rows( { selected: true } ).data({ selected: true })[i].Reads.FASTQ_pair2
                }
                if(formatToDownload.includes('Variants')) // add Fastq if Normalized reads selected
                {
                    toDownload["VCF_"+i]=table.rows( { selected: true } ).data({ selected: true })[i].Reads.VCF
                }
                if(formatToDownload.includes('Contigs')) // add Fastq if Normalized reads selected
                {
                    toDownload["Contigs_"+i]=table.rows( { selected: true } ).data({ selected: true })[i].Genome.Contigs
                }
                if(formatToDownload.includes('Assembly')) // add Fastq if Normalized reads selected
                {
                    toDownload["Assembly_"+i]=table.rows( { selected: true } ).data({ selected: true })[i].Genome.Assembly
                }
                if(formatToDownload.includes('GFF')) // add Fastq if Normalized reads selected
                {
                    toDownload["GFF_"+i]=table.rows( { selected: true } ).data({ selected: true })[i].Genome.GFF
                }
                if(formatToDownload.includes('GBK')) // add Fastq if Normalized reads selected
                {
                    toDownload["GBK_"+i]=table.rows( { selected: true } ).data({ selected: true })[i].Genome.GBK
                }
                if(formatToDownload.includes('ARTwork report')) // add Fastq if Normalized reads selected
                {
                    toDownload["Report_"+i]=table.rows( { selected: true } ).data({ selected: true })[i].Report
                }
            }
            let clientuuid=uuidv4()
            $.ajax({
                url: document.URL+"/"+clientuuid, 
                timeout: 0, //secs
                type: 'POST', 
                contentType: 'application/json', 
                data:toDownload
            })
            .done(function(msg){
            console.log('form submitted. Response payload: '+ msg);
            window.location="../../"+msg // change window.location in order to launch dl;
            console.log('POST response payload');
            $('.basic.modal.preparing').modal('hide')
            console.log("got : \n"+JSON.stringify(toDownload))
            }).fail(function(request, status, err) {
                if (status == "timeout") {
                    // timeout -> reload the page and try again
                    console.warn("timeout");
                    //window.location.reload();
                } 
                else {
                    // another error occured  
                    $('.ui.indeterminate.big.text.loader').html('It seems like you requested a lot of files. \
                    <br/>You\'ll be able to retrieve them under 5-10 minutes by clicking <a href="http://192.168.184.133:3000/tmp/'+clientuuid+'/wgsdata_'+clientuuid+'.zip'+'">here</a>');
                    console.warn('file maybe available in tmp/'+clientuuid)
                }
            })
        }      
    });
    // Filtering DataTables according to GET parameters
    let urlArray = window.location.href.split('/'); // url array based on "/" separation
    // (NOT SAFE, need improvements) if there is a GET parameter in the url, process the code below.
    if(wordInString(urlArray,"ids=")) {
        let strainID = urlArray[5].replace("genomes?ids=",""); 
        table
        .column(0)
        .search(strainID.split(',').join('|'),true)
        .draw(); // Use 6th parameter to perform DataTables search using column.search method, then draw() it
    }
    // Perform regex-based search
    $('#table_id_filter.dataTables_filter.ui.input').on( 'keyup click', function () {
        /* Replace ' '  in text input by '|' in order to perform regex searches. 
        Why not typing '|' directly? Because 'copy ids' tools returns strings separated by ' ' */
        $('#table_id').DataTable().search($('.dataTables_filter input').val().split(' ').join('|'),true).draw(); 
    } );
});
