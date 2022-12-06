"use strict";
class Meteo {
    constructor(){
        this.apikey = "125d94c81ebc7d86c93af7458d94a5fb";
        this.ciudad = "";
        this.codigoPais = "ES";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.url = "https://api.openweathermap.org/data/2.5/weather?q=";
        this.correcto = "¡Todo correcto! JSON recibido de <a href='http://openweathermap.org'>OpenWeatherMap</a>"
    }

    cargarDatos(ciudad){
        this.ciudad = ciudad;
		this.url = "https://api.openweathermap.org/data/2.5/weather?q=";
        this.url = this.url + this.ciudad + "," + this.codigoPais + this.unidades + this.idioma + "&APPID=" + this.apikey;
        $("h2").remove();
        $("p").remove();
        $("img").remove();
        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function(datos){
                    $("pre").text(JSON.stringify(datos));
                    $("h1").after("<h2>Ciudad: " + datos.name + "</h2>");
                    $("h2").after("<img src=\"http://openweathermap.org/img/w/" + datos.weather[0].icon +".png\" alt=\"" + ciudad + "\"/>");
                    $("h2").after("<p>"+"Pais: " + datos.sys.country+"</p>");
                    $("h2").after("<p>"+"Latitud: " + datos.coord.lat+"</p>");
                    $("h2").after("<p>"+"Longitud: " + datos.coord.lon+"</p>");
                    $("h2").after("<p>"+"Temperatura: " + datos.main.temp+"</p>");
                    $("h2").after("<p>"+"Temperatura máxima: " + datos.main.temp_max+"</p>");
                    $("h2").after("<p>"+"Temperatura mínima: " + datos.main.temp_min+"</p>");
                    $("h2").after("<p>"+"Presión: " + datos.main.pressure+"</p>");
                    $("h2").after("<p>"+"Humedad: " + datos.main.humidity+"</p>");
                    $("h2").after("<p>"+"Amanece a las: " + new Date(datos.sys.sunrise * 1000).toLocaleTimeString()+"</p>");
                    $("h2").after("<p>"+"Oscurece a las: " + new Date(datos.sys.sunset * 1000).toLocaleTimeString()+"</p>");
                    $("h2").after("<p>"+"Dirección del viento: " + datos.wind.deg + " grados"+"</p>");
                    $("h2").after("<p>"+"Velocidad del viento: " + datos.wind.speed + "m/s"+"</p>");
                    $("h2").after("<p>"+"Hora de la medida: " + new Date(datos.dt * 1000).toLocaleTimeString()+"</p>");
                    $("h2").after("<p>"+"Fecha de la medida: " + new Date(datos.dt * 1000).toLocaleDateString()+"</p>");
                    $("h2").after("<p>"+"Descripción: " + datos.weather[0].description+"</p>");
                    $("h2").after("<p>"+"Visibilidad: " + datos.visibility + " metros"+"</p>");
                    $("h2").after("<p>"+"Nubosidad: " + datos.clouds.all + " %</p>");
                },
            error:function(){
                $("h3").html("¡Tenemos problemas! No puedo obtener JSON de <a href='http://openweathermap.org'>OpenWeatherMap</a>"); 
                $("h4").remove();
                $("pre").remove();
                $("p").remove();
                }
        });
    }

}
var meteo = new Meteo();