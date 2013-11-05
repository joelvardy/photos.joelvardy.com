function Analytics() {
	//
}

Analytics.prototype = {

	init: function() {
		//
	},

	event: function(action, label) {
		ga('send', 'event', 'userActions', action, label);
	}

}