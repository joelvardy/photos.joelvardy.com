document.addEventListener('DOMContentLoaded', function() {

	window.onresize = function() {

		var grid = document.querySelector('div.grid'),
			gridStyle = window.getComputedStyle(grid),
			gridWidth = parseInt(gridStyle.width),
			gridSpacing = Math.floor((gridWidth / 100) * 2.5);

		// Set grid padding
		grid.style.paddingTop = gridSpacing+'px';
		grid.style.paddingLeft = gridSpacing+'px';

		// Set margin for each photo
		[].forEach.call(grid.querySelectorAll('div.photo'), function(photoElement) {
			photoElement.style.marginRight = gridSpacing+'px';
			photoElement.style.marginBottom = gridSpacing+'px';
		});

		// Method to calculate photo size
		var photoSize = function(columns) {
			return Math.floor((gridWidth - ((columns + 1) * gridSpacing)) / columns);
		}

		// Define the number of columns
		var columns = 4;
		if (gridWidth < 800) {
			columns = 2;
		} else if (gridWidth < 1100) {
			columns = 3;
		}

		// Used for positioning wide and tall photos
		var currentColumn = 1,
			offset = 0;

		// Set dimensions for each photo
		[].forEach.call(grid.querySelectorAll('div.photo'), function(photoElement) {

			var resized = false;

			if (currentColumn > columns) {
				currentColumn = 1;
				if (offset > 0) {
					currentColumn = 2;
				}
			}
			if (offset > 0) {
				offset--;
			}

			if (photoElement.classList.contains('wide')) {

				// If a wide photos will fit allow it
				if (currentColumn < columns) {
					photoElement.style.height = photoSize(columns)+'px';
					photoElement.style.width = ((photoSize(columns) * 2) + gridSpacing)+'px';
					currentColumn += 2;
					if (offset > 0) {
						offset--;
					}
					resized = true;
				}

			} else if (photoElement.classList.contains('tall')) {

				// If photo is on the first column make it tall
				if (currentColumn == 1) {
					photoElement.style.height = ((photoSize(columns) * 2) + gridSpacing)+'px';
					photoElement.style.width = photoSize(columns)+'px';
					currentColumn++;
					offset = ((columns - 1) * 2);
					resized = true;
				}

			}

			// Default is square
			if ( ! resized) {
				photoElement.style.height = photoSize(columns)+'px';
				photoElement.style.width = photoSize(columns)+'px';
				currentColumn++;
			}

		});

	}
	window.onresize();

	// Set dimensions for each photo
	[].forEach.call(document.querySelectorAll('div.grid div.photo'), function(photoElement) {
		photoElement.addEventListener('click', function() {

			var spacing = 20;

			var overlayPhoto = document.querySelector('div.overlay-photo'),
				windowAspect = (window.innerWidth - (spacing * 2)) / (window.innerHeight - (spacing * 2)),
				photoAspect = parseFloat(photoElement.dataset.aspectRatio);

			if (windowAspect > photoAspect) {
				var photoHeight = (window.innerHeight - (spacing * 2)),
					photoWidth = Math.floor(photoHeight * photoAspect);
			} else {
				var photoWidth = (window.innerWidth - (spacing * 2)),
					photoHeight = Math.floor(photoWidth / photoAspect);
			}

			overlayPhoto.style.height = photoHeight+'px';
			overlayPhoto.style.width = photoWidth+'px';
			overlayPhoto.style.top = Math.floor((window.innerHeight - photoHeight) / 2)+'px';
			overlayPhoto.style.left = Math.floor((window.innerWidth - photoWidth) / 2)+'px';
			overlayPhoto.style.backgroundImage = photoElement.style.backgroundImage;

		});
	});

});