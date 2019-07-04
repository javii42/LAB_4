<?php
include_once("DataAccess/AccesoDatos.php");

class Mascota
{
    public $id;
    public $animal;
    public $raza;
    public $nombre;
    public $edad;
    public $duenio;
    public $foto;

    ///Registrar / Alta
    public static function Register($animal, $raza, $nombre, $edad, $duenio, $foto)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $respuesta = "";
        try {            
            $consulta = $objetoAccesoDato->RetornarConsulta("INSERT INTO mascotas (animal, raza, nombre, edad, duenio, foto) 
            VALUES (:animal, :raza, :nombre, :edad, :duenio, :foto)");

            $consulta->bindValue(':animal', $animal, PDO::PARAM_STR);
            $consulta->bindValue(':raza', $raza, PDO::PARAM_INT);
            $consulta->bindValue(':nombre', $nombre, PDO::PARAM_STR);            
            $consulta->bindValue(':edad', $edad, PDO::PARAM_INT);
            $consulta->bindValue(':duenio', $duenio, PDO::PARAM_STR);
            $consulta->bindValue(':foto', $foto, PDO::PARAM_STR);

            $consulta->execute();

            $respuesta = array("Estado" => "OK", "Mensaje" => "Registrado correctamente.");

        } catch (Exception $e) {
            $mensaje = $e->getMessage();
            $respuesta = array("Estado" => "ERROR", "Mensaje" => "$mensaje");
        }
        finally {
            return $respuesta;
        }
    }

    ///Listar.
    public static function ListAll()
    {
        try {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();

            $consulta = $objetoAccesoDato->RetornarConsulta("SELECT id, animal, raza, nombre, edad, duenio, foto FROM mascotas");

            $consulta->execute();

            $respuesta = $consulta->fetchAll(PDO::FETCH_CLASS, "Mascota");
        } catch (Exception $e) {
            $mensaje = $e->getMessage();
            $respuesta = array("Estado" => "ERROR", "Mensaje" => "$mensaje");
        }
        finally {
            return $respuesta;
        }
    }
}
?>
