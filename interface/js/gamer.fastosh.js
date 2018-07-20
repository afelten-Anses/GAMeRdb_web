$('.ui.accordion').accordion();
// Retrieve ids from the Fastohs's form page
$('#run').click(function (e) {
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
    let clientuuid=uuidv4()
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
                    // another error occured  
                    //$('.ui.indeterminate.big.text.loader').html('It seems like you requested a lot of files. \
                    //<br/>You\'ll be able to retrieve them under 5-10 minutes by clicking <a //ref="http://192.168.184.133:3000/tmp/'+clientuuid+'/wgsdata_'+clientuuid+'.zip'+'">here</a>');
                    console.warn('file maybe available in tmp/'+clientuuid)
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