function Swipe() {
	//
}

Swipe.prototype = {

	init: function(leftCallback, rightCallback) {

		this.active = false;
		this.startPosition = {
			x: 0,
			y: 0
		}
		this.endPosition = {
			x: 0,
			y: 0
		}
		this.leftCallback = leftCallback;
		this.rightCallback = rightCallback;

		var _this = this;

		document.addEventListener('touchstart', function(event) {

			if (event.targetTouches.length == 1) {
				var touchEvent = event.targetTouches[0];
				_this.active = true;
				_this.startPosition.X = touchEvent.pageX;
				_this.startPosition.Y = touchEvent.pageY;
			}

		}, false);

		document.addEventListener('touchmove', function(event) {

			if (event.targetTouches.length == 1) {
				var touchEvent = event.targetTouches[0];
				_this.endPosition.X = touchEvent.pageX;
				_this.endPosition.Y = touchEvent.pageY;
			}

		}, false);

		document.addEventListener('touchend', function(event) {

			_this.active = false;
			var xDirection = ((_this.startPosition.X - _this.endPosition.X) > 0 ? 'left' : 'right'),
				xDelta = Math.abs(_this.startPosition.X - _this.endPosition.X),
				yDelta = Math.abs(_this.startPosition.Y - _this.endPosition.Y);

			// Check they are moving horizontally
			if (xDelta > 50 && (xDelta / 4) > yDelta) {
				switch (xDirection) {

					case 'left':
						_this.leftCallback();
						break;

					case 'right':
						_this.rightCallback();
						break;

				}
			}

		}, false);

	}

}