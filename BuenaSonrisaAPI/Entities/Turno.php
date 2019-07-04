<?php

include_once("DataAccess/AccesoDatos.php");

class Turno{
	public $id;
	public $dni_cli;
	public $dni_esp;
	public $id_consultorio;
	public $fecha;
	public $hora;
	public $estado; // {ACEPTADO | CANCELADO | ESPERA | ATENDIENDO | ATENDIDO}
	public $tipo_user_gen; //usuario que genero el turno

	public static function Registrar(
		$dni_cli,
		$dni_esp,
		$id_consultorio,
		$fecha,
		$hora,
		$tipo_user_gen)
	{
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso('lab_4');
        $respuesta = "";
        try {            
            $consulta = $objetoAccesoDato->RetornarConsulta("INSERT INTO Turnos (dni_cli, dni_esp, id_consultorio, fecha, hora, estado, tipo_user_gen) 
            VALUES (:dni_cli, :dni_esp, :id_consultorio, :fecha,:hora, :tipo_user_gen)");

            $consulta->bindValue(':dni_cli', $dni_cli, PDO::PARAM_STR);
            $consulta->bindValue(':dni_esp', $dni_esp, PDO::PARAM_STR);
            $consulta->bindValue(':id_consultorio', $id_consultorio, PDO::PARAM_STR);
            $consulta->bindValue(':fecha', $fecha, PDO::PARAM_STR);
            $consulta->bindValue(':hora', $hora, PDO::PARAM_STR);
            $consulta->bindValue(':tipo_user_gen', $tipo_user_gen, PDO::PARAM_STR);

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

	public static function CambiarEstado($estado,$id){
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso('lab_4');
        $respuesta = "";
        try {            
            $consulta = $objetoAccesoDato->RetornarConsulta("UPDATE Turnos SET estado = :estado
            	WHERE id = :id");

            $consulta->bindValue(':estado', $estado, PDO::PARAM_STR);
            $consulta->bindValue(':id', $id, PDO::PARAM_STR);

            $consulta->execute();

            $respuesta = array("Estado" => "OK", "Mensaje" => "Estado modificado correctamente.");

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

            $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM Turnos");

            $consulta->execute();

            $respuesta = $consulta->fetchAll(PDO::FETCH_CLASS, "Turno");
        } catch (Exception $e) {
            $mensaje = $e->getMessage();
            $respuesta = array("Estado" => "ERROR", "Mensaje" => "$mensaje");
        }
        finally {
            return $respuesta;
        }

	}
}