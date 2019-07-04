<?php
include_once("DataAccess/AccesoDatos.php");

class Usuario
{
    public $id;
    public $mail;
    public $clave;
    public $tipo;

    
    ///Logueo de empleados
    public static function Autenticacion($mail, $clave, $tipo)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();

        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT COUNT(*), id FROM usuarios
                                                            WHERE mail = :mail AND clave = :clave 
                                                            AND tipo = :tipo");

        $consulta->execute(array(":mail" => $mail, ":clave" => $clave, ":tipo" => $tipo));

        $resultado = $consulta->fetch();
        return $resultado;
    }

    ///Registrar / Alta
    public static function Register($mail, $clave, $tipo)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $respuesta = "";
        try {            
            $consulta = $objetoAccesoDato->RetornarConsulta("INSERT INTO usuarios (mail, clave, tipo) 
            VALUES (:mail, :clave, :tipo)");

            $consulta->bindValue(':mail', $mail, PDO::PARAM_STR);
            $consulta->bindValue(':clave', $clave, PDO::PARAM_STR);
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

    ///Listar.
    public static function ListAll()
    {
        try {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();

            $consulta = $objetoAccesoDato->RetornarConsulta("SELECT id, mail, clave, tipo FROM usuarios");

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

    ///Listar.
    public static function ListID($id)
    {
        try {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();

            $consulta = $objetoAccesoDato->RetornarConsulta("SELECT id, mail, clave, tipo FROM usuarios
                                                            WHERE id = :id");

                                                                     
            $consulta->bindValue(':id', $id, PDO::PARAM_INT);

            $consulta->execute();

            $consulta->setFetchMode(PDO::FETCH_CLASS, 'Usuario'); 
            $respuesta = $consulta->fetch();
        } catch (Exception $e) {
            $mensaje = $e->getMessage();
            $respuesta = array("Estado" => "ERROR", "Mensaje" => "$mensaje");
        }
        finally {
            return $respuesta;
        }
    }


    /*public static function UpdatePromocion($id, $estado)
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
    }*/
}
?>
