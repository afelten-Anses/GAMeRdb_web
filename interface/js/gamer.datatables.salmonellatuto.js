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
            { data: 'Phylogeny.Serovar' , "title": "Predicted Serovar"},
            { data: 'Reads.FASTQC_pair1', "title": " Fastqc R1"},
            { data: 'Reads.FASTQC_pair2' , "title": "Fastqc R2"},
            { data: 'Reads.FASTQ_pair1' , "title": "Normalized reads R1"},
            { data: 'Reads.FASTQ_pair2' , "title": "Normalized reads R2"},
            { data: 'Reads.VCF' , "title": "Variants"},
            { data: 'Genome.Contigs' , "title": "Contigs"},
            { data: 'Genome.Assembly' , "title": "Assembly"},
            { data: 'Genome.QUAST' , "title": "Assembly quality"},
            { data: 'Genome.GFF' , "title": "GFF"},
            { data: 'Genome.GBK' , "title": "GBK"},
            { data: 'Report' , "title": "ARTwork report"},
            { data: 'Report' , "title": "ARTwork HTML report"}
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
                "targets": 4,
                orderable: false,
                "data": "link",
                "render": function ( data, type, row, meta ) 
                {
                    return '<a href="'+data+'" target="_blank" rel="noopener noreferrer">R1</a>';
                }
            },
            {
                "targets":5,
                orderable: false,
                "data": "link",
                "render": function ( data, type, row, meta ) 
                {
                    return '<a href="'+data+'" target="_blank" rel="noopener noreferrer">R2</a>';
                }
            },
            {
                "targets":6,
                orderable: false,
                "data": "download_link",
                "render": function ( data, type, row, meta ) 
                {
                    return '<a href="'+data+'" download>R1</a>';
                }
            },
            {
                "targets":7,
                orderable: false,
                "data": "download_link",
                "render": function ( data, type, row, meta )
                {
                    return '<a href="'+data+'" download>R2</a>';
                }
            },
            {
                "targets":8,
                orderable: false,
                "data": "download_link",
                "render": function ( data, type, row, meta ) 
                {
                    return '<a href="'+data+'" download>gVCF</a>';
                }
            },
            {
                "targets":9,
                visible:false,
                orderable: false,
                "data": "link",
                "render": function ( data, type, row, meta ) 
                {
                    return '<a href="'+data+'" target="_blank" rel="noopener noreferrer">Fasta</a>';
                }
            },
            {
                "targets":10,
                orderable: false,
                "data": "link",
                "render": function ( data, type, row, meta ) 
                {
                    return '<a href="'+data+'" target="_blank" rel="noopener noreferrer">Fasta</a>';
                }
            },
            {
                "targets":11,
                orderable: false,
                "data": "link",
                "render": function ( data, type, row, meta ) 
                {
                    return '<a href="'+data+'" target="_blank" rel="noopener noreferrer">Quast</a>';
                }
            },
            {
                "targets":12,
                visible:false,
                orderable: false,
                "data": "link",
                "render": function ( data, type, row, meta ) 
                {
                    return '<a href="'+data+'" target="_blank" rel="noopener noreferrer">GFF</a>';
                }
            },
            {
                "targets":13,
                orderable: false,
                "data": "link",
                "render": function ( data, type, row, meta ) 
                {
                    return '<a href="'+data+'" target="_blank" rel="noopener noreferrer">GBK</a>';
                }
            },
            {
                "targets":14,
                orderable: false,
                "data": "link",
                "render": function ( data, type, row, meta ) 
                {
                    return '<a href="'+data+'" target="_blank" rel="noopener noreferrer">Txt</a>';
                }
            },
            {
                "targets":15,
                visible:false,
                orderable: false,
                "data": "link",
                "render": function ( data, type, row, meta ) 
                {
                    return '<a href="'+data+'.html'+'" target="_blank" rel="noopener noreferrer">View</a>'; //important ==> format txt.html
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
                            table.rows({ search: 'applied'}).deselect();
                            table.rows({ search: 'applied'}).select();
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
                    'pageLength',
                    {
                        // Launch download on click
                        text: 'Download',action: function () 
                        {
                            //SERVER SIDE zip and download    
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
                            //CLIENT SIDE zip and download
                            /*var currentDate = new Date(Date.now()).toLocaleString();
                            var count = table.rows( { selected: true } ).count(); // number of selected rows
                            var toDownload=[];
                            var zip = new JSZip();
                            // Add an top-level, arbitrary text file with contents
                            //zip.file("Readme", "Here you can find the files downloaded from GAMeR genomic database at : "+currentDate);  
                            // Generate a directory within the Zip file structure
                            var allfiles = zip.folder("Strains");
                            allfiles.file("Readme", "Here you can find the files downloaded from GAMeR genomic database at : "+currentDate);
                            for (var i=0 ; i<count ; i ++)
                            {
                                toDownload.push(table.rows( { selected: true } ).data({ selected: true })[i].Genome.Contigs)
                            }
                            var dldata=[]
                            var promise=[]
                            for (var i=0 ; i<count ; i ++)
                            {
                                var fileTypeList=[
                                'Reads.FASTQC_pair1',
                                'Reads.FASTQC_pair2',
                                'Reads.VCF',
                                'Genome.Contigs',
                                'Genome.Assembly',
                                'Genome.QUAST',
                                'Genome.GFF',
                                'Genome.GBK',
                                'Report']
                                
                                dldata[i]=table.rows( { selected: true } ).data({ selected: true })[i].Genome.GFF
                                //Force synchronous Download 
                                promise[i] = $.get({url: dldata[i],
                                                    async:false}
                                                   );
                                //sleep(300)
                                // Add a file to the directory, in this case an image with data URI as contents
                                allfiles.file(dldata[i],promise[i]);
                                console.log(dldata[i])                
                            }                
                            // Generate the zip file asynchronously
                            console.log("generatesync")
                            allfiles.generateAsync({
                                type: "blob",
                                compression: "STORE",
                                streamFiles:true,
                                //compressionOptions: {
                                //    level: 1
                                //}
                            }).then(function(blob) {
                                // Force down of the Zip file
                                saveAs(blob, "Strains_data.zip");
                            });*/                   
                        }
                    }
                ]   
    });
    //Append content to DataTable
	table.buttons().container().appendTo( $('div.eight.column:eq(0)', table.table().container()));
    
    //-------------------------------------------------------------------------------------//
    // FROM HERE : everything that need to be declared/used after DataTatables processing  //
    //-------------------------------------------------------------------------------------//
    
    // Add download settings checkbox event listeners
    $('.ui.radio.checkbox').checkbox('attach events','.ui.slider.checkbox', 'onBeforeChecked'); //"onBeforeChecked" = invert (check) status. More useful than "check"
    // Réinit "ui sticky" menu if the DataTables length is modified by the client. Then sticky menu can stay sticky by considering the new page length.
    $('#table_id').on('length.dt', function()
    {
        $('.ui.sticky').sticky({
        offset : 80, // adjust all values so that content does not overlap any content between the top of the browser and the specified value
        bottomOffset:-1 // same for the bottom of the browser
        });
    });
    //Driver.js: used for tutorials
    const driver = new Driver();
    // add ids to class that need to be handled by Driver.js
    $('.dt-buttons.ui.basic.buttons').attr('id','rowtutorial')
    $('.ui.stackable.pagination.menu').attr('id','paginationtutorial')
    $('.ui.massive.borderless.fixed.fluid.menu').attr('id','headertutorial')
    //Driver.js: define the steps for introduction
    driver.defineSteps([
        {
            element: '#texthover',
            popover: {
                title: 'Ready for a fast tutorial?',
                description: "If you want to see more about this page features, you can also click on this help button. Its also a nice reminder. \
                <ul> \
                <li><b>Click \"next\" if you are ready to start the tutorial</b></li> \
                <li><b>Click \"previous\" to see the previous tips</b></li> \
                <li><b>Click \"quit\" to exit the tutorial</b></li>",
                position: 'left'
            }
        },
        {
            element: '#datatables_header',
            popover: {
                title: 'You are currently in the <i>Salmonella</i> genomes workspace',
                description: 'I\'ll show you how to take full advantadge of all its features. Step by step.',
                position: 'bottom'
            }
        },
        {
            element: '#headertutorial',
            popover: {
                title: 'Other workspaces?',
                description: 'You can access to other species workspaces at any moment by clicking on this header \
                <br/>Notice the workspace you are currently in is highlighted',
                position: 'bottom'
            }
        },
        {
            element: '#menu_tutorial',
            popover: {
                title: 'Workspace menu',
                description: "From this page, you can access to the following features: \
                <br/><b>Genomes</b> \
                <br/><img src=\"../../../videos/genomesDLtutorial.png\" width=\"250px\"> \
                <br/>Browse and download the data generated by ARTwork for a species. (You are here, e.g <i>Salmonella</i>) \
                <br/><b>References (very soon)</b> \
                <br/>Browse and download WGS data about references genomes for a species (In our case, <i>Salmonella</i> reference genomes) \
                <br/><b>Serovars(very soon)</b> \
                <br/>Global overview of the serovars distribution for all the species processed by ARTwork \
                <br/><b>Phylogeny(very soon)</b> \
                <br/>Global overview of the serovars distribution for all the species processed by ARTwork \
                <br/><b>CC and ST distribution(very soon)</b> \
                <br/>Global overview of the CC/ST distribution for all the species (not available for <i>Salmonella</i>)",
                position: 'right'
            }
        },
        {
            element: '#multiqc',
            popover: {
                title: 'WGS data quality',
                description: "You can also access to a global overview of the WGS data quality by clicking on \"MultiQC report\"",
                position: 'top'
            }
        },
        {
            element: '#footertutorial',
            popover: {
                title: 'Any bug? Mispelling? Or some requests?',
                description: "Dont forget to contact us using this form (or directly by email), we'll reply as soon as possible",
                position: 'top'
            }
        },
        {
            element: '#table_id_wrapper',
            popover: {
                title: 'Now let me tell you more about this dynamic table',
                description: "Click next to continue, you'll be able to try the table!",
                position: 'left'
            }
        },
        {
            element: '#rowtutorial',
            popover: {
                title: 'Dynamic tables tools',
                description: "<b>With this toolbox, you can:</b> \
                <br\><br\>-Select all strains ids contained in the table \
                <br\><br\>-Copy the selected ids to your clipboard \
                <br\><br\>-Export their metatada in a Excel or a Pdf file \
                <br\><br\>-Show or hide specific colums \
                <br\><br\>-Set the number of rows per page \
                <br\><br\>-Download the WGS files about the selected strains ids." ,
                position: 'right'
            }
        },
        {
            element: '#table_id_filter',
            popover: {
                title: 'Search box',
                description: "In order to be able to search information about every columns of this table. \
                Every search dynamically filters the table. <br\> \
                <b>You can try it now<b/>, then click \"next\" when you filtered something!" ,
                position: 'left'
            }
        },
        
        /*{
            element: '#menu_genomes_tutorial',
            popover: {
                title: 'Genomes',
                description: "<img src=\"../../../videos/genomesDLtutorial.png\" width=\"250px\"> \
                <br/>Browse and download the data generated by ARTwork for a species. (You are here, e.g <i>Salmonella</i>)",
                position: 'right'
            }
        },
        {
            element: '#menu_references_tutorial',
            popover: {
                title: 'References',
                description: "Browse and download WGS data about references genomes for a species (In our case, Salmonella reference genomes)",
                position: 'right'
            }
        },
        {
            element: '#menu_serovars_tutorial',
            popover: {
                title: 'Serovars',
                description: "Global overview of the serovars distribution for all the species processed by ARTwork",
                position: 'right'
        }
        },
        {
            element: '#menu_phylogeny_tutorial',
            popover: {
                title: 'Phylogeny',
                description: "Phylogeny: Global overview of the serovars distribution for all the species processed by ARTwork",
                position: 'right'
            }
        },*/  
        {
            element: '#table_id',
            popover: {
                title: 'Let\'s get a try',
                description: "<b>Please select some strains ids.</b>You can use <b>various selection modes:</b> \
                <br\><br\> <b>Left click</b>: simple selection \
                <br\><br\> <b>CTRL</b> + <b>left click</b>: one per one incremental selection \
                <br\><br\> <b>CTRL</b> + <b>shift</b> + <b>left click</b> : multiple selection \
                <br\><br\><br\>You can mix these 3 selections modes. \
                <br/>Please notice <b>you can also</b> \
                <br\>-See or download these files one per one by click on the clickable links \
                <br\>-Sort the rows alphanumerically by clicking on its headers \
                <br/><b>Click \"next\" when you finished to select</b>" ,
                position: 'left'
            }
        },
        {
            element: '#paginationtutorial',
            popover: {
                title: 'Table pages',
                description: "Notice you can also browse dynamically this table, page per page. Click next to continue." ,
                position: 'left'
            }
        },
        {
        element: '#dlcheckbox',
            popover: {
                title: 'Download data about the selected strains',
                description: "If you correctly followed the tutorial, you have now some strains (rows) selected.\
                Let's download the WGS data about these strains: \
                <br/><br/>-You can download all the WGS files for these strains by clicking the \"Download all\" button \
                <br/><b>or</b> \
                <br/>-Download specific files by checking the desired file formats \
                <br/><br/><b>Click \"next\" when you finished to check</b>",
                position: 'top'
            }
        },
        {
            element: '#rowtutorial',
            popover: {
                title: 'You\'re now able to start a download',
                description: "You can <b>also</b>: \
                <br\><br\>-Copy the selected ids to your clipboard \
                <br\><br\>-Export them in a Excel or a Pdf file \
                <br\><br\>-Show or hide colums \
                <br\><br\>-Set the number of shown rows per page \
                <br\><br\><h2>Voila,</h2><b>you can now download your files, test the other features, or just close this tutorial :-)</b>" ,
                position: 'right'
            }
        }
    ]);
    // Driver.js: Start the introduction
    driver.start();
});