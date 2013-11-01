<?php

// Initialise the application
require('../init.php');

// Initialise routes
$routes = new Joelvardy\Routes();

// Load application routes
foreach (glob(ROUTES_PATH.'/*.php') as $route) {
	require($route);
}

// Run routes
$routes->run();