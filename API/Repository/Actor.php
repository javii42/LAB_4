<?php

include_once("DataAccess/AccesoDatos.php");

class Actor{
	public $id;
    public $nombre;
    public $apellido;
    public $nacionalidad;
    public $fecha_nacimiento;

    ///Registrar / Alta
    public static function Registrar(
	    $nombre,
	    $apellido,
	    $nacionalidad,
	    $fecha_nacimiento)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso('PrimerParcial');
        $respuesta = "";
        try {            
            $consulta = $objetoAccesoDato->RetornarConsulta("INSERT INTO Actores (nombre, apellido, nacionalidad, fecha_nacimiento) 
            VALUES (:nombre, :apellido, :nacionalidad,:fecha_nacimiento)");

            $consulta->bindValue(':nombre', $nombre, PDO::PARAM_STR);
            $consulta->bindValue(':apellido', $apellido, PDO::PARAM_STR);
            $consulta->bindValue(':nacionalidad', $nacionalidad, PDO::PARAM_STR);
            $consulta->bindValue(':fecha_nacimiento', $fecha_nacimiento, PDO::PARAM_STR);

            $consulta->execute();

            $respuesta = array("Estado" => "OK", "Mensaje" => "Registrado correctamente.");

        } catch (Exception $e) {
            $mensaje = $e->getMessage();
            $respuesta = array("Estado" => "ERROR", "Mensaje" => "$mensaje");
        }
        finally {
         //   var_dump($respuesta);
            return $respuesta;
        }
    }

    ///Baja.
    public static function Baja($id)
    {
        try {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso('PrimerParcial');

            $consulta = $objetoAccesoDato->RetornarConsulta("DELETE FROM Actores WHERE id = :id");

            $consulta->bindValue(':id', $id, PDO::PARAM_INT);

            $consulta->execute();

            $respuesta = array("Estado" => "OK", "Mensaje" => "Baja correcta.");

        } catch (Exception $e) {
            $mensaje = $e->getMessage();
            $respuesta = array("Estado" => "ERROR", "Mensaje" => "$mensaje");
        }
        finally {
            return $respuesta;
        }
    }

    ///Modificación.
    public static function Modificar(
    	$id, 
	    $nombre,
	    $apellido,
	    $nacionalidad,
	    $fecha_nacimiento)
    {
        try {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso('PrimerParcial');
            
            $consulta = $objetoAccesoDato->RetornarConsulta("UPDATE Peliculas set nombre = :nombre, apellido = :apellido, nacionalidad = :nacionalidad, fecha_nacimiento = :fecha_nacimiento
                WHERE id = :id");

            $consulta->bindValue(':nombre', $nombre, PDO::PARAM_STR);
            $consulta->bindValue(':apellido', $apellido, PDO::PARAM_STR);
            $consulta->bindValue(':nacionalidad', $nacionalidad, PDO::PARAM_STR);
            $consulta->bindValue(':fecha_nacimiento', $fecha_nacimiento, PDO::PARAM_STR);
            $consulta->bindValue(':id', $id, PDO::PARAM_INT);


            $consulta->execute();

            $respuesta = array("Estado" => "OK", "Mensaje" => "Modificado correctamente.");

        } catch (Exception $e) {
            $mensaje = $e->getMessage();
            $respuesta = array("Estado" => "ERROR", "Mensaje" => "$mensaje");
        }
        finally {
            return $respuesta;
        }
    }

    ///Listar.
    public static function Listar()
    {
        try {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso('PrimerParcial');

            $consulta = $objetoAccesoDato->RetornarConsulta("SELECT id,nombre, apellido, nacionalidad, fecha_nacimiento FROM Actores");

            $consulta->execute();

            $respuesta = $consulta->fetchAll(PDO::FETCH_CLASS, "Actor");
        } catch (Exception $e) {
            $mensaje = $e->getMessage();
            $respuesta = array("Estado" => "ERROR", "Mensaje" => "$mensaje");
        }
        finally {
            return $respuesta;
        }
    }
}
