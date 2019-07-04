<?php

include_once("DataAccess/AccesoDatos.php");
include_once("Repository/Relacion.php");

class PeliculaActor{
	public $id;
    public $id_pelicula;
    public $id_actor;

    ///Registrar / Alta
    public static function Registrar(
	    $id_pelicula,
	    $id_actor)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso('PrimerParcial');
        $respuesta = "";
        try {            
            $consulta = $objetoAccesoDato->RetornarConsulta("INSERT INTO pelicula_actor (id_pelicula, id_actor) 
            VALUES (:id_pelicula, :id_actor)");

            $consulta->bindValue(':id_pelicula', $id_pelicula, PDO::PARAM_STR);
            $consulta->bindValue(':id_actor', $id_actor, PDO::PARAM_STR);

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
    public static function Baja($id,$tipo)
    {
        try {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso('PrimerParcial');
            if($tipo == "pelicula"){
                $consulta = $objetoAccesoDato->RetornarConsulta("DELETE FROM pelicula_actor WHERE id_pelicula = :id");

            }else{
                $consulta = $objetoAccesoDato->RetornarConsulta("DELETE FROM pelicula_actor WHERE id_actor = :id");

            }

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
     /*   try {
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
        }*/
    }

    ///Listar.
    public static function Listar()
    {
        try {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso('PrimerParcial');

            $consulta = $objetoAccesoDato->RetornarConsulta("SELECT a.nombre, a.apellido, p.nombre as 'pelicula', p.ruta_foto FROM pelicula_actor
                INNER JOIN Peliculas as p ON id_pelicula = p.id
                INNER JOIN Actores as a ON id_actor = a.id;");

            $consulta->execute();

            $respuesta = $consulta->fetchAll(PDO::FETCH_CLASS, "Relacion");
        } catch (Exception $e) {
            $mensaje = $e->getMessage();
            $respuesta = array("Estado" => "ERROR", "Mensaje" => "$mensaje");
        }
        finally {
            return $respuesta;
        }
    }
}
