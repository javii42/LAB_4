<?php

include_once("DataAccess/AccesoDatos.php");

class Usuario{

	public $id;
    public $nombre;
    public $mail;
    public $clave;
    public $perfil;

    ///Registrar / Alta
    public static function Registrar($nombre, $mail, $clave, $perfil)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso('PrimerParcial');
        $respuesta = "";
        try {            
            $consulta = $objetoAccesoDato->RetornarConsulta("INSERT INTO Usuarios (nombre, mail, clave,perfil) 
            VALUES (:nombre, :mail, :clave, :perfil)");

            $consulta->bindValue(':nombre', $nombre, PDO::PARAM_STR);
            $consulta->bindValue(':mail', $mail, PDO::PARAM_STR);
            $consulta->bindValue(':clave', $clave, PDO::PARAM_STR);
            $consulta->bindValue(':perfil', $perfil, PDO::PARAM_STR);

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

            $consulta = $objetoAccesoDato->RetornarConsulta("DELETE FROM Usuarios WHERE id = :id");

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


    ///Listar.
    public static function Listar()
    {
        try {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso('PrimerParcial');

            $consulta = $objetoAccesoDato->RetornarConsulta("SELECT id, nombre, mail, clave ,perfil  FROM Usuarios");

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


    public static function ListarUltimoID()
    {
        try {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso('PrimerParcial');

            $consulta = $objetoAccesoDato->RetornarConsulta("SELECT MAX(id) as id FROM Usuarios");

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