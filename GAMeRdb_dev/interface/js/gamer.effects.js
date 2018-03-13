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
                orderable: false,
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
                    return '<a href="'+data+' download">R1</a>';
                }
            },
            {
                "targets":7,
                orderable: false,
                "data": "download_link",
                "render": function ( data, type, row, meta )
                {
                    return '<a href="'+data+' download">R2</a>';
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
                    { extend: 'copyHtml5', header : false ,text: 'Copy ids',title:'',exportOptions: {columns: 0, orthogonal: 'fullNotes'}},
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
                            var count = table.rows( { selected: true } ).count();
                            var selectDownload = table.rows( { selected: true } )
                            console.log(count)
                            console.log(selectDownload)
                        }
                    }
                ]   
    });
	table.buttons().container().appendTo( $('div.eight.column:eq(0)', table.table().container()));
    
    
});