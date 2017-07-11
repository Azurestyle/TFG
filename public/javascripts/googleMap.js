function myMap() {
var mapOptions = {
    center: new google.maps.LatLng(39.5069643, -0.458559),
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.HYBRID
}
var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}
