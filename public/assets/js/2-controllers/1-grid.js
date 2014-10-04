app.controller('GridController', ['$scope', '$http', function($scope, $http) {

	$http.get('/photos.json')
	.then(function (response) {
		$scope.photos = response.data;
	});

}]);
