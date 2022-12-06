"use strict"
class Mapa{
    constructor(){
    }

    leer(files){
        var archivo = files[0];
        var lector = new FileReader(archivo);
        var t = this;
        if (archivo.name.match(/.kml/)){
            lector.onload = function (evento){
                var kml = lector.result;
                var ruta = new Array();
                var coordenadas = $('coordinates',kml);
                for (const elemento of coordenadas){
                    let coords = elemento.textContent.split("\n");
                    for (const i of coords){
                        let coord = i.split(",");
                        if (coord[0] != ""){
                            let pos = {lat: parseFloat(coord[1]), lng: parseFloat(coord[0])};
                                ruta.push(pos);
                        }
                    }
                }
                t.recargar(ruta);
            }
            lector.readAsText(archivo);
        }else{
            alert("El tipo no es kml");
        }
    }
    recargar(posiciones){
        var elentrego = {lat: 43.286806, lng: -5.637305};
        var mapa = new google.maps.Map(document.getElementsByTagName('main')[0],{zoom: 8,center:elentrego});
        for (const elemento of posiciones){
            var coordenada = {lat: elemento.lat, lng: elemento.lng};
            new google.maps.Marker({position:coordenada,map:mapa});
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