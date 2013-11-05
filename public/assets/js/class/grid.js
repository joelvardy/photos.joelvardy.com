function Grid() {
	//
}

Grid.prototype = {

	init: function() {

		// Define elements
		this.elements = {
			grid: document.querySelector('div.grid')
		}

		// Setup elements
		this._setupElements();

	},

	_setupElements: function() {

		var _this = this;

		// Convert img tags to some non-semantic divs
		Array.prototype.forEach.call(this.gridElement().querySelectorAll('img'), function(imgElement){

			var divElement = document.createElement('div');
			divElement.classList.add('photo');
			divElement.classList.add(imgElement.classList.toString());
			divElement.dataset.hash = imgElement.dataset.hash;
			divElement.dataset.aspectRatio = imgElement.dataset.aspectRatio;
			divElement.dataset.large = imgElement.dataset.large;
			divElement.setAttribute('title', imgElement.getAttribute('alt'));
			divElement.dataset.small = imgElement.getAttribute('src');
			divElement.style.backgroundImage = 'url('+divElement.dataset.small+')';
			_this.gridElement().replaceChild(divElement, imgElement);

		});

	},

	_photoSize: function(columns) {

		// Calculate photo size
		return Math.floor((this.gridWidth - ((columns + 1) * this.gridSpacing)) / columns);

	},

	gridElement: function() {
		return this.elements.grid;
	},

	resize: function() {

		var _this = this;

		this.gridWidth = parseInt(window.getComputedStyle(this.elements.grid).width);
		this.gridSpacing = Math.floor((this.gridWidth / 100) * 2.5);

		// Set grid padding
		this.elements.grid.style.paddingTop = this.gridSpacing+'px';
		this.elements.grid.style.paddingLeft = this.gridSpacing+'px';

		// Set margin for each photo
		Array.prototype.forEach.call(this.elements.grid.querySelectorAll('div.photo'), function(photoElement) {
			photoElement.style.marginRight = _this.gridSpacing+'px';
			photoElement.style.marginBottom = _this.gridSpacing+'px';
		});

		// Define the number of columns
		var columns = 4;
		if (this.gridWidth < 800) {
			columns = 2;
		} else if (this.gridWidth < 1100) {
			columns = 3;
		}

		// Used for positioning wide and tall photos
		var currentColumn = 1,
			offset = 0;

		// Set dimensions for each photo
		Array.prototype.forEach.call(this.elements.grid.querySelectorAll('div.photo'), function(photoElement) {

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
					photoElement.style.height = _this._photoSize(columns)+'px';
					photoElement.style.width = ((_this._photoSize(columns) * 2) + _this.gridSpacing)+'px';
					currentColumn += 2;
					if (offset > 0) {
						offset--;
					}
					resized = true;
				}

			} else if (photoElement.classList.contains('tall')) {

				// If photo is on the first column make it tall
				if (currentColumn == 1) {
					photoElement.style.height = ((_this._photoSize(columns) * 2) + _this.gridSpacing)+'px';
					photoElement.style.width = _this._photoSize(columns)+'px';
					currentColumn++;
					offset = ((columns - 1) * 2);
					resized = true;
				}

			}

			// Default is square
			if ( ! resized) {
				photoElement.style.height = _this._photoSize(columns)+'px';
				photoElement.style.width = _this._photoSize(columns)+'px';
				currentColumn++;
			}

		});

	}

}