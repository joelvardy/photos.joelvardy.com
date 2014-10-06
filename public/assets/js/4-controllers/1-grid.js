photosApp.controller('GridController', ['$scope', 'PhotoData', function($scope, PhotoData) {

	PhotoData(function (photos) {
		$scope.photos = photos;
	});

}]);
