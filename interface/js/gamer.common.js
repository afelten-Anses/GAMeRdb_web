// ------------------------ Check if browser (user-agent) is Internet Explorer based ------------------------ //
var ms_ie = false;
var ua = window.navigator.userAgent;
var old_ie = ua.indexOf('MSIE ');
var new_ie = ua.indexOf('Trident/');
/* Used to fire only ONE post request. If true (one request fired) we'll call stopImmediatePropagation.
Without using this we had 3 requests fired after SemanticUI form validation. */
var doImmediatePropagationStop = false; // Returns whether event.stopImmediatePropagation() was ever called 
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

// Form validation
$('.ui.footer.form').form({
      fields: {
        name: {
          identifier  : 'name',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter your name'
            },
            {
              type   : 'minLength[3]',
              prompt : 'Please enter a real name'
            },
            {
              type   : 'regExp',
                value :  "[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$", // NaN
              prompt : 'Please enter a real name'
            }
          ]
        },
        mail: {
          identifier  : 'mail',
          rules: [
            {
              type   : 'email',
              prompt : 'Whaaat? Please enter a valid email adress'
            }
          ]
        },
        message: {
          identifier  : 'message',
          rules: [
            {
              type   : 'empty',
              prompt : 'Your forgotten to say something, please talk to us.'
            }
          ]
        }
      },
    onSuccess: function(event) {
        if(doImmediatePropagationStop===true){
            event.stopImmediatePropagation() 
            $('#contact').on('click', () => {
                window.alert("Request already submitted"); // needs a fix to not be called twice
            });
        }
        event.preventDefault();
        doImmediatePropagationStop=true;
    }
});
// Parse form and send it to back-end if its not errored.
$('.ui.footer.form').on('submit', function(e){
    e.preventDefault();
    if($('div.field.error').length === 0) {
        // Stock form data in a variable
        let ticket={};
        ticket.name=$('footer input')[0].value;
        ticket.mail=$('footer input')[1].value;
        ticket.message=$('footer textarea')[0].value;
        // Generate a ticket uuid
        let clientuuid=uuidv4()
        console.log("blabla")
        // Submit ticket using Ajax POST request
        $.ajax({
            url: "ticket/" +clientuuid,  
            type: 'POST',
            timeout:0,
            contentType: 'application/json', 
            data:ticket
        }).done(function(msg){
            //console.log(msg);
            console.log("ok");
            e.stopImmediatePropagation();
            e.preventDefault();
            $('span#userposition').text(msg) // update and show in the modal position in ticket waiting list from nodeJS response
            $('span#usermessage').text(ticket.message) // same for message sended, but retrieved from client side in place of NodeJS
            $('span#usermail').text(ticket.mail) // same, for mail address
            $('.ui.sucess.modal').modal('show');
        }).fail(function(request, status, err) {
            $('.ui.fail.modal').modal('show');
            console.log(err)
        })
    }
})