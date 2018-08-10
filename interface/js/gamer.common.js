// ------------------------ Check if browser (user-agent) is Internet Explorer based ------------------------ //
var ms_ie = false;
var ua = window.navigator.userAgent;
var old_ie = ua.indexOf('MSIE ');
var new_ie = ua.indexOf('Trident/');
if ((old_ie > -1) || (new_ie > -1)) 
{
    ms_ie = true;
}
if(ms_ie)
{
    window.alert('This website does not supports old web browsers, please use a recent web browser and retry')
    console.log("msie")
}
// ------------------------ Functions init ------------------------ //
// return true if a full string (word) (not a substring) is contained in a other string(sentence)
function wordInString(sentence, word) {
return new RegExp( '\\b' + word + '\\b', 'i').test(sentence);
}

// Generate uuids
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Async sleep
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
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

let a="tools"
let b="species"

switch(true){
    case wordInString(suburl,a):
        $('#tools').attr('id','tools_colored')
        //console.log("a")
    case wordInString(suburl,b):
        let species=window.location.pathname.split("/")[2] // retrieve species name based on sub-url (pathname)
        $("#"+species).attr('class','active item') //colorize item (=change class to active item) based on url (species page)
        //console.log("b")
}

// ------------------------ Footer form submit action ------------------------ //
$('.ui.footer.form').on('submit', function(e){
    e.preventDefault()
    // Stock form data in a variable
    let ticket={};
    ticket.name=$('footer input')[0].value;
    ticket.mail=$('footer input')[1].value;
    ticket.message=$('footer textarea')[0].value;
    // Generate a ticket uuid
    let clientuuid=uuidv4()
    // Submit ticket using Ajax POST request
    $.ajax({
        url: "ticket/" +clientuuid,  
        type: 'POST',
        timeout:0,
        contentType: 'application/json', 
        data:ticket
    }).done(function(msg){
        console.log(msg);
        console.log("ok");
        $('span#position').text(msg) // position in ticket waiting list
        $('.ui.sucess.modal').modal('show');
    }).fail(function(request, status, err) {
        $('.ui.fail.modal').modal('show');
        console.log(err)
    })
})

/*$(document).ready(function() {
     $('.ui.sucess.modal').modal('show');
});*/