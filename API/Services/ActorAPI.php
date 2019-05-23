<?php
header('Access-Control-Allow-Origin: *');
include_once("Repository/Token.php");
include_once("Repository/Actor.php");

class ActorApi extends Actor{
	 ///Registrar / Alta
    public function RegistrarActor($request, $response, $args)
    {
        $json = $request->getBody();
        $data = json_decode($json, true);

        $respuesta = Actor::Registrar($data["nombre"],$data["apellido"],$data["nacionalidad"],
        	$data["fecha_nacimiento"]);
        $newResponse = $response->withJson($respuesta, 200);
        return $newResponse;
    }

    ///Modificación.
    public function ModificarActor($request, $response, $args)
    {
        $parametros = $request->getParsedBody();
        $usuario = $parametros["usuario"];
        $id = $parametros["id"];
        $nombre = $parametros["nombre"];
        $tipo = $parametros["apellido"];
        $fecha_estreno = $parametros["necionalidad"];
        $cant_publico = $parametros["fecha_nacimiento"];

        $respuesta = Actor::Modificar($id, $nombre, $apellido, $nacionalidad, $fecha_nacimiento);
        $newResponse = $response->withJson($respuesta, 200);
        return $newResponse;
    }

    ///Listar.
    public function ListarActor($request, $response, $args)
    {
        $respuesta = Actor::Listar();
        $newResponse = $response->withJson($respuesta, 200);
        return $newResponse;
    }

    ///Baja
    public function BajaActor($request, $response, $args)
    {
        $id = $args["id"];
        $respuesta = Actor::Baja($id);
        $newResponse = $response->withJson($respuesta, 200);
        return $newResponse;
    }
}
