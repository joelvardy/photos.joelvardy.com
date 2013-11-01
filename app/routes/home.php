<?php

use Joelvardy\Template;

$routes->get('/', function () {

	echo Template::build('home');

});