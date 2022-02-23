const INPUT_ADDRESS = '/datas/Sake_Map.geojson'

const t_std = new L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
    attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"
});
const t_pale = new L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
    attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"
});
const Map_b = {
    "地理院地図 標準": t_std,
    "地理院地図 淡色": t_pale,
};
const map = L.map('map', {
    center: [36.099887,138.75],
    zoom: 5,
    layers: [t_std],
    minZoom: 4,
});
const sake = $.getJSON(INPUT_ADDRESS, function (data) {
    L.geoJson(data, {
        onEachFeature: function (feature, layer) {
            var Marker_P = feature.properties.Brewery + '「' + feature.properties.Brand + '」'
            layer.bindPopup(Marker_P);
        }}).addTo(map);
});
const Map_s = {
    "Sake": sake,
};
L.control.scale({imperial: false}).addTo(map);
L.control.layers(Map_b, Map_s, { collapsed: false }).addTo(map);