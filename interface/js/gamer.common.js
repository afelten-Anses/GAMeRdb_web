function wordInString(sentence, word) // return true if a full string (word) (not a substring) is contained in a other string(sentence)
{
return new RegExp( '\\b' + word + '\\b', 'i').test(sentence);
}

// ------------------------ Colorize item based on the active page url pathname ------------------------ //

let suburl=window.location.pathname // retrive url pathname

/*//Colorize tools item if we are in a tools page
if(wordInString(suburl,"tools"))
{
    $('#tools').attr('id','tools_colored')
}
//Colorize species items based on url if we are in a species based page
if(wordInString(suburl,"species"))
{
    let species=window.location.pathname.split("/")[2] // retrieve species name based on sub-url (pathname)
    $("#"+species).attr('class','active item') //colorize item (=change class to active item) based on url (species page)
}*/

let a = "tools"
let b ="species"

switch(true){
    case wordInString(suburl,a):
        $('#tools').attr('id','tools_colored')
        console.log("a")
    case wordInString(suburl,b):
        let species=window.location.pathname.split("/")[2] // retrieve species name based on sub-url (pathname)
        $("#"+species).attr('class','active item') //colorize item (=change class to active item) based on url (species page)
        console.log("b")
}