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

		// Add overlay class
		if ( ! document.querySelector(this.settings.overlayClass)) {
			var overlayElement = document.createElement('div');
			overlayElement.classList.add(this.settings.overlayClass);
			this.elements.overlay = document.body.appendChild(overlayElement);
		}

		// Add overlay photo
		if ( ! document.querySelector(this.settings.overlayPhotoClass)) {
			var overlayPhotoElement = document.createElement('div');
			overlayPhotoElement.classList.add(this.settings.overlayPhotoClass);
			this.elements.overlayPhoto = document.body.appendChild(overlayPhotoElement);
		}

	},

	_show: function() {

		this.elements.overlay.style.display = 'block';
		this.elements.overlayPhoto.style.display = 'block';
		this.elements.body.style.overflow = 'hidden';

	},

	_hide: function() {

		this.elements.body.style.overflow = 'auto';
		this.elements.overlayPhoto.style.display = 'none';
		this.elements.overlay.style.display = 'none';

	},

	_updatePhoto: function(element) {

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

	},

	_registerClickListners: function() {

		var _this = this;

		[].forEach.call(this.settings.elements, function(element, i) {
			element.addEventListener('click', function() {

				_this.currentIndex = i;

				_this._updatePhoto(element);

				_this._show();

			});
		});

	},

	close: function() {
		this._hide();
	},

	previous: function() {
		if (typeof this.settings.elements[(this.currentIndex - 1)] == 'undefined') {
			this.currentIndex = (this.settings.elements.length - 1);
		}
		var previousElement = this.settings.elements[(this.currentIndex - 1)];
		this._updatePhoto(previousElement);
		this.currentIndex--;
	},

	next: function() {
		if (typeof this.settings.elements[(this.currentIndex + 1)] == 'undefined') {
			this.currentIndex = -1;
		}
		var previousElement = this.settings.elements[(this.currentIndex + 1)];
		this._updatePhoto(previousElement);
		this.currentIndex++;
	}

}