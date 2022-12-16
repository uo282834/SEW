<!DOCTYPE html>
<html lang="es">
<head>
    <title>Crear una tabla de la base de datos</title>
    <meta charset="UTF-8" />
    <meta name ="author" content ="Alonso Antuña Gómez" />
    <meta name ="description" content ="Practica PHP" />
    <meta name ="keywords" content ="PHP,SEW,WEB" />
    <!--Definición de la ventana gráfica-->
    <meta name ="viewport" content ="width=device-width, initial scale=1.0" /> 
    
    <!-- enlace a la hoja de estilos -->
    <link href="Ejercicio6.css" rel="stylesheet" />
    
</head>
    
<body>
    <h1>Menú base de datos MySQL</h1> 
    <nav>  
        <ul>
            <li><a href="Ejercicio6.html" title="Principal">Menú principal</a></li>
            <li><a href="CrearBaseDeDatos.php" title="CrearBaseDatos">Crear Base de Datos</a></li>
            <li><a href="CrearTabla.php" title="CrearTabla">Crear una tabla</a></li>
            <li><a href="InsertarDatos.php" title="InsertarDatosTabla">Insertar datos en una tabla</a></li>
            <li><a href="BuscarDatos.php" title="BuscarDatosTabla">Buscar datos en una tabla</a></li>
            <li><a href="ModificarDatos.php" title="modificarDatosTabla">Modificar datos en una tabla</a></li>
            <li><a href="EliminarDatos.php" title="EliminarDatosTabla">Eliminar datos de una tabla</a></li>
            <li><a href="GenerarInforme.php" title="GenerarInforme">Generar informe</a></li>
            <li><a href="CargarDatos.php" title="CargarDatos">Cargar datos desde un archivo en una tabla de la Base de Datos</a></li>
            <li><a href="ExportarDatos.php" title="ExportarDatos">Exportar datos a un archivo desde una tabla de la Base de Datos</a></li>
        </ul>
    </nav> 
    <h2>Exportar los datos de la BD a un fichero CSV de nombre pruebasUsabilidad.csv</h2>     
    <?php
        require('BaseDatos.php');
        $data = new BaseDatos();

            if (count($_POST)>0) 
            {   
                if(isset($_POST['exportar']))                 
                    $data->exportarDatos(); 
            }
        
    ?>

    
    <form id="exportar" action='#' method='post' name='Formulario'>
        <input type='submit' class='button' name='exportar' value='Exportar'/>
    </form>
    
    <footer>
       <img
            src="https://www.w3.org/html/logo/badge/html5-badge-h-solo.png"
            alt="HTML5 Válido"/>
    
            <img src=" http://jigsaw.w3.org/css-validator/images/vcss"
            alt="Valid CSS!"/>
    </footer>
    
</body>
</html>