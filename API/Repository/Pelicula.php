<?php

include_once("DataAccess/AccesoDatos.php");

class Pelicula{

	public $id;
    public $nombre;
    public $tipo;
    public $fecha_estreno;
    public $cant_publico;
    public $ruta_foto;

    ///Registrar / Alta
    public static function Registrar($nombre, $tipo, $fecha_estreno, $cant_publico)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso('PrimerParcial');
        $respuesta = "";
        try {            
            $consulta = $objetoAccesoDato->RetornarConsulta("INSERT INTO Peliculas (nombre, tipo, fecha_estreno,cant_publico) 
            VALUES (:nombre, :tipo, :fecha_estreno,:cant_publico)");

            $consulta->bindValue(':nombre', $nombre, PDO::PARAM_STR);
            $consulta->bindValue(':tipo', $tipo, PDO::PARAM_STR);
            $consulta->bindValue(':fecha_estreno', $fecha_estreno, PDO::PARAM_STR);
            $consulta->bindValue(':cant_publico', $cant_publico, PDO::PARAM_STR);

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

    ///Baja.
    public static function Baja($id)
    {
        try {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso('PrimerParcial');

            $consulta = $objetoAccesoDato->RetornarConsulta("DELETE FROM Peliculas WHERE id = :id");

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
	    $tipo,
	    $fecha_estreno,
	    $cant_publico)
    {
        try {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso('PrimerParcial');
            
            $consulta = $objetoAccesoDato->RetornarConsulta("UPDATE Peliculas set nombre = :nombre, tipo = :tipo, fecha_estreno = :fecha_estreno, cant_publico = :cant_publico
                WHERE id = :id");

            $consulta->bindValue(':nombre', $nombre, PDO::PARAM_STR);
            $consulta->bindValue(':tipo', $tipo, PDO::PARAM_STR);
            $consulta->bindValue(':fecha_estreno', $fecha_estreno, PDO::PARAM_STR);
            $consulta->bindValue(':cant_publico', $cant_publico, PDO::PARAM_STR);
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

            $consulta = $objetoAccesoDato->RetornarConsulta("SELECT id, nombre, tipo, fecha_estreno,cant_publico,ruta_foto FROM Peliculas");

            $consulta->execute();

            $respuesta = $consulta->fetchAll(PDO::FETCH_CLASS, "Pelicula");
        } catch (Exception $e) {
            $mensaje = $e->getMessage();
            $respuesta = array("Estado" => "ERROR", "Mensaje" => "$mensaje");
        }
        finally {
            return $respuesta;
        }
    }
}