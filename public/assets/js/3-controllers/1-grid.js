photosApp.controller('GridController', ['$scope', '$http', 'PhotoData', function($scope, $http, PhotoData) {

	if ( ! PhotoData.get().length) {
		$http.get('/photos.json').then(function (response) {
			PhotoData.set(response.data);
			$scope.photos = PhotoData.get();
		});
	}

	$scope.photos = PhotoData.get();

}]);
