function Lightbox(elements, spacing) {

	// Define settings
	this.settings = {
		overlayClass: 'overlay',
		overlayPhotoClass: 'overlay-photo',
		elements: elements,
		spacing: spacing
	}

	// Define elements
	this.elements = {
		body: document.querySelector('body')
	}

	// Setup elements
	this._setup();

	// Register events
	this._registerClickListners();

}

Lightbox.prototype = {

	_setup: function() {

		var _this = this;

		this.isOpen = false;

		// Add overlay class
		if ( ! document.querySelector(this.settings.overlayClass)) {
			var overlayElement = document.createElement('div');
			overlayElement.classList.add(this.settings.overlayClass);
			this.elements.overlay = document.body.appendChild(overlayElement);
		}

		// Close lightbox on click
		this.elements.overlay.addEventListener('click', function() {
			_this._hide();
			window.photos.analyticsEvent('Lightbox: close', 'Clicked overlay');
		});

		// Add overlay photo
		if ( ! document.querySelector(this.settings.overlayPhotoClass)) {
			var overlayPhotoElement = document.createElement('div');
			overlayPhotoElement.classList.add(this.settings.overlayPhotoClass);
			this.elements.overlayPhoto = document.body.appendChild(overlayPhotoElement);
		}

		// Close lightbox on click
		this.elements.overlayPhoto.addEventListener('click', function() {
			_this._hide();
			window.photos.analyticsEvent('Lightbox: close', 'Clicked photo');
		});

	},

	_show: function() {

		this.elements.overlay.style.display = 'block';
		this.elements.overlayPhoto.style.display = 'block';
		this.elements.body.style.overflow = 'hidden';

		this.isOpen = true;

	},

	_hide: function() {

		this.elements.body.style.overflow = 'auto';
		this.elements.overlayPhoto.style.display = 'none';
		this.elements.overlay.style.display = 'none';

		this.isOpen = false;

		// Remove hash
		window.photos.clearHash();

	},

	_updatePhoto: function(element) {

		var _this = this;

		var windowAspect = (window.innerWidth - (this.settings.spacing * 2)) / (window.innerHeight - (this.settings.spacing * 2)),
			photoAspect = parseFloat(element.dataset.aspectRatio);

		if (windowAspect > photoAspect) {
			var photoHeight = (window.innerHeight - (this.settings.spacing * 2)),
				photoWidth = Math.floor(photoHeight * photoAspect);
		} else {
			var photoWidth = (window.innerWidth - (this.settings.spacing * 2)),
				photoHeight = Math.floor(photoWidth / photoAspect);
		}

		this.elements.overlayPhoto.style.height = photoHeight+'px';
		this.elements.overlayPhoto.style.width = photoWidth+'px';
		this.elements.overlayPhoto.style.top = Math.floor((window.innerHeight - photoHeight) / 2)+'px';
		this.elements.overlayPhoto.style.left = Math.floor((window.innerWidth - photoWidth) / 2)+'px';
		this.elements.overlayPhoto.style.backgroundImage = element.style.backgroundImage;

		// Update hash
		window.photos.setHash(element.dataset.hash);

		// Load large image
		var image = new Image();
		image.onload = function() {
			_this.elements.overlayPhoto.style.backgroundImage = 'url('+element.dataset.large+')';
		}
		image.src = element.dataset.large;

	},

	_registerClickListners: function() {

		var _this = this;

		Array.prototype.forEach.call(this.settings.elements, function(element, i) {
			element.addEventListener('click', function() {

				_this.currentIndex = i;
				_this._updatePhoto(element);
				_this._show();

				window.photos.analyticsEvent('Lightbox: open', 'Clicked photo');

			});
		});

	},

	open: function(hash) {

		var _this = this;

		Array.prototype.forEach.call(this.settings.elements, function(element, i) {
			if (element.dataset.hash == hash) {

				_this.currentIndex = i;
				_this._updatePhoto(element);
				_this._show();
				return;

			}
			if (i == (_this.settings.elements.length - 1)) {
				window.photos.clearHash();
			}
		});

	},

	close: function() {
		this._hide();
	},

	previous: function() {

		if ( ! this.isOpen) return;

		if (typeof this.settings.elements[(this.currentIndex - 1)] == 'undefined') {
			this.currentIndex = (this.settings.elements.length - 1);
		}
		var previousElement = this.settings.elements[(this.currentIndex - 1)];
		this._updatePhoto(previousElement);
		this.currentIndex--;

	},

	next: function() {

		if ( ! this.isOpen) return;

		if (typeof this.settings.elements[(this.currentIndex + 1)] == 'undefined') {
			this.currentIndex = -1;
		}
		var previousElement = this.settings.elements[(this.currentIndex + 1)];
		this._updatePhoto(previousElement);
		this.currentIndex++;

	}

}