"use strict";
class Computacion{
    constructor()
    {
    }
    ocultar(value){
        $(value).hide();
    }
    mostrar(value){
        $(value).show();
    }
    cambiarFondo(value,c){
        $(value).css({left:0,backgroundColor:c});
    }
    cambiarColorDeLetra(value,c){
        $(value).css({left:0,color:c});
    }
    añadirAcontinuacion(value){
        $(value).append("Este es en la misma linea");
    }
    añadirLineaAntes(value){
        $(value).prepend("SE AÑADIO ANTES");
    }
    añadirAntesH3(value){
        $(value).before("<h3>Aquí tienes el nuevo texto before</h3>");
    }
    añadirDespuesH3(value){
        $(value).after("<h3>Aquí tienes el nuevo texto after</h3>");
    }
    añadirFila(value){
        $(value).append("<tr><td>111</td><td>112</td><td>113</td><td>114</td></tr>")
    }
    eliminar(value){
        $(value).remove();
    }
    añadirElemento(value){
        $(value).after("<li>Esta serie tuvo mucho éxito</li>");
    }
    añadirElementoHijo(value){
        $(value).after("<ul><li>Esta serie tuvo mucho éxito</li></ul>");
    }
    ver(){
        $("*", document.body).each(function() {
            var etiquetaPadre = $(this).parent().get(0).tagName;
            var elemento = $(this).get(0).tagName;
            if (elemento === "TABLE" || elemento === "TBODY"|| elemento === "TR" || elemento === "UL"){
            }else{
                $(this).prepend(document.createTextNode( "Etiqueta padre : <"  + etiquetaPadre + "> elemento : <" + elemento +"> valor: "));
            }
        });
    }
    sumar(value){
        var suma = 0;
        $(value + ' td').each(function () {
            suma += parseInt($(this).html());
        });
        alert("Resultado: " + suma);             
    }
}
var computacion = new Computacion();