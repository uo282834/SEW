"use strict";
class Meteo {
    constructor(){
        this.apikey = "125d94c81ebc7d86c93af7458d94a5fb";
        this.ciudad = "";
        this.codigoPais = "ES";
        this.tipo = "&mode=xml";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.url = "";
        this.correcto = "¡Todo correcto! JSON recibido de <a href='https://openweathermap.org'>OpenWeatherMap</a>"
    }

    cargarDatos(ciudad){
        this.ciudad = ciudad;
        this.url = "https://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + "," + this.codigoPais + this.tipo + this.unidades + this.idioma + "&APPID=" + this.apikey;
        $("h2").remove();
        $("p").remove();
        $("img").remove();
        $.ajax({
            dataType: "xml",
            url: this.url,
            method: 'GET',
            success: function(datos){
                $("h5").text((new XMLSerializer()).serializeToString(datos));
                var ciudad                = $('city',datos).attr("name");
                var longitud              = $('coord',datos).attr("lon");
                var latitud               = $('coord',datos).attr("lat");
                var pais                  = $('country',datos).text();
                var amanecer              = $('sun',datos).attr("rise");
                var minutosZonaHoraria    = new Date().getTimezoneOffset();
                var amanecerMiliSeg1970   = Date.parse(amanecer);
                    amanecerMiliSeg1970  -= minutosZonaHoraria * 60 * 1000;
                var amanecerLocal         = (new Date(amanecerMiliSeg1970)).toLocaleTimeString("es-ES");
                var oscurecer             = $('sun',datos).attr("set");          
                var oscurecerMiliSeg1970  = Date.parse(oscurecer);
                    oscurecerMiliSeg1970  -= minutosZonaHoraria * 60 * 1000;
                var oscurecerLocal        = (new Date(oscurecerMiliSeg1970)).toLocaleTimeString("es-ES");
                var temperatura           = $('temperature',datos).attr("value");
                var temperaturaMin        = $('temperature',datos).attr("min");
                var temperaturaMax        = $('temperature',datos).attr("max");
                var humedad               = $('humidity',datos).attr("value");
                var presion               = $('pressure',datos).attr("value");
                var velocidadViento       = $('speed',datos).attr("value");
                var direccionViento       = $('direction',datos).attr("value");
                var nubosidad             = $('clouds',datos).attr("value");
                var visibilidad           = $('visibility',datos).attr("value");
                var descripcion           = $('weather',datos).attr("value");
                var horaMedida            = $('lastupdate',datos).attr("value");
                var icon                  = $('weather',datos).attr("icon");
                var horaMedidaMiliSeg1970 = Date.parse(horaMedida);
                    horaMedidaMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
                var horaMedidaLocal       = (new Date(horaMedidaMiliSeg1970)).toLocaleTimeString("es-ES");
                var fechaMedidaLocal      = (new Date(horaMedidaMiliSeg1970)).toLocaleDateString("es-ES");

                    $("h1").after("<h2> Ciudad: " + ciudad + "</h2>");
                    $("h2").after("<img src=\"http://openweathermap.org/img/w/" + icon +".png\" alt=\"" + ciudad + "\"/>");
                    $("h2").after("<p>"+"Pais: " + pais+"</p>");
                    $("h2").after("<p>"+"Latitud: " + latitud+"</p>");
                    $("h2").after("<p>"+"Longitud: " + longitud+"</p>");
                    $("h2").after("<p>"+"Temperatura: " + temperatura+"</p>");
                    $("h2").after("<p>"+"Temperatura máxima: " + temperaturaMax+"</p>");
                    $("h2").after("<p>"+"Temperatura mínima: " + temperaturaMin+"</p>");
                    $("h2").after("<p>"+"Presión: " + presion+"</p>");
                    $("h2").after("<p>"+"Humedad: " + humedad+"</p>");
                    $("h2").after("<p>"+"Amanece a las: " + amanecerLocal + "</p>");
                    $("h2").after("<p>"+"Oscurece a las: " + oscurecerLocal +"</p>");
                    $("h2").after("<p>"+"Dirección del viento: " + direccionViento + " grados"+"</p>");
                    $("h2").after("<p>"+"Velocidad del viento: " + velocidadViento + "m/s"+"</p>");
                    $("h2").after("<p>"+"Hora de la medida: " + horaMedidaLocal+"</p>");
                    $("h2").after("<p>"+"Fecha de la medida: " + fechaMedidaLocal+"</p>");
                    $("h2").after("<p>"+"Descripción: " + descripcion+"</p>");
                    $("h2").after("<p>"+"Visibilidad: " + visibilidad + " metros"+"</p>");
                    $("h2").after("<p>"+"Nubosidad: " + nubosidad + " %</p>");
                },
            error:function(){
                $("h3").html("¡Tenemos problemas! No puedo obtener JSON de <a href='https://openweathermap.org'>OpenWeatherMap</a>"); 
                $("h4").remove();
                $("pre").remove();
                $("p").remove();
                }
        });
    }

}
var meteo = new Meteo();