<?php

include_once("Repository/Mascota.php");

class MascotaApi extends Mascota
{  
    ///Registrar / Alta
    public function Registrar($request, $response, $args)
    {
        $json = $request->getBody();
        $data = json_decode($json, true);

        $respuesta = Servicio::Register($data["animal"],$data["raza"],$data["nombre"],$data["edad"],$data["duenio"],$data["foto"]);
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
