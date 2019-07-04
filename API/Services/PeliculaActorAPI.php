<?php
header('Access-Control-Allow-Origin: *');
include_once("Repository/Token.php");
include_once("Repository/PeliculaActor.php");

class PeliculaActorApi extends Actor{
	 ///Registrar / Alta
    public function RegistrarRelacion($request, $response, $args)
    {
        $json = $request->getBody();
        $data = json_decode($json, true);

        $respuesta = PeliculaActor::Registrar($data["id_pelicula"],$data["id_actor"]);
        $newResponse = $response->withJson($respuesta, 200);
        return $newResponse;
    }

    ///Modificación.
    public function ModificarRelacion($request, $response, $args)
    {
        $parametros = $request->getParsedBody();
        $usuario = $parametros["usuario"];
        $id_pelicula = $parametros["id_pelicula"];
        $id_actor = $parametros["id_actor"];

        $respuesta = PeliculaActor::Modificar($id_pelicula, $id_actor);
        $newResponse = $response->withJson($respuesta, 200);
        return $newResponse;
    }

    ///Listar.
    public function ListarRelacion($request, $response, $args)
    {
        $respuesta = PeliculaActor::Listar();
        $newResponse = $response->withJson($respuesta, 200);
        return $newResponse;
    }

    ///Baja
    public function BajarRelacionPorPelicula($request, $response, $args)
    {
        $id = $args["id_pelicula"];
        $respuesta = PeliculaActor::Baja($id,"pelicula");
        $newResponse = $response->withJson($respuesta, 200);
        return $newResponse;
    }
    public function BajarRelacionPorActor($request, $response, $args)
    {
        $id = $args["id_actor"];
        $respuesta = PeliculaActor::Baja($id,"actor");
        $newResponse = $response->withJson($respuesta, 200);
        return $newResponse;
    }
}
