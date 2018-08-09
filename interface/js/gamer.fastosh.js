var isTextFile = false ;
var fileContentCleanArray =""
$('.ui.accordion').accordion();
// File listener : retrieve ids from a client-side text file
document.getElementById('fastoshInput').addEventListener('change', readFile, false);

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
       }
      reader.readAsText(file,"utf8")
       isTextFile = true ;
    }

// Click listener: retrieve ids from the Fastohs's form page
$('#run').click(function (e) {
    e.preventDefault()
    var idList = null
    var idJson = {}
    // if ids came from text form
    if (isTextFile==false){
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
    }
    // if ids come from file form
    else {
        for (var i = 0; i < fileContentCleanArray.length; i++) {
            // use for-in to browse only idJson own properties (= not from its prototype)
            if (Object.prototype.hasOwnProperty.call(fileContentCleanArray, i)) {
                idJson[i] = fileContentCleanArray[i];
            }
        }
        console.log(idJson)
    }
    let clientuuid=uuidv4();
    $('#run').replaceWith('<button class="ui disabled button" type="submit" id="run"> Running... </button>')
    $('#run').append('<div class="ui active inline tiny loader"></div>');
    $('#reset').transition('horizontal flip')
    $('#reset').append('<div class="ui active inline tiny loader"></div>');
    $('.ui.form.seven.wide.column.centered').append(`<br/>Fastosh is running, the process may last a long time, click <a href="../../tools/fastosh_results.html?tree=${clientuuid}">here</a> to see your results if you are not redirected after 2 minutes.`);
    
            $.ajax({
                url: document.URL+"/"+clientuuid, 
                timeout: 0, //secs
                type: 'POST', 
                contentType: 'application/json', 
                data: idJson
            })
            .done(function(msg){
            console.log('form submitted. Response payload: '+ msg);
            window.location="../../tools/fastosh_results.html?tree="+msg // change window.location in order to launch dl;
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
})
// help tutorial
$("#helpme").click(function()
{
    $('.longer.modal').modal({
    inverted: false
  }).modal('show');
});


