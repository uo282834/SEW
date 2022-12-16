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
    <h2>Insertar datos en la tabla PruebasUsabilidad</h2>     
    <?php
        require('BaseDatos.php');
        $data = new BaseDatos();

            if (count($_POST)>0) 
            {   
                if(isset($_POST['insertar']))                 
                    $data->insertarDatos(); 
            }
    ?>    
        <form action='#' method='post' name='Formulario'>
        Edad: <input type='text' class='text' name='edad'/>
        Nombre: <input type='text' class='text' name='nombre'/>
        Apellidos: <input type='text' class='text' name='apellidos'/>
        E-MAIL: <input type='text' class='text' name='email'/>
        Telefono: <input type='text' class='text' name='telefono'/>
        Sexo: 
        <select name="sexo">
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
        </select>
        Pericia mostrada: 
        <select name="pericia">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
        Tiempo empleado: <input type='text' class='text' name='tiempo'/>
        La tarea fue realizada correctamente: 
        <select name="correcta">
            <option value="si">Sí</option>
            <option value="no">No</option>
        </select>
        Comentarios: <input type='text' class='text' name='comentarios'/>
        Propuestas de mejora: <input type='text' class='text' name='propuestas'/>
        Valoración de la aplicación: 
        <select name="valoracion">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
        <input type='submit' class='button' name='insertar' value='Insertar'/>
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