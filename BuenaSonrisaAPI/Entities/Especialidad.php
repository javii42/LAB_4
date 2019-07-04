<?php

include_once("DataAccess/AccesoDatos.php");

class Especialidad{

	public $id;
	public $dni_user;
	public $nombre;

	  public static function Registrar(
	    $dni_user,
	    $nombre)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso('lab_4');
        $respuesta = "";
        try {            
            $consulta = $objetoAccesoDato->RetornarConsulta("INSERT INTO Especialidades 
            	(dni_user, nombre) 
            VALUES (:dni, :nombre)");

            $consulta->bindValue(':dni', $dni_user, PDO::PARAM_STR);
            $consulta->bindValue(':nombre', $nombre, PDO::PARAM_STR);

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

    public static function Baja($id){
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso('lab_4');
        $respuesta = "";
        try {            
            $consulta = $objetoAccesoDato->RetornarConsulta("DELETE FROM Usuarios
            	WHERE id = :id");

            $consulta->bindValue(':id', $id, PDO::PARAM_STR);

            $consulta->execute();

            $respuesta = array("Estado" => "OK", "Mensaje" => "Eliminado correctamente.");

        } catch (Exception $e) {
            $mensaje = $e->getMessage();
            $respuesta = array("Estado" => "ERROR", "Mensaje" => "$mensaje");
        }
        finally {
            return $respuesta;
        }

    }

    public static function ListarEspecialistas(){
        try {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso('lab_4');

            $consulta = $objetoAccesoDato->RetornarConsulta("
            	SELECT u.nombre as Nombre, u.apellido as apellido,
            	 e.nombre as Especialidad
            	FROM Usuarios AS u
            	INNER JOIN Especialidades AS e ON u.dni = e.dni_user");

            $consulta->execute();

            $respuesta = $consulta->fetchAll(PDO::FETCH_CLASS, "Especialidad");
        } catch (Exception $e) {
            $mensaje = $e->getMessage();
            $respuesta = array("Estado" => "ERROR", "Mensaje" => "$mensaje");
        }
        finally {
            return $respuesta;
        }

    }

    public static function ListarEspecialista($id){
        try {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso('lab_4');

            $consulta = $objetoAccesoDato->RetornarConsulta("
            	SELECT u.nombre as Nombre, u.apellido as apellido,
            	 e.nombre as Especialidad
            	FROM Usuarios AS u
            	INNER JOIN Especialidades AS e ON u.dni = e.dni_user
            	WHERE Especialidades.id = :id");

            $consulta->bindValue(':id', $id, PDO::PARAM_STR);

            $consulta->execute();

            $respuesta = $consulta->fetchAll(PDO::FETCH_CLASS, "Especialidad");
        } catch (Exception $e) {
            $mensaje = $e->getMessage();
            $respuesta = array("Estado" => "ERROR", "Mensaje" => "$mensaje");
        }
        finally {
            return $respuesta;
        }

    }

    
}

