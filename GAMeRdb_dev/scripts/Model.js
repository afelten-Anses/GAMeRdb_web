var direBonjour = function() {
    console.log('Bonjour !');
    return "ma var"
}

var direByeBye = function() {
    console.log('Bye bye !');
}

//Export functions 
exports.direBonjour = direBonjour;
exports.direByeBye = direByeBye;