const url = window.location.href;
const uuid = url.split("=").pop();
console.log(uuid);


$(document).ready(function() {
    $.get( "../tmp/fastosh_" + uuid + "/taxonomy.nwk", function( data ) {
        const dataNewick = data;
        const dataObject = dataNewick,
        phylocanvas = new Smits.PhyloCanvas(
            dataObject,
            'svgCanvas',
            1000,
            1000,
            'circular'
        );
        console.log(dataNewick)
    });
}, "text" );



