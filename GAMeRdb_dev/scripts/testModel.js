const model = require('./Model.njs'); // use Model.js as a NodeJS module
attr=model.searchAttributeBySpecies('Phylogeny.Serovar','Salmonella'); 
console.log(attr);