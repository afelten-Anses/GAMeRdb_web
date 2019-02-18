// Modules NodeJS

const mongojs = require('mongojs'); // MongoDB driver
const fs = require('fs'); // file parser
const args = require('commander'); // arguments parser
const shell = require('shelljs'); // run bash scripts from NodeJS
// const uuidv4 = require('uuid/v4'); // uuid version 4


// Options

args // App usage (help)
  .option('--dbuser', 'identifiant mongodb')
  .option('--dbpassword', 'mot de passe mongodb')
  .parse(process.argv);


// Conversion du JSON en liste d'id

const idJson = {};
idJson[0] = "LV0877"
idJson[1] = "IN4"
idJson[2] = "BO18"
idJson[3] = "99EB04LM"

const idList = [];
for (let i = 0; i < Object.keys(idJson).length; i += 1) {
  idList.push(idJson[i]);
}
console.log(idList);
// console.log(args.dbuser)
// console.log(args.dbpassword)


// Connection à la base de données GAMeRdb
let db;
if (args.dbuser !== undefined && args.dbpassword !== undefined) {
  db = mongojs('mongodb://' + process.argv[3] + ':' + process.argv[5] + '@localhost/GAMeRdb', ['GENOME']); // Connection à la base de données GAMeRdb dans la collection GENOME avec mongojs
} else {
  db = mongojs('mongodb://127.0.0.1:27017/GAMeRdb', ['GENOME']);
}


// Requête de récupération des chemins et écritur du fichier contenant les chemins

// uuid = uuidv4();
const directoryName = 'Fastosh_' + "lol" + '/';
const directoryPath = 'tmp/' + directoryName;
const fileName = 'sketch_paths.tsv';

shell.exec('mkdir ' + directoryPath, { async: false }); // Création du dossier temporaire

function getPaths(attribute, value, successCallback) {
  db.GENOME.find({ [attribute]: value }, (err, docs) => {
    if (err) {
      console.log(`fastosh - getPaths: error accessing [${attribute}]:${value} --> ${err}`);
      return db.close();
    }
    return successCallback(docs); // return JSON results in callback
  });
}

fs.open(directoryPath + fileName, 'w', (err) => {
  if (err) throw err;
  console.log('File opened!');
});

for (let i = 0; i < idList.length; i += 1) {
  getPaths('SampleID', idList[i], (result) => {
    const path = result[0].Genome.Sketch; // file path to msh files
    fs.appendFile(directoryPath + fileName, path + '\n', (err) => {
      if (err) throw err;
      console.log('Path appended!');
    });
  });
}

// Réalisation de l'inférence taxonomique

shell.exec('python ../../FasTosh_web.py -i ' + directoryPath + fileName + ' -u ' + directoryPath + ' -o ' + directoryPath + 'distance_matrix -e ' + directoryPath + 'taxonomy -T 10', { async: true });

// const nbTreads = 38;

// shell.exec("srun --cpus-per-task=" + nbTreads + " --nodelist=SAS-PP-LSCALC1 python FasTosh_web.py -i " + directoryPath + fileName + " -u " + directoryPath + " -o " + directoryPath + "distance_matrix" + " -e " + directoryPath + "taxonomy" + " -T " + nbTreads, { async: true });