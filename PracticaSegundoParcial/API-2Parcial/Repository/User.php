<?php
include_once("DataAccess/AccesoDatos.php");
class User
{
    public $id;
    public $mail;
    public $nombre;
    public $perfil;
    public $sexo;
    public $estado;
    public $promocion;

    
    ///Logueo de empleados
    public static function Autenticacion($mail, $nombre, $clave, $perfil)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();

        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT COUNT(*), id FROM users
                                                            WHERE mail = :mail AND clave = :clave 
                                                            AND nombre = :nombre AND perfil = :perfil 
                                                            AND estado = 'A'");

        $consulta->execute(array(":mail" => $mail, ":nombre" => $nombre, ":clave" => $clave, ":perfil" => $perfil));

        $resultado = $consulta->fetch();
        return $resultado;
    }

    ///Registrar / Alta
    public static function Register($mail, $nombre, $perfil, $sexo, $clave)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $respuesta = "";
        try {            
            $consulta = $objetoAccesoDato->RetornarConsulta("INSERT INTO Users (mail, nombre, perfil, sexo, clave) 
            VALUES (:mail, :nombre, :perfil, :sexo, :clave)");

            $consulta->bindValue(':nombre', $nombre, PDO::PARAM_STR);
            $consulta->bindValue(':sexo', $sexo, PDO::PARAM_STR);
            $consulta->bindValue(':perfil', $perfil, PDO::PARAM_STR);            
            $consulta->bindValue(':mail', $mail, PDO::PARAM_STR);            
            $consulta->bindValue(':clave', $clave, PDO::PARAM_STR);

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

    ///Listar.
    public static function ListAll()
    {
        try {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();

            $consulta = $objetoAccesoDato->RetornarConsulta("SELECT id, mail, nombre, perfil, sexo, estado, promocion FROM Users");

            $consulta->execute();

            $respuesta = $consulta->fetchAll(PDO::FETCH_CLASS, "User");
        } catch (Exception $e) {
            $mensaje = $e->getMessage();
            $respuesta = array("Estado" => "ERROR", "Mensaje" => "$mensaje");
        }
        finally {
            return $respuesta;
        }
    }

    ///Listar.
    public static function ListID($id)
    {
        try {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();

            $consulta = $objetoAccesoDato->RetornarConsulta("SELECT id, mail, nombre, perfil, sexo, estado, promocion FROM Users
                                                            WHERE id = :id");

                                                                     
            $consulta->bindValue(':id', $id, PDO::PARAM_INT);

            $consulta->execute();

            $consulta->setFetchMode(PDO::FETCH_CLASS, 'User'); 
            $respuesta = $consulta->fetch();
        } catch (Exception $e) {
            $mensaje = $e->getMessage();
            $respuesta = array("Estado" => "ERROR", "Mensaje" => "$mensaje");
        }
        finally {
            return $respuesta;
        }
    }


    public static function UpdatePromocion($id, $estado)
    {
        try {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();

            $consulta = $objetoAccesoDato->RetornarConsulta("UPDATE Users SET promocion = :estado WHERE id = :id");

                                                                     
            $consulta->bindValue(':id', $id, PDO::PARAM_INT);
            $consulta->bindValue(':estado', $estado, PDO::PARAM_INT);

            $consulta->execute();

            $consulta->setFetchMode(PDO::FETCH_CLASS, 'User'); 
            $respuesta = $consulta->fetch();
        } catch (Exception $e) {
            $mensaje = $e->getMessage();
            $respuesta = array("Estado" => "ERROR", "Mensaje" => "$mensaje");
        }
        finally {
            return $respuesta;
        }
    }
}
?>