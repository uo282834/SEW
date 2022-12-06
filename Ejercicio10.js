"use strict";
class Consumo {
    constructor(){
        this.url = "https://commodities-api.com/api/latest?access_key=sk8p4zr5qga9g8v3dbpdr9ucx5d46ygx962vu1gw2xu368a12ob54nh47oe1&base=EUR&symbols=CPO,BRENTOIL";
    }
    cargarDatos(){
        $.ajax({
           dataType : "json",
           url: this.url,
           method : 'GET',
            success: function(data) {
            var precio =  1 /data.data.rates.CPO;
            var precio2 = 1 /data.data.rates.BRENTOIL;
            $("h1").after("<p>Precio del petroleo crudo de palma: " + precio+ " €" );
            $("h1").after("<p>Precio del petroleo crudo del mar del norte: " + precio2+ " €");
            $("input").remove();
            },
            error: function(){
                $("h1").after("No se ha podido acceder");
            }
            });
    }
}
var consumo = new Consumo();