function Page() {
	var _pageTitle;
}

Page.prototype = {

	init: function() {
		//
	},

	clearHash: function() {
		history.replaceState({}, this._pageTitle, '/');
	},

	getHash: function() {
		return window.location.hash.substring(3);
	},

	setHash: function(hash) {
		history.pushState({}, document.title, '#!/'+hash);
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