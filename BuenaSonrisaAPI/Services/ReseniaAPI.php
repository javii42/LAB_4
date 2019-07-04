<?php

header('Access-Control-Allow-Origin: *');
include_once("Entities/Token.php");
include_once("Entities/Resenia.php");

class ReseniaAPI extends Resenia{

    public function RegistrarResenia($request, $response, $args)
    {
        $json = $request->getBody();
        $data = json_decode($json, true);

        $respuesta = Resenia::Registrar($data["id_turno"], $data["txt_resenia"]);
        $newResponse = $response->withJson($respuesta, 200);
        return $newResponse;
    }

    public function ListarPorUsuarioResenia($request, $response, $args)
    {
        $dni = $args["dni"];

        $respuesta = Especialidad::ListarPorUsuario($dni);
        $newResponse = $response->withJson($respuesta, 200);    	
    	return $newResponse;
    }

}