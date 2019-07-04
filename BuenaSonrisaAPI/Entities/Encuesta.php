<?php

include_once("DataAccess/AccesoDatos.php");

class Encuesta{

	public $id;
	public $id_turno;
	public $dni_cli;
	public $ptos_clinica;
	public $ptos_especialista;
	public $texto;

	public static function Registrar(
		$id_turno,
		$dni_cli,
		$ptos_clinica,
		$ptos_especialista,
		$texto)
	{
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso('lab_4');
        $respuesta = "";
        try {            
            $consulta = $objetoAccesoDato->RetornarConsulta("INSERT INTO Encuestas 
            	(id_turno, dni_cli, ptos_clinica, ptos_especialista, texto)
            	 VALUES (:id_turno, :dni_cli, :ptos_clinica, :ptos_especialista, :texto)");

            $consulta->bindValue(':id_turno', $id_turno, PDO::PARAM_STR);
            $consulta->bindValue(':dni_cli', $dni_cli, PDO::PARAM_STR);
            $consulta->bindValue(':ptos_clinica', $ptos_clinica, PDO::PARAM_STR);
            $consulta->bindValue(':ptos_especialista', $ptos_especialista, PDO::PARAM_STR);
            $consulta->bindValue(':texto', $texto, PDO::PARAM_STR);

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

            $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM Encuestas");

            $consulta->execute();

            $respuesta = $consulta->fetchAll(PDO::FETCH_CLASS, "Encuesta");
        } catch (Exception $e) {
            $mensaje = $e->getMessage();
            $respuesta = array("Estado" => "ERROR", "Mensaje" => "$mensaje");
        }
        finally {
            return $respuesta;
        }

	}

	public static function ListarMejoresEspecialistas(){
        try {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso('lab_4');

            $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM Encuestas
            	WHERE ptos_especialista = (SELECT MAX(ptos_especialista) FROM Encuestas");

            $consulta->execute();

            $respuesta = $consulta->fetchAll(PDO::FETCH_CLASS, "Encuesta");
        } catch (Exception $e) {
            $mensaje = $e->getMessage();
            $respuesta = array("Estado" => "ERROR", "Mensaje" => "$mensaje");
        }
        finally {
            return $respuesta;
        }

	}

	public static function ListarPeoresEspecialistas(){
        try {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso('lab_4');

            $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM Encuestas
            	WHERE ptos_especialista = (SELECT MIN(ptos_especialista) FROM Encuestas");

            $consulta->execute();

            $respuesta = $consulta->fetchAll(PDO::FETCH_CLASS, "Encuesta");
        } catch (Exception $e) {
            $mensaje = $e->getMessage();
            $respuesta = array("Estado" => "ERROR", "Mensaje" => "$mensaje");
        }
        finally {
            return $respuesta;
        }

	}



}