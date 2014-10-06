photosApp.factory('PhotoData', ['$http', function ($http) {

	var data = [];

	return function (callback) {

		if ( ! data.length) {
			$http.get('/photos.json').then(function (response) {
				data = response.data;
				callback(data);
			});
			return;
		}

		callback(data);

	}

}]);
