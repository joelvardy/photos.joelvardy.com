photosApp.factory('PhotoData', function () {

	var data = [];

	return {
		get: function () {
			return data;
		},
		set: function (photos) {
			data = photos;
		}
	};

});
