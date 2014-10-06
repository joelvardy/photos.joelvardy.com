var photosApp = angular.module('PhotosApp', ['ngRoute', 'ngTouch']);

photosApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

	$routeProvider.when('/', {
		templateUrl: '/assets/templates/home.html',
		controller: 'GridController',
	}).when('/:photoHash', {
		templateUrl: '/assets/templates/photo.html',
		controller: 'PhotoController',
	});

	$locationProvider.html5Mode(true);

}]);
