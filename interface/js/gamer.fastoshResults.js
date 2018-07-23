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
        console.log(dataNewick)
        phylocanvas2 = new Smits.PhyloCanvas(
            dataObject,
            'svgCanvasRect',
            1000,
            1500,
            'rectangular'
        );
        var svgSource = phylocanvas.getSvgSource() // svg code which will be downloadable as a blob file
        console.log(svgSource)
    });
    
});

$('a[href="distance_matrix"]').attr('href',"../tmp/fastosh_" + uuid + "/distance_matrix.tsv")
$('a[href="newick"]').attr('href',"../tmp/fastosh_" + uuid + "/taxonomy.nwk")

$("#helpme").click(function()
{
    $('.longer.modal').modal({
    inverted: false
  }).modal('show');
});

$("#switchtree").click(function() {
    /*$('#svgCanvas').transition('fade');*/
    $('#svgCanvasRect').show();
});

