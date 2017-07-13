function myMap() {
var myCenter = new google.maps.LatLng(39.471957, -0.412976);
var mapCanvas = document.getElementById("map");
var mapOptions = {

    center: myCenter,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.HYBRID
};

var map = new google.maps.Map(mapCanvas, mapOptions);
var marker = new google.maps.Marker({position:myCenter});
marker.setMap(map);
}
