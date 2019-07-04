<?php

header('Access-Control-Allow-Origin: *');
include_once("Entities/Token.php");
include_once("Entities/LogUsuario.php");

class LogUsuarioAPI extends LogUsuario{

    public function RegistrarLogUsuario($request, $response, $args)
    {
        $json = $request->getBody();
        $data = json_decode($json, true);
        $respuesta = LogUsuario::Registrar($data["fecha"], $data["hora"],$data["tipo_log"]);
        $newResponse = $response->withJson($respuesta, 200);
        return $newResponse;
    }

    public function ListarLogUsuario($request, $response, $args){

        $respuesta = LogUsuario::Listar();
        $newResponse = $response->withJson($respuesta, 200);    	
    	return $newResponse;

    }

}