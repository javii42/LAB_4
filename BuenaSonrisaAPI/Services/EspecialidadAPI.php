<?php

header('Access-Control-Allow-Origin: *');
include_once("Entities/Token.php");
include_once("Entities/Especialidad.php");

class EspecialidadAPI extends Especialidad{

    public function RegistrarEspecialidad($request, $response, $args)
    {
        $json = $request->getBody();
        $data = json_decode($json, true);

        $respuesta = Especialidad::Registrar($data["dni_user"], $data["nombre"]);
        $newResponse = $response->withJson($respuesta, 200);
        return $newResponse;
    }

    public function BajaEspecialidad($request, $response, $args)
    {
        $id = $args["id"];

        $respuesta = Especialidad::Baja($id);
        $newResponse = $response->withJson($respuesta, 200);
        return $newResponse;
    }

    public function ListarEspecialidad($request, $response, $args){

        $respuesta = Especialidad::ListarEspecialistas();
        $newResponse = $response->withJson($respuesta, 200);    	
    	return $newResponse;

    }

    public function ListarEspecialistaEspecialidad($request, $response, $args){
        
        $id = $args["id"];

        $respuesta = Especialidad::ListarEspecialista($id);
        $newResponse = $response->withJson($respuesta, 200);    	
    	return $newResponse;

    }

}