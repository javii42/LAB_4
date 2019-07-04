<?php

include_once("DataAccess/AccesoDatos.php");

class Usuario{
	public $dni;
    public $nombre;
    public $apellido;
    public $mail;
    public $pass;
    public $estado; //	{true = activo | false = cancelado}
    public $tipo;   // 	{cliente | especialista | administrador | recepcionista}

    public static function Registrar(
    	$dni,
	    $nombre,
	    $apellido,
	    $mail,
	    $pass,
		$tipo)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso('lab_4');
        $respuesta = "";
        try {            
            $consulta = $objetoAccesoDato->RetornarConsulta("INSERT INTO Usuarios (dni, nombre, apellido, mail, pass, estado, tipo) 
            VALUES (:dni, :nombre, :apellido, :mail,:pass, true, :tipo)");

            $consulta->bindValue(':dni', $dni, PDO::PARAM_STR);
            $consulta->bindValue(':nombre', $nombre, PDO::PARAM_STR);
            $consulta->bindValue(':apellido', $apellido, PDO::PARAM_STR);
            $consulta->bindValue(':mail', $mail, PDO::PARAM_STR);
            $consulta->bindValue(':pass', $pass, PDO::PARAM_STR);
            $consulta->bindValue(':tipo', $tipo, PDO::PARAM_STR);

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

    public static function Bajar($dni){
        try {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso('lab_4');
            
            $consulta = $objetoAccesoDato->RetornarConsulta("UPDATE Usuarios
            	SET estado = false
                WHERE dni = :dni");

            $consulta->bindValue(':dni', $dni, PDO::PARAM_STR);


            $consulta->execute();

            $respuesta = array("Estado" => "OK", "Mensaje" => "Cancelado correctamente.");

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

            $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM Usuarios");

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

    public static function ListarActivos(){
        try {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso('lab_4');

            $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM Usuarios
            	WHERE estado = true");

            $consulta->execute();

            $respuesta = $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");
        } catch (Exception $e) {
            $mensaje = $e->getMessage();
            $respuesta = array("Estado" => "ERROR", "Mensaje" => "$mensaje");
        }
        finally {
            return $respuesta;
        }


    }

    public static function ListarCancelados(){
        try {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso('lab_4');

            $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM Usuarios
            	WHERE estado = false");

            $consulta->execute();

            $respuesta = $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");
        } catch (Exception $e) {
            $mensaje = $e->getMessage();
            $respuesta = array("Estado" => "ERROR", "Mensaje" => "$mensaje");
        }
        finally {
            return $respuesta;
        }


    }


    public static function ListarTipo($tipo){
        try {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso('lab_4');

            $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM Usuarios
            	WHERE tipo = :tipo AND estado = true");

            $consulta->bindValue(':tipo', $tipo, PDO::PARAM_STR);

            $consulta->execute();

            $respuesta = $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");
        } catch (Exception $e) {
            $mensaje = $e->getMessage();
            $respuesta = array("Estado" => "ERROR", "Mensaje" => "$mensaje");
        }
        finally {
            return $respuesta;
        }


    }


}