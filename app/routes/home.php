<?php

use Joelvardy\Template;
use App\Photos;

$routes->get('/', function () {

	$photos = new Photos();

	$view = Template::build('home');
	$view->photos = $photos->read();
	echo $view;

});