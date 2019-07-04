<?php
header('Access-Control-Allow-Origin: *');
include_once("Entities/Token.php");
include_once("Entities/Consultorio.php");

class ConsultorioAPI extends Consultorio{

    public function RegistrarConsultorio($request, $response, $args)
    {
        $json = $request->getBody();
        $data = json_decode($json, true);

        $respuesta = Consultorio::Registrar($data["nombre"]);
        $newResponse = $response->withJson($respuesta, 200);
        return $newResponse;
    }

    public function CambiarEstadoConsultorio($request, $response, $args){
        $json = $request->getBody();
        $data = json_decode($json, true);

        $respuesta = Consultorio::CambiarEstado($data["estado"],$data["id"]);
        $newResponse = $response->withJson($respuesta, 200);    	
    	return $newResponse;
    }

    public function ListarConsultorio($request, $response, $args){

        $respuesta = Consultorio::Listar();
        $newResponse = $response->withJson($respuesta, 200);    	
    	return $newResponse;

    }
}