photosApp.directive('jvPhotoFill', ['$window', function ($window) {
	return {
		link: function ($scope, element, attrs) {

			element.css('display', 'none');
			element.bind('load', function (event) {

				var centre = function () {

					var spacing = 15,
						windowAspectRatio = ($window.innerWidth - (spacing * 2)) / ($window.innerHeight - (spacing * 2)),
						photoAspectRatio = element[0].width / element[0].height;

					var photoWidth, photoHeight;
					if (windowAspectRatio > photoAspectRatio) {
						photoHeight = ($window.innerHeight - (spacing * 2));
						photoWidth = Math.floor(photoHeight * photoAspectRatio);
					} else {
						photoWidth = ($window.innerWidth - (spacing * 2));
						photoHeight = Math.floor(photoWidth / photoAspectRatio);
					}

					element.css({
						display: 'block',
						height: photoHeight+'px',
						left: Math.floor(($window.innerWidth - photoWidth) / 2)+'px',
						top: Math.floor(($window.innerHeight - photoHeight) / 2)+'px',
						width: photoWidth+'px'
					});

				}

				centre();

				angular.element($window).bind('resize', centre);

				$scope.$on('$destroy', function () {
					angular.element($window).unbind('resize', centre);
				});

			});

		}
	};
}]);
