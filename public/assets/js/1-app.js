var photosApp = angular.module('PhotosApp', ['ngRoute']);

photosApp.config(function ($routeProvider) {

	$routeProvider.when('/', {
		templateUrl: '/assets/templates/home.html',
		controller: 'GridController',
	}).when('/:photoHash', {
		templateUrl: '/assets/templates/photo.html',
		controller: 'PhotoController',
	});

});
