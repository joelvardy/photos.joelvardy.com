photosApp.controller('GridController', ['$scope', '$window', '$timeout', 'PhotoData', 'GridPosition', function($scope, $window, $timeout, PhotoData, GridPosition) {

	PhotoData(function (photos) {

		$scope.photos = photos;

		angular.element($window).bind('scroll', function () {
			GridPosition.set(this.pageYOffset);
		});

		$scope.$on('$destroy', function () {
			angular.element($window).unbind('scroll');
		});

		$timeout(function () {
			window.scrollTo(0, GridPosition.get());
		}, 50);

	});

}]);
