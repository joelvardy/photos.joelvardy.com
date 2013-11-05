function Page() {
	var _pageTitle;
}

Page.prototype = {

	init: function() {
		//
	},

	clearHash: function() {
		window.location.hash = '';
		if (typeof window.history.replaceState == 'function') {
			history.replaceState({}, '', window.location.href.slice(0, -1));
		}
	},

	getHash: function() {
		return window.location.hash.substring(3);
	},

	setHash: function(hash) {
		history.pushState({}, 'Photos', '#!/'+hash);
	},

	resetTitle: function() {
		document.title = this._pageTitle;
	},

	setTitle: function(title) {
		if ( ! this._pageTitle) {
			this._pageTitle = document.title;
		}
		document.title = title;
	}

}