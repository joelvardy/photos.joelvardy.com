photosApp.controller('PhotoController', ['$scope', 'PhotoData', '$document', '$location', '$routeParams', function($scope, PhotoData, $document, $location, $routeParams) {
	PhotoData(function (photos) {

		var currentPhotoKey = 0;

		angular.forEach(photos, function(photo, key) {
			if (photo.hash === $routeParams.photoHash) {
				currentPhotoKey = key;
				$scope.photo = photo;
			}
		});

		// Redirect to the homepage (don't save this pageview in history)
		if (typeof $scope.photo === 'undefined') {
			$location.path('/').replace();
		}

		$scope.close = function () {
			$location.path('/');
		}

		$scope.previous = function (event) {
			if (event) event.stopPropagation();
			if (typeof photos[currentPhotoKey - 1] !== 'undefined') {
				$location.path('/'+photos[currentPhotoKey - 1].hash);
			}
		}

		$scope.next = function (event) {
			if (event) event.stopPropagation();
			if (typeof photos[currentPhotoKey + 1] !== 'undefined') {
				$location.path('/'+photos[currentPhotoKey + 1].hash);
			}
		}

		$document.bind('keydown', function (event) {
			$scope.$apply(function() {
				switch (event.keyCode) {

					case 27:
						$location.path('/');
						break;

					case 37:
						$scope.previous();
						break;

					case 39:
						$scope.next();
						break;

				}
			});
		});

		$scope.$on('$destroy', function () {
			$document.unbind('keydown');
		});

	});
}]);
