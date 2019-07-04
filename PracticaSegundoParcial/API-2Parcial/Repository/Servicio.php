<?php
include_once("DataAccess/AccesoDatos.php");
class Servicio
{
    public $id;
    public $nombre;
    public $codigo;
    public $precio;
    public $local;
    public $genero;
    public $fechaIngreso;
    public $imagen;

    ///Registrar / Alta
    public static function Register($codigo, $nombre, $fechaIngreso, $local, $precio, $genero, $imagen)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $respuesta = "";
        try {            
            $consulta = $objetoAccesoDato->RetornarConsulta("INSERT INTO Zapatos (nombre, codigo, precio, local, genero, fechaIngreso, imagen) 
            VALUES (:nombre, :codigo, :precio, :local, :genero, :fechaIngreso, :imagen)");

            $consulta->bindValue(':nombre', $nombre, PDO::PARAM_STR);
            $consulta->bindValue(':precio', $precio, PDO::PARAM_INT);
            $consulta->bindValue(':codigo', $codigo, PDO::PARAM_STR);            
            $consulta->bindValue(':local', $local, PDO::PARAM_INT);
            $consulta->bindValue(':genero', $genero, PDO::PARAM_STR);
            $consulta->bindValue(':fechaIngreso', $fechaIngreso, PDO::PARAM_STR);
            $consulta->bindValue(':imagen', $imagen, PDO::PARAM_STR);

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

            $consulta = $objetoAccesoDato->RetornarConsulta("SELECT id, codigo, nombre, fechaIngreso, local, precio, genero, imagen FROM Zapatos");

            $consulta->execute();

            $respuesta = $consulta->fetchAll(PDO::FETCH_CLASS, "Servicio");
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