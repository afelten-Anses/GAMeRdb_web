// Turn-on semanticUI modules
$('.ui.accordion')
  .accordion()
;

// Rounds a float value at n decimals precision : used in highcharts percentages computation
        function round(value, decimals) 
        {
            return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
        }
        
        // ------------ Retrieve GAMeRdb info in JSON files ------------ //
        
        // Separe JSON info by species in specific JSONs
        let closJSON=_.filter(JSONstring, function(a){ return a.Phylogeny && a.Phylogeny.Genus === "Clostridium"; });
        let lisJSON=_.filter(JSONstring, function(a){ return a.Phylogeny && a.Phylogeny.Genus === "Listeria"; });
        let staphJSON=_.filter(JSONstring, function(a){ return a.Phylogeny && a.Phylogeny.Genus === "Staphylococcus"; });
        let salmoJSON=_.filter(JSONstring, function(a){ return a.Phylogeny && a.Phylogeny.Genus === "Salmonella"; });
        // Store Species CC/ST/Serovar distributon
        var salmoSeroDistri=_.countBy(salmoJSON, function(e) { return e.Phylogeny.Serovar })
        var listCcDistri=_.countBy(lisJSON, function(e) { return e.Phylogeny.ClonalComplex })
        var listStDistri=_.countBy(lisJSON, function(e) { return e.Phylogeny.SequenceType })
        var staphStDistri=_.countBy(staphJSON, function(e) { return e.Phylogeny.SequenceType})
        // CC/ST/Serovar distribution in a Highcharts comaptible format (nested array)
        var salmoSeroDistriHighcharts=[] // Salmonella 
        var lisCcDistriHighcharts=[] // Listeria CC 
        var lisStDistriHighcharts=[] // Listeria ST 
        var staphStDistriHighcharts=[] // Staphylococcus ST 
        
        // ------------ Use JSON files infos for Highcharts ------------ //
        
        /* Convert CC/ST/Serovar distribution JSON (JSONsource) in a nested array (arrayToFeed)
        adding some legend (taxonomyLegend) for Highcharts */
        function makeHigchartsArray(JSONsource,arrayTofeed,taxonomyLegend)
        {
           $.each(JSONsource, function(key, value)
            {
               //console.log(key + ": " + value); 
               arrayTofeed.push([taxonomyLegend+key,value])
            })  
        }          
        
        makeHigchartsArray(salmoSeroDistri,salmoSeroDistriHighcharts,"")
        makeHigchartsArray(listCcDistri,lisCcDistriHighcharts,"")
        makeHigchartsArray(listStDistri,lisStDistriHighcharts,"ST: ")
        makeHigchartsArray(staphStDistri,staphStDistriHighcharts,"ST: ")
        
        // ------------ Generating highcharts ------------ //
        Highcharts.chart('HighchartsContainer', {
        chart: {
        type: 'pie',
        backgroundColor:'transparent',
        // Update data labels and tooldip when drilldown
        events: {
            drilldown: function(options) 
                {
                  /*this.yAxis[0].update({
                    labels: 
                    {
                        format: '{value}' 
                    }
                  }, false, false);*/

              options.seriesOptions.dataLabels = {
                format: '{point.name}: {point.y}' // do not show % on label
              };

              options.seriesOptions.tooltip = {
                pointFormat: '<span style="color:{point.color}">{point.name} : {point.y} strains</span>' // do not show % on hover
                };
            }
        }
    },
    title: {
        text: '' // charts title
    },
    subtitle: {
        text: '' //charts subtitile
    },
     plotOptions: {
        pie: {
            allowPointSelect: true, //selectable chart
            cursor: 'pointer', // cursor on select
            innerSize:'75%', // piechart innersize (0: fully filled)
            dataLabels: {
                enabled: true, //allow data labels
                format: '<b>{point.name}</b>: {point.y} ({point.x}%)', //data labels format
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    },

    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.x}%</b><br/>'
    },

    "series": [
        {
            "name": "Species",
            "colorByPoint": true,
            "data": [
                {
                    "name": "Clostridium",
                    "y": closJSON.length,
                    "x":round(((closJSON.length/JSONlength)*100),1),
                    // no CC/ST/Serovar distribution available for Clostridium : no drilldown
                },
                {
                    "name": "Listeria",
                    "y": lisJSON.length,
                    "x":round(((lisJSON.length/JSONlength)*100),2),
                    "drilldown": "CC and ST"
                },
                {
                    "name": "Salmonella",
                    "y": salmoJSON.length,
                    "x":round(((salmoJSON.length/JSONlength)*100),2),
                    "drilldown": "Salmonella"
                },
                {
                    "name": "Staphylococcus",
                    "y": staphJSON.length,
                    "x":round(((staphJSON.length/JSONlength)*100),2),
                    "drilldown": "Staphylococcus"
                }
            ]
        }
    ],
    "drilldown": { // drilldown = series inside the series : deep level 1
        "series": [
            {
                "name": "Salmonella ST distribution",
                "id": "Salmonella",
                "data": salmoSeroDistriHighcharts
            },
            {
                "name": "Staphylococcus ST distribution",
                "id": "Staphylococcus",
                "data": staphStDistriHighcharts
            },
            {
                "name": "CC and ST",
                "id":"CC and ST",
                "data":[
                    {
                        "name":"listeria CC",
                        "id":"CcLisTotal",
                        "y":lisCcDistriHighcharts.length,
                        "drilldown":"CcLisDetail" //reference to drilldown level 2
                    },
                    {
                        "name":"listeria ST",
                        "id":"StLisTotal",
                        "y":lisStDistriHighcharts.length,
                        "drilldown":"StLisDetai" // reference to drilldown level 2
                    }
                ]
            },
            {
                "name":"Listeria CC distribution",
                "id":"CcLisDetail",
                "data": lisCcDistriHighcharts //listeria cc distribution array
            },
            {
                "name":"Listeria ST distribution",
                "id":"StLisDetai",
                "data": lisStDistriHighcharts //listeria st distribution array
            }
            
        ]
    }
}); 

// ----------------- Functions to retrieve each ids matching a CC/ST/Serovar value  (currently not used) ----------------- // 
        
 //filter a species JSON (json) (ex:lisJSON) and returns the SampleIDs matching the value(val, can be a ST) (ex:"7") 
function filterbyST(json,val)
{
    let filtered=_.filter(json, function(a){ return a.Phylogeny && a.Phylogeny.SequenceType === val && a.SampleID; });
    let results=[]
    for(i in filtered)
    {
        results.push(filtered[i].SampleID)
    }
    return results
}
//filter a species JSON (json) (ex:lisJSON) and returns the SampleIDs matching the value(val, can be a CC) (ex:"10") 
function filterbyCC(json,val)
{
    let filtered=_.filter(json, function(a){ return a.Phylogeny && a.Phylogeny.ClonalComplex === val && a.SampleID; });
    let results=[]
    for(i in filtered)
    {
        results.push(filtered[i].SampleID)
    }
    return results
}
//filter a species JSON (json) (ex:lisJSON) and returns the SampleIDs matching the value(val, can be a Serovar) (ex:"Derby") 
function filterbySerovar(json,val)
{
    let filtered=_.filter(json, function(a){ return a.Phylogeny && a.Phylogeny.Serovar === val && a.SampleID; });
    let results=[]
    for(i in filtered)
    {
        results.push(filtered[i].SampleID)
    }
    return results
}
