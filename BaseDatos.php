<?php

    class BaseDatos{
        private $servername;
        private $username;
        private $password;
        private $database;

        public function __construct(){
            $this->servername = "localhost";
            $this->username = "DBUSER2022";
            $this->password = "DBPSWD2022";
            $this->database = "pruebas";
        }

        public function crearBaseDeDatos(){            
            $db = new mysqli($this->servername,$this->username,$this->password);            
            $cadenaSQL = "CREATE DATABASE IF NOT EXISTS pruebas COLLATE utf8_spanish_ci";
            if($db->query($cadenaSQL) === TRUE){
                echo "<p>Base de datos PRUEBAS creada con éxito</p>";
            } else { 
                echo "<p>ERROR en la creación de la Base de Datos PRUEBAS</p>";
                exit();
            } 
            $db->close();  
        }

        public function crearTabla(){
            $db = new mysqli($this->servername,$this->username,$this->password,$this->database);

            $crearTabla = "CREATE TABLE IF NOT EXISTS PruebasUsabilidad (
                        id INT NOT NULL AUTO_INCREMENT, 
                        nombre VARCHAR(20),
                        apellidos VARCHAR(30),
                        email VARCHAR(30),
                        telefono VARCHAR(20),
                        edad INT NOT NULL,
                        sexo VARCHAR(10) NOT NULL, 
                        pericia INT NOT NULL, 
                        tiempo DOUBLE NOT NULL,
                        correcta VARCHAR(3) NOT NULL, 
                        comentarios VARCHAR(255) NOT NULL,
                        propuestas VARCHAR(255) NOT NULL,
                        valoracion INT NOT NULL,
                        PRIMARY KEY (id),
                        CHECK (pericia BETWEEN 0 AND 10),
                        CHECK (valoracion BETWEEN 0 AND 10),
                        CHECK (correcta IN ('si','no')),
                        CHECK (sexo IN ('masculino','femenino')))";

            if($db->query($crearTabla) === TRUE){
                echo "<p>Tabla PruebasUsabilidad creada con éxito </p>";
             } else { 
                echo "<p>ERROR en la creación de la tabla PruebasUsabilidad</p>";
                exit();
             }

             $db->close(); 
        }

        public function insertarDatos(){
            $db = new mysqli($this->servername,$this->username,$this->password,$this->database);
            $consultaPre = $db->prepare("INSERT INTO PruebasUsabilidad (edad,nombre,apellidos,email,telefono, sexo, pericia, tiempo, correcta,comentarios,propuestas, valoracion) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"); 
            if ((empty($_POST['edad']) ||empty($_POST['nombre']) || empty($_POST['apellidos']) || empty($_POST['email']) || empty($_POST['telefono']) || empty($_POST['sexo']) || empty($_POST['pericia']) || empty($_POST['tiempo']) || empty($_POST['correcta']) || empty($_POST['comentarios'])
                || empty($_POST['propuestas']) || empty($_POST['valoracion'])))
                echo "<p>Faltan datos</p>";
            else if ( !is_numeric($_POST['edad']) || !is_numeric($_POST['tiempo'])){
                echo "<p>Inserte un número, por favor</p>";
            }
			else{
                $consultaPre->bind_param("isssssidsssi", 
                    $_POST["edad"],$_POST["nombre"],$_POST["apellidos"],$_POST["email"],$_POST["telefono"],$_POST["sexo"],
                    $_POST["pericia"], $_POST["tiempo"], $_POST["correcta"], $_POST["comentarios"], $_POST["propuestas"], $_POST["valoracion"]);
                $consultaPre->execute();
                echo "<p>Filas agregadas: ".$consultaPre->affected_rows."</p>";
                $consultaPre->close();
            }
            $db->close();
        }

        public function buscarDatos(){
            if (empty($_POST['id']) )
                echo "<p>Falta introducir el id cuyos datos se quieren modificar</p>";
			else if ( !is_numeric($_POST['id']) ){
                echo "<p>Inserte un número, por favor</p>";
            }
			else{
				$db = new mysqli($this->servername,$this->username,$this->password,$this->database);
				$consultaPre = $db->prepare("SELECT * FROM PruebasUsabilidad WHERE id = ?");
				$consultaPre->bind_param('i', $_POST["id"]);     
				$consultaPre->execute(); 
				$resultado = $consultaPre->get_result();
				if ($resultado->num_rows >= 1){
					echo "<h2>Datos de la prueba buscada:</h2>";
					echo "<ul>";
					while($row = $resultado->fetch_assoc()) {
						echo "<li>Id: " . $row["id"] . "</li>";
						echo "<li>Edad: " . $row["edad"] . "</li>";
						echo "<li>Sexo: " . $row["sexo"] . "</li>";
						echo "<li>Pericia mostrada: " . $row["pericia"] . "</li>";
						echo "<li>Tiempo empleado: " . $row["tiempo"] . "</li>";
						echo "<li>La tarea se realizó correctamente: " . $row["correcta"] . "</li>";
						echo "<li>Comentarios: " . $row["comentarios"] . "</li>";
						echo "<li>Propuestas de mejora: " . $row["propuestas"] . "</li>";
						echo "<li>Valoración: " . $row["valoracion"] . "</li>";
					}
					echo "</ul>";
				} else  {
					echo "<p>Sin resultados</p>";
				}
				$consultaPre->close();
				$db->close();
			}
        }

        public function borrarDatos(){
            if (empty($_POST['id']) )
                echo "<p>Falta introducir el id cuyos datos se quieren modificar</p>";
			else if ( !is_numeric($_POST['id']) ){
                echo "<p>Inserte un número, por favor</p>";
            }
            else if ( !$this->checkIdExists($_POST['id']) ){
                echo "<p>No hay registros con ese id</p>";
            }
            else{
                $db = new mysqli($this->servername,$this->username,$this->password,$this->database);
                $consultaPre = $db->prepare("DELETE FROM PruebasUsabilidad where id=?"); 
                $consultaPre->bind_param('i', $_POST["id"]); 
                $consultaPre->execute();
                $consultaPre->close();
                echo "<p>Elemento eliminado</p>";
                $db->close();
            }
        }

        public function actualizarDatos(){
            if (empty($_POST['id']) )
                echo "<p>Falta introducir el id cuyos datos se quieren modificar</p>";
			else if ( !is_numeric($_POST['id']) ){
                echo "<p>Inserte un número, por favor</p>";
            }
            else if ( !$this->checkIdExists($_POST['id']) ){
                echo "<p>No hay registros con ese id</p>";
            }else{
                $db = new mysqli($this->servername,$this->username,$this->password,$this->database);
                $consultaPre = $db->prepare("UPDATE PruebasUsabilidad SET edad = ?,nombre = ?, apellidos = ?, email = ?, telefono = ?, sexo = ?, pericia = ?, tiempo = ?, correcta = ?, comentarios = ?, propuestas = ?, valoracion = ? where id=?"); 
                if (empty($_POST['edad']) || empty($_POST['sexo']) || empty($_POST['pericia']) || empty($_POST['tiempo']) || empty($_POST['correcta']) || empty($_POST['comentarios'])
                    || empty($_POST['propuestas']) || empty($_POST['valoracion']) || empty($_POST['nombre']) || empty($_POST['apellidos']) || empty($_POST['email']) || empty($_POST['telefono']))
                    echo "<p>Faltan datos</p>";
                else{
                    $consultaPre->bind_param('isssssidsssii', 
                        $_POST["edad"],$_POST["nombre"],$_POST["apellidos"],$_POST["email"],$_POST["telefono"],$_POST["sexo"], $_POST["pericia"], $_POST["tiempo"], $_POST["correcta"], $_POST["comentarios"], $_POST["propuestas"], $_POST["valoracion"],$_POST["id"]);
                    $consultaPre->execute();
                    echo "<p>Filas actualizadas: ".$consultaPre->affected_rows."</p>";
                    $consultaPre->close();
                    }
                    $db->close();
            }
        }

        public function checkIdExists($id){
            $db = new mysqli($this->servername,$this->username,$this->password,$this->database);
            $consultaPre = $db->prepare("SELECT * FROM PruebasUsabilidad WHERE id = ?");
            $consultaPre->bind_param('i', $id);     
            $consultaPre->execute(); 
            $resultado = $consultaPre->get_result();
            $exists = false;
            if ($resultado->num_rows >= 1) $exists = true;
            $consultaPre->close();
            $db->close();
            return $exists;
        }

        public function generarInforme(){
            $totalUsuarios = $this->totalUsuarios();
            if ( $totalUsuarios == 0 ){
                echo "<h2>Informe de resultados:</h2>";
                echo "<p>No hay datos en la base de datos para ver el informe";
            }
            else{
                $edadMedia = $this->edadMedia();
                $porcentajeHombres = ($this->totalHombres() / $totalUsuarios) * 100;
                $porcentajeMujeres = 100 - $porcentajeHombres;
                $periciaMedia = $this->periciaMedia();
                $tiempoMedio = $this->tiempoMedio();
                if ( $totalUsuarios > 0 )
                    $porcentajeCorrectas = ($this->totalCorrectas() / $totalUsuarios) * 100;
                else $porcentajeCorrectas = 0;
                $puntuacionMedia = $this->puntuacionMedia();
                echo "<h2>Informe de resultados:</h2>";
                echo "<ul>";
                echo "<li>Edad media de los usuarios: $edadMedia años</li>";
                echo "<li>Frecuencia del %  de cada tipo de sexo entre los usuarios:
                            <ul>
                            <li>Hombres: $porcentajeHombres%</li>
                            <li>Mujeres: $porcentajeMujeres%</li>
                            </ul>
                    </li>";
                echo "<li>Valor medio del nivel o pericia informática de los usuarios: $periciaMedia</li>";
                echo "<li>Tiempo medio para la tarea: $tiempoMedio</li>";
                echo "<li>Porcentaje de usuarios que han realizado la tarea correctamente: $porcentajeCorrectas%</li>";
                echo "<li>Valor medio de la puntuación de los usuarios sobre la aplicación: $puntuacionMedia</li>";
                echo "</ul>";
            }
        }

        public function puntuacionMedia(){
            $db = new mysqli($this->servername,$this->username,$this->password,$this->database);
            $resultado =  $db->query('SELECT AVG(valoracion) AS media FROM PruebasUsabilidad');
            $toRet = null;
            if ($resultado->num_rows > 0) {
                while($row = $resultado->fetch_assoc()) {
                     $toRet = $row["media"];
                }
            }
            $db->close();
            return $toRet;
        }

        public function tiempoMedio(){
            $db = new mysqli($this->servername,$this->username,$this->password,$this->database);
            $resultado =  $db->query('SELECT AVG(tiempo) AS media FROM PruebasUsabilidad');
            $toRet = null;
            if ($resultado->num_rows > 0) {
                while($row = $resultado->fetch_assoc()) {
                     $toRet = $row["media"];
                }
            }
            $db->close();
            return $toRet;
        }

        public function periciaMedia(){
            $db = new mysqli($this->servername,$this->username,$this->password,$this->database);
            $resultado =  $db->query('SELECT AVG(pericia) AS media FROM PruebasUsabilidad');
            $toRet = null;
            if ($resultado->num_rows > 0) {
                while($row = $resultado->fetch_assoc()) {
                     $toRet = $row["media"];
                }
            }
            $db->close();
            return $toRet;
        }

        public function totalHombres(){
            $db = new mysqli($this->servername,$this->username,$this->password,$this->database);
            $resultado =  $db->query('SELECT COUNT(*) AS cuenta FROM PruebasUsabilidad WHERE sexo = "masculino"');
            $toRet = null;
            if ($resultado->num_rows > 0) {
                while($row = $resultado->fetch_assoc()) {
                     $toRet = $row["cuenta"];
                }
            }
            $db->close();
            return $toRet;
        }

        public function totalCorrectas(){
            $db = new mysqli($this->servername,$this->username,$this->password,$this->database);
            $resultado =  $db->query('SELECT COUNT(*) AS cuenta FROM PruebasUsabilidad WHERE correcta="si"');
            $toRet = null;
            if ($resultado->num_rows > 0) {
                while($row = $resultado->fetch_assoc()) {
                     $toRet = $row["cuenta"];
                }
            }
            $db->close();
            return $toRet;
        }

        public function totalUsuarios(){
            $db = new mysqli($this->servername,$this->username,$this->password,$this->database);
            $resultado =  $db->query('SELECT COUNT(*) AS cuenta FROM PruebasUsabilidad');
            $toRet = null;
            if ($resultado->num_rows > 0) {
                while($row = $resultado->fetch_assoc()) {
                     $toRet = $row["cuenta"];
                }
            }
            $db->close();
            return $toRet;
        }

        public function edadMedia(){            
            $db = new mysqli($this->servername,$this->username,$this->password,$this->database);
            $resultado =  $db->query('SELECT AVG(edad) AS media FROM PruebasUsabilidad');
            $toRet = null;
            if ($resultado->num_rows > 0) {
                while($row = $resultado->fetch_assoc()) {
                     $toRet = $row["media"];
                }
            }
            $db->close();
            return $toRet;
        }

        public function exportarDatos(){
            $db = new mysqli($this->servername,$this->username,$this->password,$this->database);
            
            $dataToCsv = "";
            $resultado =  $db->query('SELECT * FROM PruebasUsabilidad');

            if ($resultado->num_rows > 0) {
                while($row = $resultado->fetch_assoc()) {
                    $dataToCsv .= $row['id']. ",".$row['nombre'] . "," .$row['apellidos'] . "," .$row['email'] . "," .$row['telefono'] . "," . $row['edad'] . "," .$row['sexo'].",". $row['pericia'] .",". $row['tiempo'] .",". $row['correcta'] .",". $row['comentarios'] .",". $row['propuestas'] .",". $row['valoracion'] ."\n"; 
                }
            }             
            $db->close();
            file_put_contents("pruebasUsabilidad.csv",$dataToCsv);            
            echo "<p>Fichero generado con éxito</p>";
        }

        public function cargarDatos(){            
            $db = new mysqli($this->servername,$this->username,$this->password,$this->database);
            $archivo = fopen("pruebasUsabilidad.csv", "r");            
            while( ($datos = fgetcsv($archivo,1000,",")) == true ){
                $id = $datos[0];
                $nombre = $datos[1];
                $apellidos = $datos[2];
                $email = $datos[3];
                $telefono = $datos[4];
                $edad = $datos[5];
                $sexo = $datos[6];
                $pericia = $datos[7];
                $tiempo = $datos[8];
                $correcta = $datos[9];
                $comentarios = $datos[10];
                $propuestas = $datos[11];
                $valoracion = $datos[12];
                $consultaPre = $db->prepare("INSERT INTO PruebasUsabilidad VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)"); 
                 $consultaPre->bind_param('issssisidsssi', 
                     $id,$nombre,$apellidos,$email,$telefono,$edad, $sexo, $pericia, $tiempo, $correcta, $comentarios, $propuestas, $valoracion);
                $consultaPre->execute();
            }
            //$consultaPre->close();
			$db->close();
            echo "<p>Datos cargados correctamente</p>";
        }
    }

?>