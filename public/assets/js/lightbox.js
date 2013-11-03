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
		//
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

	_registerClickListners: function() {

		var _this = this;

		[].forEach.call(this.settings.elements, function(element) {
			element.addEventListener('click', function() {

				var windowAspect = (window.innerWidth - (_this.settings.spacing * 2)) / (window.innerHeight - (_this.settings.spacing * 2)),
					photoAspect = parseFloat(element.dataset.aspectRatio);

				if (windowAspect > photoAspect) {
					var photoHeight = (window.innerHeight - (_this.settings.spacing * 2)),
						photoWidth = Math.floor(photoHeight * photoAspect);
				} else {
					var photoWidth = (window.innerWidth - (_this.settings.spacing * 2)),
						photoHeight = Math.floor(photoWidth / photoAspect);
				}

				_this.elements.overlayPhoto.style.height = photoHeight+'px';
				_this.elements.overlayPhoto.style.width = photoWidth+'px';
				_this.elements.overlayPhoto.style.top = Math.floor((window.innerHeight - photoHeight) / 2)+'px';
				_this.elements.overlayPhoto.style.left = Math.floor((window.innerWidth - photoWidth) / 2)+'px';
				_this.elements.overlayPhoto.style.backgroundImage = element.style.backgroundImage;

			});
		});

	}

}