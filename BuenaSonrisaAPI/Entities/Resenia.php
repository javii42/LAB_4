<?php

include_once("DataAccess/AccesoDatos.php");

class Resenia{
	public $id;
	public $id_turno;
	public $txt_resenia;

	public static function Registrar(
		$id_turno,
		$txt_resenia)
	{     
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso('lab_4');
        $respuesta = "";
        try{
            $consulta = $objetoAccesoDato->RetornarConsulta("INSERT INTO Resenias 
            	(id_turno, txt_resenia)
            	 VALUES (:id_turno, :txt_resenia)");

            $consulta->bindValue(':id_turno', $id_turno, PDO::PARAM_STR);
            $consulta->bindValue(':txt_resenia', $txt_resenia, PDO::PARAM_STR);

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

	public static function ListarPorUsuario($dni_cli){
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso('lab_4');
        $respuesta = "";
        try{
            $consulta = $objetoAccesoDato->RetornarConsulta("SELECT u.nombre AS NombreCliente, u.apellido AS ApellidoCliente, t.fecha AS FechaTurno,
             e.nombre AS NombreEspecialista, e.apellido AS ApellidoEspecialista,
             r.txt_resenia AS Resenia
             FROM Resenias As r
             INNER JOIN Turnos as t ON r.id_turno = t.id
             INNER JOIN Usuarios AS u ON  t.dni_cli = u.dni
             INNER JOIN Usuarios AS e ON t.dni_esp = e.dni
             WHERE t.estado <> 'CANCELADO' AND u.dni = :dni_cli
             ORDER BY t.fecha");

            $consulta->bindValue(':dni_cli', $dni_cli, PDO::PARAM_STR);

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
}