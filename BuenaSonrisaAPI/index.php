<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


include_once './Services/UsuarioAPI.php';
include_once './Services/LogUsuarioAPI.php';
include_once './Services/TurnoAPI.php';
include_once './Services/EspecialidadAPI.php';
include_once './Services/ConsultorioAPI.php';
include_once './Services/LoginAPI.php';
include_once './Services/ReseniaAPI.php';
include_once './Services/EncuestaAPI.php';

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


$app->post('/LogIn[/]', \LoginAPI::class . ':logIN'); // mail + pass : token
$app->get('/Token/{token}[/]', \LoginAPI::class . ':LeerToken') //token


$app->post('/Usuario/registrar[/]', \UsuarioAPI::class . ':RegistrarUsuario'); //dni + nombre + apellido + mail + pass + tipo
$app->delete('/Usuario/{dni}[/]', \UsuarioAPI::class . ':BajarUsuario'); //dni
$app->get('/Usuario/listar[/]', \UsuarioAPI::class . ':ListarUsuario'); 
$app->get('/Usuario/listarActivos[/]', \UsuarioAPI::class . ':ListarUsuariosActivos');
$app->get('/Usuario/listarCancelados[/]', \UsuarioAPI::class . ':ListarUsuariosCancelados');

$app->post('/LogUsuario/registrar[/]', \LogUsuarioAPI::class . ':RegistrarLogUsuario'); //fechaq + hora + tipo_log
$app->get('/LogUsuario/listar[/]', \LogUsuarioAPI::class . ':ListarLogUsuario');


$app->post('/Encuesta/registrar[/]', \EncuestaAPI::class . ':RegistrarEncuesta');  // id_turno + dni_cli + ptos_clinica + ptos_especialista + texto
$app->get('/Encuesta/listar[/]', \EncuestaAPI::class . ':ListarEncuesta');
$app->get('/Encuesta/listarMejores[/]', \EncuestaAPI::class . ':ListarMejoresEspecialistasEncuesta');
$app->get('/Encuesta/listarPeores[/]', \EncuestaAPI::class . ':ListarPeoresEspecialistasEncuesta');


$app->post('/Turno/registrar[/]', \TurnoAPI::class . ':RegistrarTurno'); // dni_cli + dni_esp + id_consultorio + fecha + hora + tipo_user_gen
$app->post('/Turno/cambiarEstado[/]', \TurnoAPI::class . ':CambiarEstadoTurno'); // estado + id
$app->get('/Turno/listar[/]', \TurnoAPI::class . ':ListarTurno');

$app->post('/Resenia/registrar[/]', \ReseniaAPI::class . ':RegistrarResenia'); // id_turno + txt_resenia
$app->get('/Resenia/listar/{dni}[/]', \ReseniaAPI::class . ':ListarPorUsuarioResenia'); //dni_cli


$app->post('/Especialidad/registrar[/]', \EspecialidadAPI::class . ':RegistrarEspecialidad'); //dni_user + nombre
$app->delete('/Especialidad/{id}[/]', \EspecialidadAPI::class . ':BajaEspecialidad'); //id
$app->get('/Especialidad/listar[/]', \EspecialidadAPI::class . ':ListarEspecialidad');
$app->get('/Especialidad/listarEspecialista/{id}[/]', \EspecialidadAPI::class . ':ListarEspecialistaEspecialidad'); //id


$app->post('/Consultorio/registrar[/]', \ConsultorioAPI::class . ':RegistrarConsultorio'); //nombre
$app->post('/Consultorio/cambiarEstado[/]', \ConsultorioAPI::class . ':CambiarEstadoConsultorio'); //estado + dni
$app->get('/Consultorio/listar[/]', \ConsultorioAPI::class . ':ListarConsultorio');


$app->run();

