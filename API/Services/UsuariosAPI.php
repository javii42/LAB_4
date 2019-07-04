<?php
header('Access-Control-Allow-Origin: *');
include_once("Repository/Token.php");
include_once("Repository/Usuario.php");

class UsuariosApi extends Actor{
	 ///Registrar / Alta
    public function RegistrarUsuario($request, $response, $args)
    {
        $json = $request->getBody();
        $data = json_decode($json, true);

        $respuesta = Usuario::Registrar($data["nombre"],$data["mail"],$data["clave"],
        	$data["perfil"]);
        $newResponse = $response->withJson($respuesta, 200);
        return $newResponse;
    }

    ///Listar.
    public function ListarUsuario($request, $response, $args)
    {
        $respuesta = Usuario::Listar();
        $newResponse = $response->withJson($respuesta, 200);
        return $newResponse;
    }

    ///Baja
    public function BajaUsuario($request, $response, $args)
    {
        $id = $args["id"];
        $respuesta = Usuario::Baja($id);
        $newResponse = $response->withJson($respuesta, 200);
        return $newResponse;
    }
}
