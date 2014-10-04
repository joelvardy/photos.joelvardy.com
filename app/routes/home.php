<?php

use App\Photos;

$app->get('/', function () use ($app) {

	$app->render('home.php');

});
