<?php

header('Access-Control-Allow-Origin: *');
include_once("Entities/Token.php");
include_once("Entities/usuario.php");

class UsuarioAPI extends Usuario{

    public function RegistrarUsuario($request, $response, $args)
    {
        $json = $request->getBody();
        $data = json_decode($json, true);

        $respuesta = Usuario::Registrar($data["dni"], $data["nombre"], $data["apellido"],
         $data["mail"], $data["pass"], $data["tipo"]);
        $newResponse = $response->withJson($respuesta, 200);
        return $newResponse;
    }

    public function BajarUsuario($request, $response, $args){
        $dni =$args["dni"];

        $respuesta = Usuario::Bajar($dni);
        $newResponse = $response->withJson($respuesta, 200);
        return $newResponse;

    }

    public function ListarUsuario($request, $response, $args){

        $respuesta = Usuario::Listar();
        $newResponse = $response->withJson($respuesta, 200);    	
    	return $newResponse;

    }

    public function ListarUsuariosActivos($request, $response, $args){

        $respuesta = Usuario::ListarActivos();
        $newResponse = $response->withJson($respuesta, 200);    	
    	return $newResponse;

    }

    public function ListarUsuariosCancelados($request, $response, $args){

        $respuesta = Usuario::ListarCancelados();
        $newResponse = $response->withJson($respuesta, 200);    	
    	return $newResponse;

    }


}