<?php

include_once("DataAccess/AccesoDatos.php");

class LogUsuario{

	public $id;
	public $fecha;
	public $hora;
	public $tipo_log; //{LOGIN | LOGOUT}

	  public static function Registrar(
	    $fecha,
	    $hora,
		$tipo_log)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso('lab_4');
        $respuesta = "";
        try {            
            $consulta = $objetoAccesoDato->RetornarConsulta("INSERT INTO LogUsuarios 
            	(fecha, hora, tipo_log) 
            VALUES (:fecha, :hora, :tipo_log)");

            $consulta->bindValue(':fecha', $fecha, PDO::PARAM_STR);
            $consulta->bindValue(':hora', $hora, PDO::PARAM_STR);
            $consulta->bindValue(':tipo_log', $tipo_log, PDO::PARAM_STR);

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

    public static function Listar(){
        try {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso('lab_4');

            $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM LogUsuarios
            	ORDER BY tipo_log");

            $consulta->execute();

            $respuesta = $consulta->fetchAll(PDO::FETCH_CLASS, "LogUsuario");
        } catch (Exception $e) {
            $mensaje = $e->getMessage();
            $respuesta = array("Estado" => "ERROR", "Mensaje" => "$mensaje");
        }
        finally {
            return $respuesta;
        }



    }


}