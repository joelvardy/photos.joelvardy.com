window.photos = {

	// Analytics helper
	analyticsEvent: function(action, label) {
		ga('send', 'event', 'userActions', action, label);
	},

	// Clear hash helper
	clearHash: function() {
		window.location.hash = '';
		if (typeof window.history.replaceState == 'function') {
			history.replaceState({}, '', window.location.href.slice(0, -1));
		}
	},

	// Get hash helper
	getHash: function() {
		return window.location.hash.substring(3);
	},

	// Set hash helper
	setHash: function(hash) {
		history.pushState({}, 'Photos', '#!/'+hash);
	}

}

document.addEventListener('DOMContentLoaded', function() {

	// Define foreach
	var forEach = Array.prototype.forEach;

	window.onresize = function() {

		var grid = document.querySelector('div.grid'),
			gridStyle = window.getComputedStyle(grid),
			gridWidth = parseInt(gridStyle.width),
			gridSpacing = Math.floor((gridWidth / 100) * 2.5);

		// Set grid padding
		grid.style.paddingTop = gridSpacing+'px';
		grid.style.paddingLeft = gridSpacing+'px';

		// Set margin for each photo
		forEach.call(grid.querySelectorAll('div.photo'), function(photoElement) {
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
		forEach.call(grid.querySelectorAll('div.photo'), function(photoElement) {

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

	// Define grid
	var gridElement = document.querySelector('div.grid');

	// Convert img tags to some non-semantic divs
	forEach.call(gridElement.querySelectorAll('img'), function(imgElement){

		var divElement = document.createElement('div');
		divElement.classList.add('photo');
		divElement.classList.add(imgElement.classList.toString());
		divElement.dataset.hash = imgElement.dataset.hash;
		divElement.dataset.aspectRatio = imgElement.dataset.aspectRatio;
		divElement.dataset.large = imgElement.dataset.large;
		divElement.style.backgroundImage = 'url('+imgElement.getAttribute('src')+')';
		gridElement.replaceChild(divElement, imgElement);

	});

	// Resize everything on page load
	window.onresize();
	window.onload = function() {
		window.onresize();
	}

	// Initialise lightbox
	var photos = gridElement.querySelectorAll('div.photo');
	var lightbox = new Lightbox(photos, 20);

	// Add events to key presses
	document.onkeydown = function(event) {
		switch (event.keyCode) {

			// Close lightbox on escape
			case 27:
				lightbox.close();
				window.photos.analyticsEvent('Lightbox: close', 'Escape key');
				break;

			// Show previous photo
			case 37:
				lightbox.previous();
				window.photos.analyticsEvent('Lightbox: previous photo', 'Left key');
				break;

			// Show next photo
			case 39:
				lightbox.next();
				window.photos.analyticsEvent('Lightbox: next photo', 'Right key');
				break;

		}
	}

	// Bind swiping gestures
	if ('ontouchstart' in document.documentElement) {
		new Swipe(function() {
			if (lightbox.isOpen()) {
				console.log('Next photo');
				lightbox.next();
				window.photos.analyticsEvent('Lightbox: next photo', 'Swipe');
			}
		}, function() {
			if (lightbox.isOpen()) {
				console.log('Previous photo');
				lightbox.previous();
				window.photos.analyticsEvent('Lightbox: previous photo', 'Swipe');
			}
		});
	}

	// If there is a hash
	if (window.photos.getHash() != '') {
		lightbox.open(window.photos.getHash());
		window.photos.analyticsEvent('Lightbox: open', 'Direct link');
	}

});