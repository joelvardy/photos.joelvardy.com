<?php

// Define error reporting
error_reporting(0);

// Set some paths
define('BASE_PATH', realpath(dirname(__FILE__)));
define('APP_PATH', BASE_PATH.'/app');
define('CONFIG_PATH', APP_PATH.'/config');
define('ROUTES_PATH', APP_PATH.'/routes');
define('VIEWS_PATH', APP_PATH.'/views');
define('PHOTOS_PATH', BASE_PATH.'/photos');
define('PUBLIC_PATH', BASE_PATH.'/public');

// Setup Composer autoloding
require(BASE_PATH.'/vendor/autoload.php');
