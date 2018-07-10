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
//const db = mongojs('mongodb://127.0.0.1:27017/GAMeRdb',['GENOME']) // dev
const db = mongojs('Kindle:Amazon@localhost/GAMeRdb',['GENOME']) // Connecting to MongoDB with mongoJS

function findAttribute(attribute,value,successCallback) // Parse GAMeRdb data filtered by attribute=value and return only the macthing attribute
{
	console.log(`${attribute} for  ${value}`) //dev trace

	db.GENOME.find({[attribute]: value},function (err,  docs) // <=> var query={} ; query[attribute] = value;
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
			    	'Report': doc.Report, 
			    	'Center':doc.Reads.Center,												// ARTwork text report
			    	'Reads.FASTQC_pair2':doc.Reads.FASTQC_pair2,						// FastQC html report (reverse reads)
			    	'Reads.FASTQC_pair1':doc.Reads.FASTQC_pair1,						// FastQC html report (forward reads)
			    	'Reads.Technology':doc.Reads.Technology,							// Sequencing technology used
			    	'Reads.Center':doc.Reads.Center,									// Sequencing center name
			    	'Reads.VCF':doc.Reads.VCF,											// iVARCall2 --noVCF gVCF file path
			    	'Reads.NbReads':doc.Reads.NbReads,									// Number of reads per paired file estimated by Bbmap in FASTQ_pair 2 and 1  
			    	'Reads.ReadsLength':doc.Reads.ReadsLength,							// Reads lenght parsed from FASTQC report by ARTwork
			    	'Reads.FASTQ_pair2':doc.Reads.FASTQ_pair2,							// Normalised reverse reads filepath
			    	'Reads.FASTQ_pair1':doc.Reads.FASTQ_pair1,							// Normalised forward reads filepath
			    	'Phylogeny.Serovar':doc.Phylogeny.Serovar,				// Serovar infered my in-silico MLST
			    	'Phylogeny.SequenceType':doc.Phylogeny.SequenceType,		// SequenceType infered after in-silico MLST
			    	'Phylogeny.Genus':doc.Phylogeny.Genus,					// Genus retrieved in ARTwork launching parameters
			    	'Phylogeny.Species':doc.Phylogeny.Species, 					// Species
			    	'Genome.Contigs':doc.Genome.Contigs,
			    	'Genome.GFF':doc.Genome.GFF,
			    	'Genome.Assembly':doc.Genome.Assembly,
			    	'Genome.GBK':doc.Genome.GBK,
			    	'Genome.QUAST':doc.Genome.QUAST,
			    	'Genome.Supplier':doc.Genome.Supplier
		  		};
		  		successCallback(attributes[attribute]); // Return the matching attributes as string
	        },
	        function(err) 
	        {
	            console.log("Model : error accesing ${docs}. ${err}");
	            return db.close();
	        }
	    );
	})
}

function filterByAttribute(attribute,value,successCallback) // Parse GAMeRdb data filtered by attribute=value and return all the matching JSON
{
	//console.log(`${attribute} for  ${value}`) //dev trace
	db.GENOME.find({[attribute]: value},function (err, docs) 
	{
		if(err)
		{
			console.log("err")
			return db.close(); //close DB CONNEXION
		}
		else
		{
	    	successCallback(docs); // return JSON results in callback
		}	
	})
}
// find everything in the database
function sendAllJson(successCallback) {
  db.GENOME.find((err, docs) => {
    if (err) {
      console.log('err');
      db.close(); // close DB CONNEXION
    } else {
      return successCallback(docs); // return JSON results in callback
    }
    return 'ok';
  });
}
// Export functions
exports.filterByAttribute = filterByAttribute;
exports.findAttribute = findAttribute;
exports.sendAllJson = sendAllJson;
