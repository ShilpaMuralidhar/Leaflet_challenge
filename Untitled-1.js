//grey surrounding
var grey_backdrop = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?" +
"access_token=pk.eyJ1IjoiYmFzYXZhbm5hc2hpbHBhIiwiYSI6ImNrMTcxeHJ0ejFjNXIzZXRrcTBkd2t0dTcifQ.GzXIj8OAsp71QTqvCnZztg");

//satellite surrounding
var satellite_backdrop = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?" +
"access_token=pk.eyJ1IjoiYmFzYXZhbm5hc2hpbHBhIiwiYSI6ImNrMTcxeHJ0ejFjNXIzZXRrcTBkd2t0dTcifQ.GzXIj8OAsp71QTqvCnZztg");

//exterior surrounding
var exterior_backdrop = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?" +
"access_token=pk.eyJ1IjoiYmFzYXZhbm5hc2hpbHBhIiwiYSI6ImNrMTcxeHJ0ejFjNXIzZXRrcTBkd2t0dTcifQ.GzXIj8OAsp71QTqvCnZztg");

var map = L.map("map", {
    center: [37.09, -95.71],
    zoom = 3,
    layers : [grey_backdrop, satellite_backdrop, exterior_backdrop]
});

//append one grey tile layer to the map 
grey_backdrop.addTo(map);

// calling earthquakes and tectonicplates data layers.
var tectonicplates = new.L.LayerGroup();
var earthquakes = new.L.LayerGroup();

//base layers
var baseMaps = {
    Satellite = satellite_backdrop,
    Greyscale =  grey_backdrop,
    Exterior = exterior_backdrop
};

//overlays
var overlayMaps = {
    "Tectonic Plates": tectonicplates,
     "Earthquakes": earthquakes
};

// Decide which layers to be shown
L .control
    .layers(baseMaps, overlayMaps)
    .addTo(map);

//// recover earthquake geoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson")

function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
    };
}

// magnitude of the earthquake decides color intensity of marker.
function getColor(magnitude) {
    switch (true) {
        case magnitude > 5:
            return "#ea2c2c";
        case magnitude > 4:
            return "#ea822c";
        case magnitude > 3:
            return "#ee9c00";
        case magnitude > 2:
            return "#eecc00";
        case magnitude > 1:
            return "#d4ee00";
        default:
            return "#98ee00"                       
    }
}

// earthquake marker radius == magnitude of earthquake.
function getRadius(magnitude) {
    if (magnitude === 0) {
        return 1;
    }
    return magnitude * 3
}

//add geojson layer to th emap
L.geoJson(data, {
    pointToLayer: function(feature, latlng){
        layer.bindPopup("Magnitude:"+ feature.properties.mag + "<br>Location:" + feature.properties.place)
    }
}).addTo(earthquakes);

earthquakes.addTo(map);

var legend = L.control({
    position: "bottomright"
});

legend.onAdd = function() {
    var div = L
    .DomUtil
    .create("div", "info legend");

    var grades = [0, 1, 2, 3, 4, 5];
    var colors = [
      "#98ee00",
      "#d4ee00",
      "#eecc00",
      "#ee9c00",
      "#ea822c",
      "#ea2c2c"
    ];

   for (var i = 0; i < grades.length; i++){
       div.innerHTML += "<i style='background: " + colors[i] + "'></i>" +
       grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
   } 
   return div;
};


legend.addTo(map);

//recover tectonic plate geojson
d3.json("https://github.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json",
    function(tectonicdata) {

        L.geoJson(tectonicdata,{
            color: "orange",
            weight: 2
        })
        .addTo(tectonicplates);

        //add tectonic plate layer to the map
        tectonicplates.addTo(map);
    });


















==============
CSS
body {
    padding: 0;
    margin: 0;
  }
  
  #map,
  body,
  html {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
  }
  .legend{
    padding: 10px;
    line-height: 18px;
    color: #555;
    background-color: #fff;
    border-radius: 5px;
  }
  .legend i {
    float: left;
    width: 18px;
    height: 18px;
    margin-right: 8px;
    opacity: 0.7;
  }
  
  .leaflet-bottom.leaflet-left {
    width: 90%;
  }
  
  .leaflet-comtrol-container.leaflet-timeline-control {
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    margin-bottom: 15px;
  }















