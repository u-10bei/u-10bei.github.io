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

//$.getJSON("https://raw.githubusercontent.com/u-10bei/Sake_Map/main/Sake_Map.geojson?token=GHSAT0AAAAAABL7XIHJ5OY6JDXRFC4GYAUSYQUSSZQ", function (data) {
//    L.geoJson(data).addTo(map);
//});
//var geojson_data = [{ "type": "FeatureCollection", "features": [{ "type": "Feature", "properties": {}, "geometry": { "type": "Point", "coordinates": [139.76712226867676, 35.68107370561057] } }, { "type": "Feature", "properties": {}, "geometry": { "type": "Point", "coordinates": [139.70030307769775, 35.69045025639499] } }, { "type": "Feature", "properties": {}, "geometry": { "type": "Point", "coordinates": [139.7512435913086, 35.707283453190406] } }] }
//];

//L.geoJson(geojson_data).addTo(map);

const INPUT_ADDRESS = 'https://raw.githubusercontent.com/u-10bei/Sake_Map/main/Sake_Map.geojson'
const NET_ERROR = '正常にリクエストを処理できませんでした。'
const CATCH_ERROR = 'エラーが発生しました。'

//const output_csv_el = document.querySelector('#output_csv');

fetch(INPUT_ADDRESS)
    .then(res => {
        if(!res.ok) {
            console.log(NET_ERROR);
        }
        return res.text();
    })
    .then(data => console.log(data))
    .catch(error => {console.log(CATCH_ERROR,error);
    })