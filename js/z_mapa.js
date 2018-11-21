var isFirefox = typeof InstallTrigger !== 'undefined';
var isIE = /*@cc_on!@*/false || !!document.documentMode;
var isEdge = !isIE && !!window.StyleMedia;

var data;

var base = new ol.layer.VectorTile({
    declutter: true,
    source: new ol.source.VectorTile({
        attributions: '© <a target="_blank" href="https://www.mapbox.com/map-feedback/">Mapbox</a>, ' +
        '© přispěvatelé <a target="_blank" href="https://www.openstreetmap.org/copyright">' +
        'OpenStreetMap</a>, ' + 
        'data a model <a target="_blank" href="http://www.median.eu">' +
        'Median</a>',
        format: new ol.format.MVT(),
        url: 'https://data.irozhlas.cz/tiles/{z}/{x}/{y}.pbf'
    })
});

var tema = new ol.layer.VectorTile({
    declutter: true,
    source: new ol.source.VectorTile({
        format: new ol.format.MVT(),
        url: './tiles/{z}/{x}/{y}.pbf'
    })
});

var map = new ol.Map({
    target: 'map',
    interactions: ol.interaction.defaults({mouseWheelZoom:false}),
    view: new ol.View({
        center: ol.proj.transform([15.3350758, 49.7417517], 'EPSG:4326', 'EPSG:3857'),
        zoom: 7
    })
});

$.getJSON('https://data.irozhlas.cz/mapa-kvality-zivota/data/data.json', function(d) {
    data = d;
    olms.applyStyle(base, positronStyle, 'openmaptiles').then(function() {
        map.addLayer(base);
        map.addLayer(tema);
    });
  });

var cols = {
    'nezam': 'Nezaměstnanost',
    'emise': 'Emise',
    'doziti_m': 'Naděje dožití mužů',
    'rozvody': 'Rozvodovost',
    'ned_ms': 'Dostupnost MŠ',
    'ned_ss': 'Dostupnost SŠ',
    'ned_zdrav': 'Dostupnost zdrav. zař.',
    'exe': 'Podíl exekucí',
    'prumysl': 'Podíl prac. v průmyslu',
    'bezpecnost': 'Bezpečnost',
    'prirust': 'Přírůstek obyvatel',
    'verici': 'Procento věřících',
    'ned_net': 'Dostupnost internetu',
    'vz_okr': 'Vzdálenost k okr. městu'
};

var radios = '<div id="closeslid">&#x2612;</div><h3>Na čem vám záleží?</h3><div><div class="butt" id="deselect">Vypnout vše</div><div class="butt" id="modmedian">model Median</div></div>'
        + '<table><tr class="thead"><th></th><th><div class="rotate">vůbec</div></th><th><div class="rotate">trochu</div></th><th><div class="rotate">hodně</th></div></tr>';
Object.keys(cols).forEach(function(key){
    radios += '<tr><td>' + cols[key] + '</td>'
        + '<td><input class="rad_dis" type="radio" id="0_' + key + '" name="' + key + '" value="0" /></td>'
        + '<td><input class="rad_med" type="radio" id="05_' + key + '" name="' + key + '" value="1" checked /></td>'
        + '<td><input type="radio" id="1_' + key + '" name="' + key + '" value="2"/></td>'
        + '</tr>'
});
radios += '</table>'
document.getElementById('sliderbox').innerHTML = radios;

$('#deselect').click(function() {
    $('.over').show()
    $('.rad_dis').prop('checked',true);
    Object.keys(koef_user).forEach(function(v) {
        koef_user[v] = 0;
    });
    window.setTimeout(function() {
        updateMap()
        $('.over').hide()
    }, 100)
});

$('#modmedian').click(function() {
    $('.over').show()
    $('.rad_med').prop('checked', true);
    Object.keys(koef_user).forEach(function(v) {
        koef_user[v] = 1;
    });
    window.setTimeout(function() {
        updateMap()
        $('.over').hide()
    }, 100)
});

$('#showsliders').click(function() {
    $('#showsliders').hide()
    $('#sliderbox').show()
});

$('#closeslid').click(function() {
    $('#sliderbox').hide()
    $('#showsliders').show()
});

function updateMap() {
// prepocitat mins a maxs modelu
    var sums = [];
    Object.values(data).forEach(function(obec) {
        var sm = 0.50519; //intercept
        Object.keys(cols).forEach(function(c) {
            sm += (obec[c] * koef[c][koef_user[c]]);
        })
        sums.push(1 - sm)
    });

    //rescaling scale
    var gs = new geostats(sums);
    var breaks = gs.getClassJenks(5);
    if (breaks[1] === breaks[4]) {
        colScl.domain([0.5]);
        colScl.range([
            'rgba(215,25,28,0.8)',
            'rgba(26,150,65,0.8)'
        ]);
    } else {
        colScl.domain(breaks.slice(1,5));
        colScl.range([
            'rgba(215,25,28,0.8)',
            'rgba(253,174,97,0.8)',
            'rgba(255,255,191,0.8)',
            'rgba(166,217,106,0.8)',
            'rgba(26,150,65,0.8)'
        ]);
    };
    scl.domain([Math.min.apply(null, sums), Math.max.apply(null, sums)]); 
    tema.changed();
};

$('input[type=radio]').change(function(e) {
    $('.over').show()
    koef_user[e.currentTarget.name] = parseFloat(e.currentTarget.defaultValue);
    window.setTimeout(function() {
        updateMap()
        $('.over').hide()
    }, 100)
});

var koef = {
    'exe': [0, 0.02407, 1],
    'nezam': [0, 0.01684, 1],
    'emise': [0, 0.01175, 1],
    'ned_ms': [0, 0.00895, 1],
    'vz_okr': [0, 0.00866, 1],
    'ned_zdrav': [0, 0.00843, 1],
    'ned_ss': [0, 0.00797, 1],
    'prumysl': [0, 0.00768, 1],
    'ned_net': [0, 0.00651, 1],
    'rozvody': [0, 0.00459, 1],
    'verici': [0, -0.0049, -1],
    'bezpecnost': [0, -0.01194, -1],
    'prirust': [0, -0.01473, -1],
    'doziti_m': [0, -0.01692, -1]
};

 var koef_user = {
    'nezam': 1,
    'emise': 1,
    'doziti_m': 1,
    'rozvody': 1,
    'ned_ms': 1,
    'ned_ss': 1,
    'ned_zdrav': 1,
    'exe': 1,
    'prumysl': 1,
    'bezpecnost': 1,
    'prirust': 1,
    'verici': 1,
    'ned_net': 1,
    'vz_okr': 1
 };

var scl = d3.scale.linear().domain([0.15695, 0.66587]).range([0, 1]);
var colScl = d3.scale.threshold().domain([0.3623311146, 0.44054185010000013, 0.4925579339, 0.5404225044]).range([
    'rgba(215,25,28,0.8)',
    'rgba(253,174,97,0.8)',
    'rgba(255,255,191,0.8)',
    'rgba(166,217,106,0.8)',
    'rgba(26,150,65,0.8)'
]);

function getIndex(ftr) {
    var ob = data[ftr.Kod];
    if (ob == undefined) {
        return [-1, null]
    };
    var index = 0.50519; //intercept
    Object.keys(cols).forEach(function(c) {
        index += (ob[c] * koef[c][koef_user[c]]);
    })
    return [1 - index, ob];
};

function omitCol(v) {
    if (v == -1) {
        return 'rgba(255,255,255,0)';
    } else {
        return colScl(v);
    };
};

function getColor(ftr) {
    var style = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: "lightgray",
      width: 0.3
    }),
    fill: new ol.style.Fill({
      color: omitCol(getIndex(ftr)[0]),
      opacity: 0.5
    })
  })
  return style;
};

var tema = new ol.layer.VectorTile({
    declutter: true,
    source: new ol.source.VectorTile({
        format: new ol.format.MVT(),
        url: 'https://data.irozhlas.cz/mapa-kvality-zivota/tiles/{z}/{x}/{y}.pbf'
    }),
    style: function(feature) {
      return getColor(feature.properties_)
    }
});

function makeTooltip(ftr) {
    var out = getIndex(ftr)
    if (out[0] == -1) {
        document.getElementById('tooltip').innerHTML = 'Vyberte obec v mapě';
    } else {
        document.getElementById('tooltip').innerHTML = out[1].nazev + ' (okres ' + out[1].okres + ')<br>index kval. života: '+ Math.round(scl(out[0]) * 1000) / 10;
    }
};

if (!(isEdge | isFirefox | isIE)) {
    map.on('pointermove', function(evt) {
      if (evt.dragging) {
        return;
      }
      var pixel = map.getEventPixel(evt.originalEvent);
        if (map.hasFeatureAtPixel(pixel)){
            map.forEachFeatureAtPixel(pixel, function(feature) {
                if (Object.keys(feature.properties_).indexOf('Kod') != -1) {
                    makeTooltip(feature.properties_);
                }
            });
        } else {
            document.getElementById('tooltip').innerHTML = 'Vyberte obec'
        }
        });
  };

map.on('singleclick', function(evt) {
    var pixel = map.getEventPixel(evt.originalEvent);
    if (map.hasFeatureAtPixel(pixel)){
        map.forEachFeatureAtPixel(pixel, function(feature) {
            if (Object.keys(feature.properties_).indexOf('Kod') != -1) {
                makeTooltip(feature.properties_);
            }
        });
    } else {
        document.getElementById('tooltip').innerHTML = 'Vyberte obec'
    }
});