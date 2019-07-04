<?php
header('Access-Control-Allow-Origin: *');
include_once("Repository/Token.php");
include_once("Repository/Pelicula.php");

class PeliculaApi extends Pelicula{
	 ///Registrar / Alta
    public function RegistrarPelicula($request, $response, $args)
    {
        $json = $request->getBody();
        $data = json_decode($json, true);

        $respuesta = Pelicula::Registrar($data["nombre"],$data["tipo"],$data["fecha_estreno"],
        	$data["cant_publico"]);
        $newResponse = $response->withJson($respuesta, 200);
        return $newResponse;
    }

    ///Modificación.
    public function ModificarPelicula($request, $response, $args)
    {
        $parametros = $request->getParsedBody();
        $usuario = $parametros["usuario"];
        $id = $parametros["id"];
        $nombre = $parametros["nombre"];
        $tipo = $parametros["tipo"];
        $fecha_estreno = $parametros["fecha_estreno"];
        $cant_publico = $parametros["cant_publico"];

        $respuesta = Pelicula::Modificar($id, $nombre, $tipo, $fecha_estreno, $cant_publico);
        $newResponse = $response->withJson($respuesta, 200);
        return $newResponse;
    }

    ///Listar.
    public function ListarPelicula($request, $response, $args)
    {
        $respuesta = Pelicula::Listar();
        $newResponse = $response->withJson($respuesta, 200);
        return $newResponse;
    }

    public function SeleccionarUltimoID($request, $response, $args){
        $respuesta = Pelicula::ListarUltimoID();
        $newResponse = $response->withJson($respuesta, 200);
        return $newResponse;

    }
    ///Baja
    public function BajaPelicula($request, $response, $args)
    {
        $id = $args["id"];
        $respuesta = Pelicula::Baja($id);
        $newResponse = $response->withJson($respuesta, 200);
        return $newResponse;
    }
}