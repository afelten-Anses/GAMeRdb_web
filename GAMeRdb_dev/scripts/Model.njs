// **** Author : Kevin Durimel 
// **** Goal : Controller script (MVC Scheme)
// -Author : Kevin Durimel 
// -Goal : Model script. Only retrieve data from GAMeRdb and return data as raw text or JSON.
// -External depencies : templatesjs,validator

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
												*******	CONTROLLER init : modules, MVC scripts, args *******
*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// NodeJS modules
const mongojs = require('mongojs') // MongoDB driver
const db = mongojs('mongodb://127.0.0.1:27017/GAMeRdb',['GENOME'])
//var db = mongojs('Kindle:Amazon@localhost/GAMeRdb',['GENOME'])// Connecting to MongoDB with mongoJS

function findAttribute(attribute,species) // Parse GAMeRdb data by species
{
	console.log(`${attribute} for  ${species}`) //dev trace

	db.GENOME.find({[attribute]: species},function (err, docs) // <=> var query={} ; query[attribute] = species;
	{
		// docs is an array of all the documents in a collection
		docs.forEach(
			function(doc) 
			{
			// attributes is an array in order to convert the "attribute arg" from string to a MongoJS request ( arg -->  doc.arg) 
	        let attributes = 
	        {
	        	'_id':doc._id, 														// MongoDB object ID
	        	'SampleID':doc.SampleID, 											// Anses Sample ID
	        	'Project':doc.Project, 												// Anses Project name
		    	'Report': doc.Report, 												// ARTwork text report
		    	'Reads.FASTQC_pair2':doc.Reads.FASTQC_pair2,						// FastQC html report (reverse reads)
		    	'Reads.FASTQC_pair1':doc.Reads.FASTQC_pair1,						// FastQC html report (forward reads)
		    	'Reads.Technology':doc.Reads.Technology,							// Sequencing technology used
		    	'Reads.Center':doc.Reads.Center,									// Sequencing center name
		    	'Reads.VCF':doc.Reads.VCF,											// iVARCall2 --noVCF gVCF file path
		    	'Reads.NbReads':doc.Reads.NbReads,									// Number of reads per paired file estimated by Bbmap in FASTQ_pair 2 and 1  
		    	'Reads.ReadsLength':doc.Reads.ReadsLength,							// Reads lenght parsed from FASTQC report by ARTwork
		    	'Reads.FASTQ_pair2':doc.Reads.FASTQ_pair2,							// Normalised reverse reads filepath
		    	'Reads.FASTQ_pair1':doc.Reads.FASTQ_pair1,							// Normalised forward reads filepath
		    	'Reads.Phylogeny.Serovar':doc.Reads.Phylogeny.Serovar				// Serovar infered my in-silico MLST
		    	'Reads.Phylogeny.SequenceType':doc.Reads.Phylogeny.SequenceType		// SequenceType infered after in-silico MLST
		    	'Reads.Phylogeny.Genus':doc.Reads.Phylogeny.Genus					// Genus retrieved in ARTwork launching parameters
		    	'Reads.Phylogeny.Species':doc.Phylogeny.Species 					// Species


		    	'Phylogeny.Serovar':doc.Phylogeny.Serovar
	  		};
	           console.log(attributes[attribute]);
	        },
	        function(err) 
	        {
	            console.log("Model : error accesing ${docs}. ${err}");
	            return db.close();
	        }
	    );
	})
}


function searchAttributeBySpecies(attribute,species) // use findAttribute() in order to retrieve attribute by species
{
	db.GENOME.find({attribute:species},function (err, docs) { // docs is an array of all the documents in mycollection
	findAttribute(docs,'Phylogeny.Serovar');
})
}

findAttribute("Phylogeny.Serovar","Typhimurium"); 

var direBonjour = function() {
    console.log('Bonjour !');
    return "Yo";
}

exports.direByeBye = function() {
    console.log('Bye bye !');
    return "See u"
}

//Export functions 
exports.direBonjour = direBonjour;