<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require './vendor/autoload.php';
include_once './Services/VehiculoAPI.php';
include_once './Services/PeliculaAPI.php';
include_once './Services/ActorAPI.php';
include_once './Services/PeliculaActorAPI.php';
include_once './Services/UsuariosAPI.php';

use \Firebase\JWT\JWT;
header('Access-Control-Allow-Origin: *');



$app = new \Slim\App([
    'settings' => [
        'displayErrorDetails' => true
    ]
]);

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

$app->post('/Vehiculos/registrar[/]', \VehiculoAPI::class . ':RegistrarVehiculo');
$app->get('/Vehiculos/listar[/]', \VehiculoAPI::class . ':ListarVehiculos');
$app->delete('/Vehiculos/{id}[/]', \VehiculoAPI::class . ':BajaVehiculo');
$app->post('/Vehiculos/modificar[/]', \VehiculoAPI::class . ':ModificarVehiculo');

$app->post('/Peliculas/registrar[/]', \PeliculaAPI::class . ':RegistrarPelicula');
$app->get('/Peliculas/listar[/]', \PeliculaAPI::class . ':ListarPelicula');
$app->get('/Peliculas/listarID[/]', \PeliculaAPI::class . ':SeleccionarUltimoID');
$app->delete('/Peliculas/{id}[/]', \PeliculaAPI::class . ':BajaPelicula');
$app->post('/Peliculas/modificar[/]', \PeliculaAPI::class . ':ModificarPelicula	');

$app->post('/Actores/registrar[/]', \ActorAPI::class . ':RegistrarActor');
$app->get('/Actores/listar[/]', \ActorAPI::class . ':ListarActor');
$app->delete('/Actores/{id}[/]', \ActorAPI::class . ':BajaActor');
$app->post('/Actores/modificar[/]', \ActorAPI::class . ':ModificarActor');

$app->post('/Relacion/registrar[/]', \PeliculaActorAPI::class . ':RegistrarRelacion');
$app->get('/Relacion/listar[/]', \PeliculaActorAPI::class . ':ListarRelacion');
$app->delete('/Relacion/bajaPelicula/{id_pelicula}[/]',
 \PeliculaActorAPI::class . ':BajarRelacionPorPelicula');
$app->delete('/Relacion/bajaActor/{id_actor}[/]', \PeliculaActorAPI::class . ':BajarRelacionPorActor');
$app->post('/Relacion/modificar[/]', \PeliculaActorAPI::class . ':ModificarRelacion');

$app->post('/Usuarios/registrar[/]', \UsuariosAPI::class . ':RegistrarUsuario');
$app->get('/Usuarios/listar[/]', \UsuariosAPI::class . ':ListarUsuario');
$app->delete('/Usuarios/{id}[/]', \UsuariosAPI::class . ':BajaUsuario');

$app->post('/crearToken[/]',function (Request $request, Response $response){
    $datos = $request->getParsedBody();
    //var_dump($datos);
    $ahora = time();
    $expire = $ahora + 1500;
    $playload = array(
        'iat'=>$ahora,
        'exp'=>$expire, //15 sec
        'data'=>$datos,
        'app'=> 'Ejercicio 23/11/2018'
    );

    $token = JWT::encode($playload,'123');
    return $response->withJson($token,200);
});


$app->post('/verificarToken[/]',function (Request $request, Response $response){
    $parametros = $request->getParsedBody();
    var_dump($parametros);
    $token = trim($parametros['token'],'"');
    //var_dump($parametros);
    if(empty($token) || $token == ""){
        return $response->withJson(array('mensaje'=>'Token vacio'),502);
        //throw new Exception("El toquen esta vacio");
    }
    try{
        $decodificado = JWT::decode(
            $token,
            '123',
            ['HS256']
        );
      //  var_dump($decodificado);
    }catch(Exception $e){
        return $response->withJson(array('mensaje'=>'Token no valido'),502);
        //throw new Exception("Token no valido");
    }

    return $response->withJson(array('mensaje'=>'Token ok',"datos"=>$decodificado),200);
});

$app->run();