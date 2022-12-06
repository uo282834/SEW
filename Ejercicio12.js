"use strict";
class Cargar {
    constructor(){
    }    
    leer(files){   
        var tipoXML = /text.xml*/;
        var tipoTexto = /text.plain*/;
        var tipoJSON = /application.json*/;
       
		//Solamente toma un archivo
		var archivo = files[0];
		var nombre = document.getElementsByTagName("p")[0];
		var tamaño = document.getElementsByTagName("p")[1];
		var tipo = document.getElementsByTagName("p")[2];
		var ultima = document.getElementsByTagName("p")[3];
		var contenido = document.getElementsByTagName("p")[4];
		var areaVisualizacion = document.getElementsByTagName("pre")[0];
		var errorArchivo = document.getElementsByTagName("p")[5];
		nombre.innerText = "Nombre del archivo: " + archivo.name;
		tamaño.innerText = "Tamaño del archivo: " + archivo.size + " bytes"; 
		tipo.innerText = "Tipo del archivo: " + archivo.type;
		ultima.innerText = "Fecha de la última modificación: " + archivo.lastModifiedDate;
		contenido.innerText="Contenido del archivo de texto:"
		//Solamente admite archivos de tipo texto
		if (archivo.type.match(tipoTexto) || archivo.type.match(tipoXML) || archivo.type.match(tipoJSON)) 
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
				document.write("<p>Este navegador soporta el API File </p>");
			}
			else document.write("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");    
    }

    
}
var cargar = new Cargar();
cargar.comprobar();