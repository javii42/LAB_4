<?php
require './vendor/autoload.php';
use \Firebase\JWT\JWT;


class Token{

    private static $key = "example_key";

    private static $token = array(
        "iss" => "lab_4APP", //Emisor
        "aud" => "Mollar", //Público
        "iat" => "", //Cuándo fue metido
        "nbf" => "", //Antes de esto no va a funcionar (Desde)
        //"exp" => "", //Hasta cuando va a funcionar
        "mail" => "",
        "dni" => "",
        "nombre" => "",
        "apellido" => "",
        "tipo" => ""
    );

    public static function CodificarToken($mail,$dni,$nombre,$apellido,$tipo){        
        $fecha = new Datetime("now", new DateTimeZone('America/Buenos_Aires'));
        Token::$token["iat"] = $fecha->getTimestamp();                
        Token::$token["nbf"] = $fecha->getTimestamp();
        Token::$token["mail"] = $mail; 
        Token::$token["dni"] = $dni; 
        Token::$token["nombre"] = $nombre;
        Token::$token["apellido"] = $apellido;
        Token::$token["tipo"] = $tipo;
        $jwt = JWT::encode(Token::$token, Token::$key);

        return $jwt;
    }    

    public static function DecodificarToken($token){
        try
        {            
            $payload = JWT::decode($token, Token::$key, array('HS256'));
            $decoded = array("Estado" => "OK", "Mensaje" => "OK", "Payload" => $payload);
        }
        catch(\Firebase\JWT\BeforeValidException $e){
            $mensaje = $e->getMessage();
            $decoded = array("Estado" => "ERROR", "Mensaje" => "$mensaje");
        }
        catch(\Firebase\JWT\ExpiredException $e){
            $mensaje = $e->getMessage();
            $decoded = array("Estado" => "ERROR", "Mensaje" => "$mensaje.");
        }
        catch(\Firebase\JWT\SignatureInvalidException $e){
            $mensaje = $e->getMessage();
            $decoded = array("Estado" => "ERROR", "Mensaje" => "$mensaje");
        }
        catch(Exception $e){
            $mensaje = $e->getMessage();
            $decoded = array("Estado" => "ERROR", "Mensaje" => "$mensaje");
        }        
        return $decoded;
    }
}
?>