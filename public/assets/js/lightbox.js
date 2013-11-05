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

		this._isOpen = false;
		this._pagePosition = 0;

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

		// Move to next photo
		this.elements.overlayPhoto.addEventListener('click', function() {
			_this.next();
			window.photos.analyticsEvent('Lightbox: next photo', 'Clicked photo in lightbox');
		});

	},

	_show: function() {

		this._pagePosition = window.pageYOffset;

		this.elements.overlay.style.display = 'block';
		this.elements.overlayPhoto.style.display = 'block';
		this.elements.body.style.overflow = 'hidden';

		this._isOpen = true;

	},

	_hide: function() {

		var _this = this;

		this.elements.body.style.overflow = 'auto';

		// Some weird shit happening (with window.scroll) has to be a few ms late
		setTimeout(function() {

			window.scroll(0, _this._pagePosition);

			_this.elements.overlayPhoto.style.display = 'none';
			_this.elements.overlay.style.display = 'none';

			_this._isOpen = false;

		}, 10);

		// Remove hash
		window.photos.clearHash();

		// Reset page title
		window.photos.resetTitle();

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

		// Update hash
		if (window.photos.getHash() != element.dataset.hash) {
			window.photos.setHash(element.dataset.hash);
		}

		// Update page title
		window.photos.setTitle(element.getAttribute('title'));

		// Is images cached
		var smallImage = document.createElement('img');
		smallImage.src = element.dataset.small;
		if (smallImage.complete || (smallImage.width+smallImage.height) > 0) {
			this.elements.overlayPhoto.style.backgroundImage = element.style.backgroundImage;
			var image = new Image();
			image.onload = function() {
				_this.elements.overlayPhoto.style.backgroundImage = 'url('+element.dataset.large+')';
			}
			image.src = element.dataset.large;
		} else {
			this.elements.overlayPhoto.style.backgroundImage = 'url('+element.dataset.large+')';
		}

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

	isOpen: function() {
		return this._isOpen;
	},

	open: function(hash) {

		var _this = this,
			foundPhoto = false;

		Array.prototype.forEach.call(this.settings.elements, function(element, i) {
			if (element.dataset.hash == hash) {

				foundPhoto = true;
				_this.currentIndex = i;
				_this._updatePhoto(element);
				if ( ! _this.isOpen()) {
					_this._show();
				}
				return;

			}
			if ( ! foundPhoto && (i == (_this.settings.elements.length - 1))) {
				window.photos.clearHash();
			}
		});

	},

	close: function() {
		this._hide();
	},

	previous: function() {

		if ( ! this.isOpen()) return;

		if (typeof this.settings.elements[(this.currentIndex - 1)] == 'undefined') {
			this.currentIndex = this.settings.elements.length;
		}
		var previousElement = this.settings.elements[(this.currentIndex - 1)];
		this._updatePhoto(previousElement);
		this.currentIndex--;

	},

	next: function() {

		if ( ! this.isOpen()) return;

		if (typeof this.settings.elements[(this.currentIndex + 1)] == 'undefined') {
			this.currentIndex = -1;
		}
		var previousElement = this.settings.elements[(this.currentIndex + 1)];
		this._updatePhoto(previousElement);
		this.currentIndex++;

	}

}