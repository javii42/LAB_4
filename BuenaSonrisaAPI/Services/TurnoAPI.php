<?php

header('Access-Control-Allow-Origin: *');
include_once("Entities/Token.php");
include_once("Entities/Turno.php");

class TurnoAPI extends Turno{

    public function RegistrarTurno($request, $response, $args)
    {
        $json = $request->getBody();
        $data = json_decode($json, true);

        $respuesta = Turno::Registrar($data["dni_cli"], $data["dni_esp"], $data["id_consultorio"], $data["fecha"], $data["hora"],$data["tipo_user_gen"]);
        $newResponse = $response->withJson($respuesta, 200);
        return $newResponse;
    }

    public function CambiarEstadoTurno($request, $response, $args){
        $json = $request->getBody();
        $data = json_decode($json, true);

        $respuesta = Turno::CambiarEstado($data["estado"], $data["id"];
        $newResponse = $response->withJson($respuesta, 200);
        return $newResponse;

    }


    public function ListarTurno($request, $response, $args){

        $respuesta = Turno::Listar();
        $newResponse = $response->withJson($respuesta, 200);    	
    	return $newResponse;

    }

}