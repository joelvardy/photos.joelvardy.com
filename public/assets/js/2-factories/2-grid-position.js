photosApp.factory('GridPosition', function () {

	var position = 0;

	return {

		get: function () {
			return position;
		},
		set: function (value) {
			position = value;
		}

	};

});
