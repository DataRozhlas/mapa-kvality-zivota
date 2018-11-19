var isFirefox = typeof InstallTrigger !== 'undefined';
var isIE = /*@cc_on!@*/false || !!document.documentMode;
var isEdge = !isIE && !!window.StyleMedia;

var base = new ol.layer.VectorTile({
    declutter: true,
    source: new ol.source.VectorTile({
        attributions: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> ' +
        '© <a href="https://www.openstreetmap.org/copyright">' +
        'OpenStreetMap contributors</a>',
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

olms.applyStyle(base, positronStyle, 'openmaptiles').then(function() {
    map.addLayer(base);
    map.addLayer(tema);
});

var cols = {
    'nezam': 'Nezaměstnanost',
    'emise': 'Emise',
    'doziti_m': 'Naděje dožití mužů',
    'rozvody': 'Rozvodovost',
    'ned_ms': 'Dostuopnost MŠ',
    'ned_ss': 'Dostupnost SŠ',
    'ned_zdrav': 'Dostupnost zdrav. zař.',
    'exe': 'Exekucí na obyv.',
    'prumysl': 'Podíl prac. v průmyslu',
    'bezpecnost': 'Bezpečnost',
    'prirust': 'Přírůstek obyvatel',
    'verici': 'Procento věřících',
    'ned_net': 'Dostupnost internetu',
    'vz_okr': 'Vzdálenost k okresnímu městu'
};

var radios = '<h3>Jak důležité jsou pro vás následující parametry?</h3>';
Object.keys(cols).forEach(function(key){
    radios += '<p>' + cols[key] + '<form action="" method="post">'
        + '<input type="radio" id="0_' + key + '" name="' + key + '" value="0" />'
        + '<label for="0_' + key + '">Vůbec</label>'
        + '<input type="radio" id="05_' + key + '" name="' + key + '" value="1" checked />'
        + '<label for="05_' + key + '">Trochu</label>'
        + '<input type="radio" id="1_' + key + '" name="' + key + '" value="1.5"/>'
        + '<label for="1_' + key + '">Hodně</label>'
        + '</form></p>'
});

document.getElementById('sliders').innerHTML = radios;

$('input[type=radio]').change(function(e) {
    koef_user[e.currentTarget.name] = parseFloat(e.currentTarget.defaultValue);
    // prepocitat mins a maxs modelu
    var sums = [];
    Object.values(data).forEach(function(obec) {
        var sm = 0.50519; //intercept
        Object.keys(cols).forEach(function(c) {
            sm += (obec[c] * koef[c] * koef_user[c]);
        })
        sums.push(1 - sm)
    })
    
    //rescaling scale
    var gs = new geostats(sums);
    var breaks = gs.getClassJenks(5);
    colScl.domain(breaks.slice(1,5))
    scl.domain([Math.min.apply(null, sums), Math.max.apply(null, sums)]); 
    tema.changed()
});

var koef = {
    'exe': 0.02407,
    'nezam': 0.01684,
    'emise': 0.01175,
    'ned_ms': 0.00895,
    'vz_okr': 0.00866,
    'ned_zdrav': 0.00843,
    'ned_ss': 0.00797,
    'prumysl': 0.00768,
    'ned_net': 0.00651,
    'rozvody': 0.00459,
    'verici': -0.0049,
    'bezpecnost': -0.01194,
    'prirust': -0.01473,
    'doziti_m': -0.01692
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
        index += (ob[c] * koef[c] * koef_user[c]);
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
        attributions: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> ' +
        '© <a href="https://www.openstreetmap.org/copyright">' +
        'OpenStreetMap contributors</a>',
        format: new ol.format.MVT(),
        url: './tiles/{z}/{x}/{y}.pbf'
    }),
    style: function(feature) {
      return getColor(feature.properties_)
    }
});

function makeTooltip(ftr) {
    var out = getIndex(ftr)
    if (out[0] == -1) {
        document.getElementById('tooltip').innerHTML = 'Vyberte obec';
    } else {
        document.getElementById('tooltip').innerHTML = out[1].nazev + ' (okres ' + out[1].okres + ')<br>ASPEN index: '+ Math.round(scl(out[0]) * 1000) / 10;
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