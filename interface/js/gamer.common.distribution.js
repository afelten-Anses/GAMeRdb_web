// All functions used for distributions pages are initialized here.
function makeHighChartsCC(speciesJson,speciesName){
    $(document).ready(function() {
        this.data= speciesJson
        // Compute CC distribution
        const listCC=_.countBy(data, function(e) { return e.Phylogeny.ClonalComplex })
        Highcharts.chart('distribution', {
            chart: {
            type: 'column'
            },
            title: {
            text: ''
            },
            subtitle: {
            text: ''
            },
            xAxis: {
            // --> CC1, 2 etc... JSON keys!
            categories: Object.keys(listCC),
            crosshair: true
            },
            yAxis: {
            min: 0,
            title: {
            text: ''
            }
            },
            tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:1f} strains</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
            },
            plotOptions: {
            column: {
            pointPadding: 0,
            borderWidth: 0,
            groupPadding: 0,
            color:'#2C3E50',
            shadow: false
            }
        },
        series: [
            {
                name: speciesName,
                // CC value for each JSON key!
                data: Object.values(listCC)
            }
        ]
        });    
    });
}
function makeHighChartsST(speciesJson,speciesName){
    $(document).ready(function() {
        this.data= speciesJson
        // Compute CC distribution
        const listCC=_.countBy(data, function(e) { return e.Phylogeny.SequenceType})
        Highcharts.chart('distribution', {
            chart: {
            type: 'column'
            },
            title: {
            text: ''
            },
            subtitle: {
            text: ''
            },
            xAxis: {
            // --> CC1, 2 etc... JSON keys!
            categories: Object.keys(listCC),
            crosshair: true
            },
            yAxis: {
            min: 0,
            title: {
            text: ''
            }
            },
            tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:1f} strains</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
            },
            plotOptions: {
            column: {
            pointPadding: 0,
            borderWidth: 0,
            groupPadding: 0,
            color:'#2C3E50',
            shadow: false
            }
        },
        series: [
            {
                name: speciesName,
                // CC value for each JSON key!
                data: Object.values(listCC)
            }
        ]
        });    
    });
}
function makeHighChartsSerovar(speciesJson,speciesName){
    $(document).ready(function() {
        this.data= speciesJson
        // Compute CC distribution
        const listCC=_.countBy(data, function(e) { return e.Phylogeny.Serovar })
        Highcharts.chart('distribution', {
            chart: {
            type: 'column'
            },
            title: {
            text: ''
            },
            subtitle: {
            text: ''
            },
            xAxis: {
            // --> CC1, 2 etc... JSON keys!
            categories: Object.keys(listCC),
            crosshair: true
            },
            yAxis: {
            min: 0,
            title: {
            text: ''
            }
            },
            tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:1f} strains</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
            },
            plotOptions: {
            column: {
            pointPadding: 0,
            borderWidth: 0,
            groupPadding: 0,
            color:'#2C3E50',
            shadow: false
            }
        },
        series: [
            {
                name: speciesName,
                // CC value for each JSON key!
                data: Object.values(listCC)
            }
        ]
        });    
    });
}