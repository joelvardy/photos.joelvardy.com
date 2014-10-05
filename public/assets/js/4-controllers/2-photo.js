photosApp.controller('PhotoController', ['$scope', '$http', 'PhotoData', '$location', '$routeParams', function($scope, $http, PhotoData, $location, $routeParams) {

	var run = function (photos) {

		angular.forEach(photos, function(photo) {
			if (photo.hash === $routeParams.photoHash) {
				$scope.photo = photo;
			}
		});

		if (typeof $scope.photo === 'undefined') {
			$location.path('/');
		}

	}

	if (PhotoData.get().length) {
		run(PhotoData.get());
	} else {
		$http.get('/photos.json').then(function (response) {
			PhotoData.set(response.data);
			run(PhotoData.get());
		});
	}

}]);
