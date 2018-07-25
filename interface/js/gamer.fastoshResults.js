const url = window.location.href;
const uuid = url.split("=").pop();
console.log(uuid);


$(document).ready(function() {
    $.get( "../tmp/fastosh_" + uuid + "/taxonomy.nwk", function( data ) {
        const dataNewick = data;
        const dataObject = dataNewick;
        phylocanvas = new Smits.PhyloCanvas(
            dataObject,
            'svgCanvas',
            1000,
            1000,
            'circular'
        );
       phylocanvas2 = new Smits.PhyloCanvas(
            dataObject,
            'svgCanvasRect',
            1000,
            1500,
            'rectangular'
        );

        console.log(dataNewick)
        var svgSource = phylocanvas.getSvgSource() // svg code which will be downloadable as a blob file
        console.log(svgSource)
    });
    $('a[href="distance_matrix"]').attr('href',"../tmp/fastosh_" + uuid + "/distance_matrix.tsv")
    $('a[href="newick"]').attr('href',"../tmp/fastosh_" + uuid + "/taxonomy.nwk")
});



$("#helpme").click(function()
{
    $('.longer.modal').modal({
    inverted: false
  }).modal('show');
});

$("#switchtree").on("click", function() {
    //$('#svgCanvas').hide();
    //$('#svgCanvasRect').show();
    $('#svgCanvas').transition({animation : 'fly right', duration  : 1800});
    sleep(1800).then ( () =>  {
        $('#svgCanvasRect').transition({animation : 'fly left', duration  : 1800});
    });
    $('#switchtreeRect').show();
    $('#switchtree').hide();
});

$("#switchtreeRect").on("click", function() {
    //$('#svgCanvasRect').hide();
    //$('#svgCanvas').show();
    $('#svgCanvasRect').transition({animation : 'fly right', duration  : 1800});
    sleep(1800).then ( () => {
        $('#svgCanvas').transition({animation : 'fly left', duration  : 1800});
    });
    $('#switchtreeRect').hide();
    $('#switchtree').show();
});



