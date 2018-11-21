var colors = ['#EA614A', '#20649B', '#008836', '#6B96CA', '#A38456', '#A87A93', '#D19C95'];

var strany = ['SPD', 'KSČM', 'Piráti', 'ANO 2011', 'ODS', 'ČSSD', 'KDU-ČSL', 'TOP 09', 'ostatní'];

var nespokojeni = [54, 50, 40, 30, 27, 26, 25, 25, 36];

$(function () {

Highcharts.setOptions({
        lang: {
            months: ['leden', 'únor', 'březen', 'duben', 'květen', 'červen', 'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec'],
            weekdays: ['neděle', 'pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota'],
            shortMonths: ['leden', 'únor', 'březen', 'duben', 'květen', 'červen', 'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec'],
            thousandsSep: ' ',
            decimalPoint:',',
            rangeSelectorZoom: 'Zobrazit'
        }
    });

Highcharts.chart('nespokojenost', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Nespokojenost se společností a politikou'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: strany
    },
    yAxis: {
        title: {
            text: 'podíl nespokojených voličů'
        },
        labels: {
            formatter: function () {
                return this.value + '%';
            }
        }
    },
    tooltip: {
        pointFormat: '{point.series.name}: <b>{point.y} %</b><br/>',
    },
    exporting: {
        enabled: false
    },
    legend: {
        enabled: false
    },
    credits: {
        href: '',
        text: 'Zdroj: Median'
    },
    series: [{
        name: 'Nespokojenost',
        data: nespokojeni,
        color: colors[0]
    }]
});

})
