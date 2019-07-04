<?php
include_once("Repository/Token.php");
include_once("Repository/User.php");
class UserApi extends User
{  
    ///Logueo.
    public function Login($request, $response, $args)
    {
        $data = $request->getParsedBody();
        $retorno = User::Autenticacion($data["mail"], $data["nombre"], $data["clave"], $data["perfil"]);
        if ($retorno[0] == 1) {
            $token = Token::CodificarToken($data["mail"], $data["perfil"], $retorno["id"], $data["nombre"]);
            $respuesta = array("Estado" => "OK", "Mensaje" => "Logueado exitosamente.", "Token" => $token);
        } else {
            $respuesta = array("Estado" => "ERROR", "Mensaje" => "Datos invalidos.");
        }
        $newResponse = $response->withJson($respuesta, 200);
        return $newResponse;
    }   

    ///Registrar / Alta
    public function Registrar($request, $response, $args)
    {
        $json = $request->getBody();
        $data = json_decode($json, true);

        $respuesta = User::Register($data["mail"],$data["nombre"],$data["perfil"],$data["sexo"],$data["clave"]);
        $newResponse = $response->withJson($respuesta, 200);
        return $newResponse;
    }

    
    public function ActualizarPromocion($request, $response, $args)
    {
        $json = $request->getBody();
        $data = json_decode($json, true);

        $respuesta = User::UpdatePromocion($data["id"],$data["estado"]);
        $newResponse = $response->withJson($respuesta, 200);
        return $newResponse;
    }

    ///Listar.
    public function Listar($request, $response, $args)
    {
        $respuesta = User::ListAll();
        $newResponse = $response->withJson($respuesta, 200);
        return $newResponse;
    }

    ///Listar.
    public function ListarPorID($request, $response, $args)
    {
        $id = $args["id"];
        $respuesta = User::ListID($id);
        $newResponse = $response->withJson($respuesta, 200);
        return $newResponse;
    }
}