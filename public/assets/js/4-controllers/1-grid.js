photosApp.controller('GridController', ['$rootScope', '$scope', '$window', '$timeout', 'PhotoData', 'GridPosition', function($rootScope, $scope, $window, $timeout, PhotoData, GridPosition) {

	$rootScope.title = 'Photos Taken By Joel Vardy';

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
