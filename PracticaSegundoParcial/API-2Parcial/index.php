<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require './vendor/autoload.php';
include_once './Services/UserAPI.php';
include_once './Services/ServicioAPI.php';
include_once './Middleware/TokenMiddleware.php';

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
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

$app->post('/login[/]', \UserAPI::class . ':Login');
$app->post('[/]', \UserAPI::class . ':Registrar')
->add(\TokenMiddleware::class . ':ValidarToken');
$app->get('[/]', \UserAPI::class . ':Listar')
->add(\TokenMiddleware::class . ':ValidarToken');   
$app->get('/User/{id}[/]', \UserAPI::class . ':ListarPorID')
->add(\TokenMiddleware::class . ':ValidarToken');  
$app->put('[/]', \UserAPI::class . ':ActualizarPromocion')
->add(\TokenMiddleware::class . ':ValidarToken'); 

$app->post('/Zapatos[/]', \ServicioAPI::class . ':Registrar');     
$app->get('/Zapatos[/]', \ServicioAPI::class . ':Listar');


$app->run();