<?php

require(dirname(__DIR__).'/init.php');

// Allow internal PHP development server to route correctly
if (php_sapi_name() == 'cli-server') {
	$_SERVER['SCRIPT_NAME'] = '/index.php';
	$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
	if ($uri !== '/' && file_exists('public/'.$uri)) {
		return false;
	}
}

$app = new \Slim\Slim([
	'templates.path' => VIEWS_PATH
]);

// Load application routes
foreach (glob(ROUTES_PATH.'/*.php') as $route) {
	require($route);
}

$app->run();
