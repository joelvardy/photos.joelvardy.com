<?php

$app->get('/', function () use ($app) {

	$app->render('home.php');

});

$app->get('/:slug', function ($photo_slug) use ($app) {

	$app->render('home.php');

})->conditions(array('slug' => '([A-Za-z0-9])+'));
