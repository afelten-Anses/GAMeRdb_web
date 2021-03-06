const url = window.location.href;
let currentDate = new Date(Date.now()).toLocaleString();
let species = window.location.pathname.split('/')[2];



$(document).ready(function() {
    $.get( "../../phylogeny_global/" + species + "/taxonomy.nwk", function( data,err ) {
        const dataNewick = data;
        const dataObject = dataNewick;
        phylocanvas = new Smits.PhyloCanvas(
            dataObject,
            'svgCanvas',
            1000,
            1000,
            'circular'
        );
       phylocanvasRect = new Smits.PhyloCanvas(
            dataObject,
            'svgCanvasRect',
            1000,
            9999,
            'rectangular'
        );
        
        // stop reloading page if startPageReload was called in a previous Jquery GET error.
    }).fail(function() {
        console.warn("Cannot retrieve global phylogeny");
    });
    $('a[href="distance_matrix"]').attr('href',"../../phylogeny_global/" + species + "/distance_matrix.tsv")
    $('a[href="newick"]').attr('href',"../../phylogeny_global/" + species + "/taxonomy.nwk")
    
});



$("#helpme").click(function()
{
    $('.longer.modal').modal({
    inverted: false
  }).modal('show');
});

// Animation when switching from circular to rectangular tree
$("#switchtree").on("click", function() {
    $('#switchtree').attr('class',"ui loading button");
    $('#svgCanvas').transition({animation : 'fly right', duration  : 800});
    sleep(800).then ( () =>  {
        $('#svgCanvasRect').transition({animation : 'fly left', duration  : 800});
        sleep(800).then ( () =>  {
            $('#switchtree').hide();
            $('#switchtreeRect').show();
            $('#switchtree').attr('class',"ui labeled icon button");
        });
    });
    
});
// Animation when switching from rectangular to circular tree
$("#switchtreeRect").on("click", function() {
    $('#switchtreeRect').attr('class',"ui loading button");
    $('#svgCanvasRect').transition({animation : 'fly right', duration  : 800});
    sleep(800).then ( () => {
        $('#svgCanvas').transition({animation : 'fly left', duration  : 800});
         sleep(800).then ( () =>  {
             $('#switchtreeRect').hide();
             $('#switchtree').show();
             $('#switchtreeRect').attr('class',"ui labeled icon button");
         });
    });
    
});

// Download image action : archive (client-side) and cirular tree svg images and save it as zip file.
$("#dlimage").on("click", function() {
var zip = new JSZip();
// Add a top-level, arbitrary text file with contents
zip.file("Readme.txt", "------------------------------------------------------\n" + 
         "Generated by GAMeRdbi at : " + currentDate +
        ".\n------------------------------------------------------\n" +
         "\nIf you dont have a sofware for viewing SVG files, you can still open it in your web browser.");
// Generate a directory within the Zip file structure
var allfiles = zip.folder();
/* To retrieve svg image we use didnt use the native JSphylo method
phylocanvas.getSvgSource() because it seems buggy when used for more than 1 tree */ 
allfiles.file("Rectangular_Tree.svg", $('#svgCanvasRect')[0].outerHTML); 
allfiles.file("Circular_tree.svg", $('#svgCanvas')[0].outerHTML);
console.log("generatesync")
// Asynchronously generates zip file (containing the 2 trees) with JSZip.
        allfiles.generateAsync({
            type: "blob",
            compression: "DEFLATE",
            streamFiles:true,
            compressionOptions: {
                level: 9 // Level 1 to 9. 0: best speed, 9: best compression
            }
        }).then(function(blob) {
            // Launch download dialog
            saveAs(blob, "FasTosh_results.zip");
        });
});

// Download all action : archive (client-side) all results and save them as zip file.
$("#dlall").on("click", function() {
var zip = new JSZip();
// Add a top-level, arbitrary text file with contents
zip.file("Readme.txt", "------------------------------------------------------\n" + 
         "Generated by GAMeRdbi at : " + currentDate +
        ".\n------------------------------------------------------\n" +
         "\nIf you dont have a sofware for viewing SVG files, you can still open it in your web browser.");
// Generate a directory within the Zip file structure
var allfiles = zip.folder();
/* To retrieve svg image we use didnt use the native JSphylo method
phylocanvas.getSvgSource() because it seems buggy when used for more than 1 tree */ 
allfiles.file("Rectangular_Tree.svg", $('#svgCanvasRect')[0].outerHTML); 
allfiles.file("Circular_tree.svg", $('#svgCanvas')[0].outerHTML);
let distMatrix=$.get({
    url: "../../phylogeny_global/" + species + "/distance_matrix.tsv",
    async:false
});
allfiles.file("distance_matrix.tsv", distMatrix); 
let newick=$.get({
    url: "../../phylogeny_global/" + species + "/taxonomy.nwk",
    async:false
});
allfiles.file("taxonomy.nwk", newick); 
console.log("generatesync")
// Asynchronously generates zip file (containing the 2 trees) with JSZip.
        allfiles.generateAsync({
            type: "blob",
            compression: "DEFLATE",
            streamFiles:true,
            compressionOptions: {
                level: 9 // Level 1 to 9. 0: best speed, 9: best compression
            }
        }).then(function(blob) {
            // Launch download dialog
            saveAs(blob, species+"_phylogeny.zip");
        });
});

