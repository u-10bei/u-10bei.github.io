var t_std = new L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
    attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"
});
var t_pale = new L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
    attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"
});
var Map_b = {
    "地理院地図 標準": t_std,
    "地理院地図 淡色": t_pale,
};
var map = L.map('map', {
    center: [36.099887,138.75],
    zoom: 5,
    layers: [t_std]
});
L.control.scale({imperial:false}).addTo(map);
L.control.layers(Map_b,null,null).addTo(map);

const INPUT_ADDRESS = '/datas/Sake_Map.geojson'

$.getJSON(INPUT_ADDRESS, function (data) {
    L.geoJson(data).addTo(map);
});