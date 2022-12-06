"use strict";
class Cargar {
    constructor(){
    }    
    leer(files){   
        var tipo = "image/svg+xml";
       
		//Solamente toma un archivo
		var archivo = files[0];
		var contenido = document.getElementsByTagName("p")[0];
		var areaVisualizacion = document.getElementsByTagName("pre")[0];
		var errorArchivo = document.getElementsByTagName("p")[1];
		contenido.innerText="Contenido del archivo de texto:";
		//Solamente admite archivos de tipo texto
		if (archivo.type === tipo) 
		   {
			var lector = new FileReader();
			lector.onload = function (evento) {
			  //El evento "onload" se lleva a cabo cada vez que se completa con éxito una operación de lectura
			  //La propiedad "result" es donde se almacena el contenido del archivo
			  //Esta propiedad solamente es válida cuando se termina la operación de lectura
			  errorArchivo.innerText = "";
			  areaVisualizacion.innerText = lector.result;
			  }      
			lector.readAsText(archivo);
			}
		else {
			 areaVisualizacion.innerText = "";
			 errorArchivo.innerText = "Error : ¡¡¡ Archivo no válido !!!";
			}       
		}

		comprobar(){
			if (window.File && window.FileReader && window.FileList && window.Blob) 
			{  
				//El navegador soporta el API File
				//document.write("<p>Este navegador soporta el API File </p>");
			}
			else document.write("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");    
	}
	
	ver(){
		$("svg").remove();
		var svg = document.getElementsByTagName("pre")[0].innerText;
		if ( svg === "" ) document.getElementsByTagName("p")[1].innerText = "No se ha seleccionado ningun SVG o archivo no válido";
		else
		$("form").after("<svg width='1650' height='10370'>"+svg+"</svg>");
	}

	copiar(){
		var textToCopy = document.getElementsByTagName("pre")[0].innerText;
		if ( textToCopy === "" ) document.getElementsByTagName("p")[1].innerText = "No hay texto que copiar";
		else
			navigator.clipboard.writeText(textToCopy);
	}

    
}
var cargar = new Cargar();
cargar.comprobar();