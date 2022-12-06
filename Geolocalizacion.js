var mapaDinamicoGoogle = new Object();
function initMap(){
    var elentrego = {lat: 43.286806, lng: -5.637305};
    var mapaElEntrego = new google.maps.Map(document.getElementsByTagName('main')[0],{zoom: 8,center:elentrego});
    var marcador = new google.maps.Marker({position:elentrego,map:mapaElEntrego});
}
mapaDinamicoGoogle.initMap = initMap;