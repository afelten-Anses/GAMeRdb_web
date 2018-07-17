/**
     * @fileOverview GAMeRdbi Model  module. Performs MongoDB requests and
     * knows nothing about Controllers and views.
     * @author Kévin Durimel <k.durimel@gmail.com>
     * @version 0.99
     */

/* ///////////////////////////////////////////////////////////////////
                        ----- MODEL init  -----
 ///////////////////////////////////////////////////////////////// */

// NodeJS modules
const mongojs = require('mongojs') // MongoDB driver
//const db = mongojs('mongodb://127.0.0.1:27017/GAMeRdb',['GENOME']) // dev
const db = mongojs('Kindle:Amazon@localhost/GAMeRdb',['GENOME']) // Connecting to MongoDB with mongoJS


// ------------- NodeJS modules ------------- //
const mongojs = require('mongojs'); // MongoDB driver


/* ///////////////////////////////////////////////////////////////////
                    ----- Starts here -----
 ///////////////////////////////////////////////////////////////// */

const db = mongojs('Kindle:Amazon@localhost/GAMeRdb', ['GENOME']); // Connecting to MongoDB using mongoJS
// const db = mongojs('mongodb://127.0.0.1:27017/GAMeRdb',['GENOME']) // dev

/* Parse GAMeRdb data filtered by attribute=value and return only the macthing attribute */
function findAttribute(attribute, value, successCallback) {
  console.log(`${attribute} for  ${value}`); // debug
  db.GENOME.find({ [attribute]: value }, (err, docs) => {
    // docs is an array containing all documents from a collection
    docs.forEach(
      (doc) => {
        /* attributes is an array in order to convert the "attribute arg" from string
        to a MongoJS request ( arg -->  doc.arg) */
        const attributes = {
          _id: doc._id, // MongoDB object ID
          SampleID: doc.SampleID, // Anses Sample ID
          Project: doc.Project, // Anses Project name
          Report: doc.Report, // ARTwork text report
          Center: doc.Reads.Center, // Sequencing center
          'Reads.FASTQC_pair2': doc.Reads.FASTQC_pair2, // FastQC html report (reverse reads)
          'Reads.FASTQC_pair1': doc.Reads.FASTQC_pair1, // FastQC html report (forward reads)
          'Reads.Technology': doc.Reads.Technology, // Sequencing technology used
          'Reads.Center': doc.Reads.Center, // Sequencing center name
          'Reads.VCF': doc.Reads.VCF, // iVARCall2 --noVCF gVCF file path
          'Reads.NbReads': doc.Reads.NbReads, // Number of reads per paired file estimated by Bbmap in FASTQ_pair 2 and 1  
          'Reads.ReadsLength': doc.Reads.ReadsLength, // Reads lenght parsed from FASTQC report by ARTwork
          'Reads.FASTQ_pair2': doc.Reads.FASTQ_pair2, // Normalised reverse reads filepath
          'Reads.FASTQ_pair1': doc.Reads.FASTQ_pair1, // Normalised forward reads filepath
          'Phylogeny.Serovar': doc.Phylogeny.Serovar, // Serovar infered my in-silico MLST
          'Phylogeny.SequenceType': doc.Phylogeny.SequenceType, // SequenceType infered after in-silico MLST
          'Phylogeny.Genus': doc.Phylogeny.Genus, // Genus retrieved in ARTwork launching parameters
          'Phylogeny.Species': doc.Phylogeny.Species, // Species
          'Genome.Contigs': doc.Genome.Contigs, // Contigs
          'Genome.GFF': doc.Genome.GFF, // GFF annnotation
          'Genome.Assembly': doc.Genome.Assembly, // Scaffolds
          'Genome.GBK': doc.Genome.GBK, // GBK annotation
          'Genome.QUAST': doc.Genome.QUAST, // QUAST report
          'Genome.Supplier': doc.Genome.Supplier // Supplier
        };
        successCallback(attributes[attribute]); // Return the matching attributes as string
      },
      // handle error accessing MongoDB data
      (modelErr) => {
        console.log(`Model - findAttribute: error accesing ${docs}. ${modelErr}`);
        return db.close();
      }
    );
  });
}

/* Parse GAMeRdb data filtered by attribute=value and return all the matching JSON */
function filterByAttribute(attribute, value, successCallback) {
  db.GENOME.find({ [attribute]: value }, (err, docs) => {
    if (err) {
      console.log(`Model - filterByAttribute: error accesing [${attribute}]:${value} --> ${err}`);
      return db.close();
    }
    return successCallback(docs); // return JSON results in callback
  });
}

/* Send all the database as JSON */
function sendAllJson(successCallback) {
  db.GENOME.find((err, docs) => {
    if (err) {
      console.log('Model - SendAllJson : ', err);
      db.close(); // close DB CONNEXION
    }
    return successCallback(docs); // return JSON results in callback
  });
}

/* ///////////////////////////////////////////////////////////////////
            ----- Export functions  -----
  ///////////////////////////////////////////////////////////////// */
exports.filterByAttribute = filterByAttribute;
exports.findAttribute = findAttribute;
exports.sendAllJson = sendAllJson;
