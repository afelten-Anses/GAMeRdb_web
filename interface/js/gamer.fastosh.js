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
                console.log(idList)
            }
        })
// help tutorial
$("#helpme").click(function()
{
    $('.longer.modal').modal({
    inverted: false
  }).modal('show');
});