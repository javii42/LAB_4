<?php

header('Access-Control-Allow-Origin: *');
include_once("Entities/Token.php");
include_once("Entities/Encuesta.php");

class EncuestaAPI extends Encuesta{

    public function RegistrarEncuesta($request, $response, $args)
    {
        $json = $request->getBody();
        $data = json_decode($json, true);

        $respuesta = Encuesta::Registrar($data["id_turno"],$data["dni_cli"],$data["ptos_clinica"],
            $data["ptos_especialista"],$data["texto"]);
        $newResponse = $response->withJson($respuesta, 200);
        return $newResponse;
    }

    public function ListarEncuesta($request, $response, $args){

        $respuesta = Encuesta::Listar();
        $newResponse = $response->withJson($respuesta, 200);    	
    	return $newResponse;

    }

    public function ListarMejoresEspecialistasEncuesta($request, $response, $args){

        $respuesta = Encuesta::ListarMejoresEspecialistas();
        $newResponse = $response->withJson($respuesta, 200);    	
    	return $newResponse;

    }

    public function ListarPeoresEspecialistasEncuesta($request, $response, $args){

        $respuesta = Encuesta::ListarPeoresEspecialistas();
        $newResponse = $response->withJson($respuesta, 200);    	
    	return $newResponse;

    }

}