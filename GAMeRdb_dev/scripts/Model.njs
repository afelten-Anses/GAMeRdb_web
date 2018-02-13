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