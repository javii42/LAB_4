<?php

header('Access-Control-Allow-Origin: *');
include_once("Entities/Token.php");
include_once("Entities/Usuario.php");

class LoginAPI extends Token{

	public function logIN($request, $response, $args)
    {
        $json = $request->getBody();
        $data = json_decode($json, true);

        $pass = $data["pass"];
        $mail = $data["mail"];
        $valido = false;
        $usuarios = Usuario:Listar();
        $usuarioLoggin = null;
        foreach ($usuarios as $usuario) {
            if($usuario=>mail == $mail && $usuario=>pass == pass){
                $validado = true;
                $usuarioLoggin = $usuario;
                break;
            }
        }
        if($validado){
            $respuesta = Token::CodificarToken($usuarioLoggin=>mail, $usuarioLoggin=>dni,
             $usuarioLoggin=>nombre,$usuarioLoggin=>apellido,$usuarioLoggin=>tipo);
            $newResponse = $response->withJson($respuesta, 200);            
        }else{
            $newResponse = $response->withJson(false, 400);
        }

        return $newResponse;
    }

    public function LeerToken($request, $response, $args){
        $token = $args["token"];

        $respuesta = Token::DecodificarToken($token);
        $newResponse = $response->withJson($respuesta, 200);
        return $newResponse;

    }
}