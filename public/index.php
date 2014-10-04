<?php

require(dirname(__DIR__).'/init.php');

$app = new \Slim\Slim([
	'templates.path' => VIEWS_PATH
]);

// Load application routes
foreach (glob(ROUTES_PATH.'/*.php') as $route) {
	require($route);
}

$app->run();
