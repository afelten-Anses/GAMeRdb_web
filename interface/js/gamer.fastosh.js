//--//--// Init //--//--// 
var fileContentCleanArray =""; // array that will contains form data
$('.ui.accordion').accordion(); // SemanticUi accordion effect
// Help tutorial pop on click
$("#helpme").click(function() {
    $('.longer.modal').modal({
    inverted: false
  }).modal('show');
});
//--//--// File listener : retrieve ids from a client-side text file //--//--//
document.getElementById('fastoshInput').addEventListener('change', readFile, false); // file event form listener
// -- Read file when file event form happens -- // 
function readFile (evt) {
    let files = evt.target.files;
    let file = files[0];           
    let reader = new FileReader();
    reader.onload = function(event) {
        console.log(event.target.result);
        let fileContent = event.target.result
        let fileContentClean = fileContent.replace(/^\s+|\s+$/g, '') // delete traling spaces
        fileContentCleanArray = fileContentClean.split("\n") // construct array where 1 line = 1 element.
        console.log(fileContentCleanArray)
        // -- append file content to text form for form validation and submit -- // 
        let fillform = "";
        for (var i = 0; i < fileContentCleanArray.length; i++) {
            fillform=fillform + fileContentCleanArray[i] + '\n';   
        }
        fillform.replace(/^\s+|\s+$/g, ""); // trim possible blanklines
        $('textarea')[0].append(fillform) 
    }
    reader.readAsText(file,"utf8") // Read as utf8 text file
}

$(document).ready(function() {
    //--//--// Form validation //--//--//
    $('.ui.fastosh.form').form({
      fields: {
        ids: {
          identifier  : 'ids',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter ids'
            },
            {
              type   : 'regExp',
                value :  '[A-Za-z0-9]*([a-zA-Z]+[0-9_]+|[0-9_]+[a-zA-Z\n]+)', // only letters (up or lowercase) with number with underscore and dash and newline.
              prompt : 'Please enter a valid id'
            }
          ]
        }
      }
    });

    //--//--// Click listener: retrieve ids from the Fastohs's text form //--//--//
    $('.ui.fastosh.form').on('submit', function(e){
        e.preventDefault()
        var idList = null
        var idJson = {}
        if ($('textarea')[0].value != ""){
            idList = $('textarea')[0].value.split("\n");
            for (var i = 0; i < idList.length; i++){
                if (idList[i] !== "") {
                    idJson[i] = idList[i]
                }
            }
                console.log(idJson)
        } else {
            idList = $('input')[0].value
            console.log(idJson)
        }

         //If form is valid (there is no error div, so its length = 0), so process DOM update and POST request
        if($('.ui.form.seven.wide.column.centered.error').length === 0) {
            let clientuuid=uuidv4();
            $('#run').replaceWith('<button class="ui disabled button" type="submit" id="run"> Running... </button>')
            $('#run').append('<div class="ui active inline tiny loader"></div>');
            $('#reset').transition('horizontal flip')
            $('#reset').append('<div class="ui active inline tiny loader"></div>');
            $('.ui.form.seven.wide.column.centered').append(`<br/>Fastosh is running, the process may last a long time, click <a href="../../tools/fastosh_results?tree=${clientuuid}">here</a> to see your results if you are not redirected after 2 minutes.`);
            $.ajax({
                url: document.URL+"/"+clientuuid, 
                timeout: 0, //secs
                type: 'POST', 
                contentType: 'application/json', 
                data: idJson
            })
            .done(function(msg){
            console.log('form submitted. Response payload: '+ msg);
            window.location="../../tools/fastosh_results?tree="+msg // change window.location in order to launch dl;
            //console.log('POST response payload');
            //$('.basic.modal.preparing').modal('hide')
            //console.log("got : \n"+JSON.stringify(idJson))
            }).fail(function(request, status, err) {
                if (status == "timeout") {
                    // timeout -> reload the page and try again
                    console.warn("timeout");
                    //window.location.reload();
                } 
                else {
                    // report error to client
                    console.warn('POST request failed for FasTosh');
                    $('.ui.form.seven.wide.column.centered').append('<font color="red">...Process failed! Please contact us </font>');
                }
            })
        }
    })
})
