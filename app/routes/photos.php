<?php

use App\Photos;

$app->get('/photos.json', function () use ($app) {

	$app->response->headers->set('Content-Type', 'application/json');

	$photos = new Photos();
	echo json_encode($photos->read());

});
