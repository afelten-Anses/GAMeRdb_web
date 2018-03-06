    // Turn on dropdown
    $('.ui.dropdown').dropdown(); 
    // Turn on accordion effect
    $('.ui.accordion').accordion(); 
    // Turn on tab effect
    $('.menu .item').tab(); 
    // Turn on closable message boxes and "fade" closing transition
    $('.message .close')
    .on('click', function() 
    {
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

//DataTables initialisation

$(document).ready(function() {
                    
                    
	var table = $('#table_id').DataTable( 
    {
        
        data: data,
        columns: 
        [   
            { data: 'SampleID' , "title": "Strain ID"},
            { data: 'Project' , "title": "Project"},
            { data: 'Reads.Center' , "title": "Center"},
            { data: 'Reads.FASTQC_pair1', "title": " Fastqc R1",},
            { data: 'Reads.FASTQC_pair2' , "title": "Fastqc R2"},
            { data: 'Reads.FASTQ_pair1' , "title": "Fastq R1"},
            { data: 'Reads.FASTQ_pair2' , "title": "Fastq R2"},
            { data: 'Reads.VCF' , "title": "Variants"},
            { data: 'Genome.Contigs' , "title": "Partial Assembly"},
            { data: 'Genome.Assembly' , "title": "Whole Assembly"},
            { data: 'Genome.QUAST' , "title": "Assembly quality"},
            { data: 'Genome.GFF' , "title": "GFF"},
            { data: 'Genome.GBK' , "title": "GBK"},
            { data: 'Report' , "title": "ARTwork report"},
            { data: 'Report' , "title": "ARTwork HTML report"}
        ],
        columnDefs: 
        [ 
            {
                orderable: false,
                "targets": 3,
                "data": "download_link",
                "render": function ( data, type, row, meta ) 
                {
                    return '<a href="'+data+'" download>R1</a>';
                }
            },
            {
    	       orderable: false,
                "targets":4,
                "data": "download_link",
                "render": function ( data, type, row, meta ) 
                {
                    return '<a href="'+data+'" download>R2</a>';
                }
            },
            {
                orderable: false,
                "targets":5,
                "data": "download_link",
                "render": function ( data, type, row, meta ) 
                {
                    return '<a href="'+data+'">R1</a>';
                }
            },
            {
                orderable: false,
                "targets":6,
                "data": "download_link",
                "render": function ( data, type, row, meta )
                {
                    return '<a href="'+data+'">R2</a>';
                }
            },
            {
                orderable: false,
                "targets":7,
                "data": "download_link",
                "render": function ( data, type, row, meta ) 
                {
                    return '<a href="'+data+'" download>gVCF</a>';
                }
            },
            {
                orderable: false,
                "targets":8,
                "data": "download_link",
                "render": function ( data, type, row, meta ) 
                {
                    return '<a href="'+data+'" download>Fasta</a>';
                }
            },
            {
                orderable: false,
                "targets":9,
                "data": "download_link",
                "render": function ( data, type, row, meta ) 
                {
                    return '<a href="'+data+'" download>Fasta</a>';
                }
            },
            {
                orderable: false,
                "targets":10,
                "data": "download_link",
                "render": function ( data, type, row, meta ) 
                {
                    return '<a href="'+data+'">Quast</a>';
                }
            },
            {
                orderable: false,
                "targets":11,
                "data": "download_link",
                "render": function ( data, type, row, meta ) 
                {
                    return '<a href="'+data+'">GFF</a>';
                }
            },
            {
                orderable: false,
                "targets":12,
                "data": "download_link",
                "render": function ( data, type, row, meta ) 
                {
                    return '<a href="'+data+'">GBK</a>';
                }
            },
            {
                orderable: false,
                "targets":13,
                "data": "download_link",
                "render": function ( data, type, row, meta ) 
                {
                    return '<a href="'+data+'">text</a>';
                }
            },
            {
                orderable: false,
                "targets":14,
                "data": "action_link",
                "render": function ( data, type, row, meta ) 
                {
                    return '<a href="'+data+'.html'+'">view</a>'; //important ==> format txt.html
                }
            }
        ],
        select: 
            {
    	       style: 'os',
            },
        lengthChange: false,
        buttons: ['selectAll', 'copy', 'excel', 'pdf', 'colvis' , 'pageLength']
    });
	table.buttons().container().appendTo( $('div.eight.column:eq(0)', table.table().container()));
});