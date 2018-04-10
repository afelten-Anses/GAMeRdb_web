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
        $('.longer.modal').modal('show');
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
    

//DataTables initialisation and behavior settings

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
            { data: 'Reads.FASTQ_pair1' , "title": "Fastq R1"},
            { data: 'Reads.FASTQ_pair2' , "title": "Fastq R2"},
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
        buttons:[
                    //Select all rows button
                    'selectAll',
                    //copy button : export only STRAIN ID
                    { extend: 'copyHtml5', header : false , messageBottom:false,text: 'Copy ids',title:'',exportOptions: {columns: 0, orthogonal: 'fullNotes'}},
                    //excel button : export only colums set to visible
                    { extend: 'excel', text: 'Excel', exportOptions: {columns: ':visible'}},
                    //pdf button : export only colums set to visible, at a landscape format (useful in order to do not crop table)
                    {extend: 'pdfHtml5', orientation: 'landscape', pageSize: 'LEGAL',exportOptions: {columns: ':visible'}},
                    //column visibility button
                    {extend:  'colvis' , text: 'Columns'},
                    //Show x rows button
                    'pageLength',
                    //Download button
                    {text: 'Donwload',action: function () 
                        {
                            var currentDate = new Date(Date.now()).toLocaleString();
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
                            
                            for (var i=0 ; i<count ; i ++)
                            {
                                /*function play_next(toDownload)
                                {
                                   var song = toDownload.shift(); // Removes the first song and stores it in song

                                   $.get(song, function(ret_data)
                                    {
                                        alert('done');
                                       allfiles.file(song,ret_data)
                                      if(song.length) play_next(); // Call next song if more songs exist;
                                    });
                                }
                                play_next(toDownload); // Start it off
                                
                                /*console.log(toDownload)*/               
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
/*                            function sleep(milliseconds) {
                              var start = new Date().getTime();
                              for (var i = 0; i < 1e7; i++) {
                                if ((new Date().getTime() - start) > milliseconds){
                                  break;
                                }
                              }
                            }*/
//                            for (var i=0 ; i<count ; i ++)
//                            {
//                                toDownload.push({
//                                    name : table.rows( { selected: true } ).data({ selected: true })[i].Reads.FASTQ_pair1, 
//                                    data : $.get(table.rows( { selected: true } ).data({ selected: true })[i].Reads.FASTQ_pair1)
//                                                  })
//                                sleep(52)
//                                /*console.log(toDownload)*/                
//                            }
//                           /* function addzipfile(todl,llfiles,sucessCallback)
//                            {
//                                for (var prop in todl) {
//                                  if (todl.hasOwnProperty(prop)) { 
//                                  // or if (Object.prototype.hasOwnProperty.call(obj,prop)) for safety...
//                                      console.log(todl[prop])
//                                      $.get(todl[prop]).then(function(content)
//                                        {
//                                          sucessCallback( llfiles.file(todl[prop],content))
//                                      });
//                                        //allfiles.file(toDownload[1],$.get(toDownload[1]),{binary: true});
//                                      //allfiles.file(toDownload[y],$.get(toDownload[y]),{binary: true});
//                                  }
//                                    
//                                }
//                                
//                                
//                            }*/
//                            
//                       /$.each(toDownload,function(index,value)
//                        {
//                            $.get(value),function(data)
//                            {
//                                allfiles.file(toDownload[index],data)
//                            }
//                        })
//                               
                            // Generate the zip file asynchronously
                            console.log("generatesync")
                            allfiles.generateAsync({
                                type: "blob",
                                compression: "DEFLATE",
                                compressionOptions: {
                                    level: 1
                                }
                            }).then(function(blob) {
                                // Force down of the Zip file
                                saveAs(blob, "Strains_data.zip");
                            });
                            
//                            
//                            function zipFiles(toDl) 
//                            {
//                                var zip = new JSZip();
//                                var i=0;
//                                deferreds = [];
//                                toDl.forEach(function(image) {
//                                    deferreds.push(zip.file(image.name, image.data, { binary: true }));
//                                    i++;
//                                });
//                                $.when.apply($, deferreds).then(function() {
//                                    zip.generateAsync({ type: "blob" }).then(function(content) {
//                                        saveAs(content, 'Filename.zip'); //FileSaver.js
//                                    });
//                                });
//                            }
//                            zipFiles(toDownload)
//                            
                        }
                    }
                ]   
    });
	table.buttons().container().appendTo( $('div.eight.column:eq(0)', table.table().container()));
});