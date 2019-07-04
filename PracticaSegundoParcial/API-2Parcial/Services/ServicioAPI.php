<?php
include_once("Repository/Servicio.php");
class ServicioApi extends Servicio
{  
    ///Registrar / Alta
    public function Registrar($request, $response, $args)
    {
        $json = $request->getBody();
        $data = json_decode($json, true);

        $respuesta = Servicio::Register($data["codigo"],$data["nombre"],$data["fechaIngreso"],$data["local"],$data["precio"],$data["genero"], $data["imagen"]);
        $newResponse = $response->withJson($respuesta, 200);
        return $newResponse;
    }

    ///Listar.
    public function Listar($request, $response, $args)
    {
        $respuesta = Servicio::ListAll();
        $newResponse = $response->withJson($respuesta, 200);
        return $newResponse;
    }
}