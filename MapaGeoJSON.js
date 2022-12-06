"use strict"
class Mapa{
    constructor(){
        this.centro = {lat: 43.3672702, lng: -5.8502461};
    }

    leer(files){ 

        var mapa = new google.maps.Map(document.getElementsByTagName('main')[0],{
            zoom: 8,
            center:this.centro,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var errorArchivo = document.getElementsByTagName("p")[0];
        var archivo = files[0];
        var nombre = archivo.name;
        if (nombre.endsWith(".geojson")) 
        {
            var lector = new FileReader();     
            lector.readAsText(archivo);         
            lector.onload = function (evento) {   
                var geojson = JSON.parse(lector.result);
                mapa.data.addGeoJson(geojson);
            }   
        }
        else {
            errorArchivo.innerText = "Error : ¡¡¡ Archivo no válido !!!";
        }
    }

    comprobar(){
        if (!window.File && window.FileReader && window.FileList && window.Blob) 
        // {  
        //     //El navegador soporta el API File
        //     document.write("<p>Este navegador soporta el API File </p>");
        // }
        /*else*/ document.write("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");    
    }
}
var rutas = new Mapa();
rutas.comprobar();