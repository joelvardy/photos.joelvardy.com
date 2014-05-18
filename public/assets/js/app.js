// @codekit-prepend "class/_swipe.js";
// @codekit-prepend "class/_analytics.js";
// @codekit-prepend "class/_lightbox.js";
// @codekit-prepend "class/_page.js";
// @codekit-prepend "class/_grid.js";

document.addEventListener('DOMContentLoaded', function() {

	window.photos = {

		// Define classes
		swipe: new Swipe(),
		analytics: new Analytics(),
		page: new Page(),
		grid: new Grid(),
		lightbox: new Lightbox()

	};

	// Initialise classes
	window.photos.grid.init();

	// Resize the grid
	window.photos.grid.resize();
	window.addEventListener('resize', function(event) {
		window.photos.grid.resize();
		window.photos.lightbox.repositionPhoto();
	});
	window.photos.grid.resize();

	// Initialise lightbox
	window.photos.lightbox.init(20);

	// If there is a hash to begin with, open the photo
	if (window.photos.page.getHash() !== '') {
		window.photos.lightbox.open(window.photos.page.getHash());
		window.photos.analytics.event('Lightbox: open', 'Direct link');
	}

	// Add events to key presses
	document.onkeydown = function(event) {
		switch (event.keyCode) {

			// Close lightbox on escape
			case 27:
				window.photos.lightbox.close();
				window.photos.analytics.event('Lightbox: close', 'Escape key');
				break;

			// Show previous photo
			case 37:
				window.photos.lightbox.previous();
				window.photos.analytics.event('Lightbox: previous photo', 'Left key');
				break;

			// Show next photo
			case 39:
				window.photos.lightbox.next();
				window.photos.analytics.event('Lightbox: next photo', 'Right key');
				break;

		}
	};

	// If the hash changes
	window.addEventListener('hashchange', function(event) {

		// Close lightbox if we don't want it
		if (window.photos.page.getHash() === '' && window.photos.lightbox.isOpen()) {
			window.photos.lightbox.close();
			window.photos.analytics.event('Lightbox: close', 'Hash change');
			return;
		}

		// Change photo
		window.photos.lightbox.open(window.photos.page.getHash());
		window.photos.analytics.event('Lightbox: change photo', 'Hash change');

	});

	// Track external clicks
	window.photos.analytics.externalLinks();

});
