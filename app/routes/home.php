<?php

use Joelvardy\Template;
use App\Photos;

$routes->get('/', function () {

	$photos = new Photos();

	// echo Template::build('home');

	var_dump($photos->read());

});