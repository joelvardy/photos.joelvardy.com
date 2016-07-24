<?php

require(dirname(__DIR__) . '/init.php');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app = new \Slim\App();
$container = $app->getContainer();

$container['notFoundHandler'] = function ($container) {
    return function ($request, $response) use ($container) {
        return $response->withStatus(302)->withHeader('Location', '/');
    };
};

$container['notAllowedHandler'] = function ($container) {
    return function ($request, $response, $methods) use ($container) {
        return $response->withStatus(405)
            ->withHeader('Allow', implode(', ', $methods))
            ->withHeader('Content-type', 'text/html')
            ->write('Method must be one of: ' . implode(', ', $methods));
    };
};

$app->get('/', function (Request $request, Response $response) {
    $photos = (new \App\Models\Photo())->get();
    ob_start();
    require(dirname(__DIR__) . '/app/views/home.php');
    $response->getBody()->write(ob_get_clean());
    return $response;
});

$app->run();
