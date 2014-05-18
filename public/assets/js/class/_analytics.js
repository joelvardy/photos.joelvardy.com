function Analytics() {
	//
}

Analytics.prototype = {

	init: function() {
		//
	},

	event: function(action, label) {
		ga('send', 'event', 'userActions', action, label);
	},

	externalLinks: function() {

		// Track external clicks (only run this if GA has loaded)
		ga(function() {

			Array.prototype.forEach.call(document.querySelectorAll('p.information a'), function(element) {
				element.addEventListener('click', function(event) {

					event.preventDefault();
					var _this = this,
						eventLabel;

					switch (event.target.classList.toString()) {
						case 'joelvardy':
							eventLabel = 'Joel Vardy';
							break;
						case 'github':
							eventLabel = 'GitHub repo';
							break;
					}

					ga('send', 'event', 'userActions', 'External link', eventLabel, {
						'hitCallback': function() {
							document.location.href = _this.href;
						}
					});

				});
			});
		});

	}

};
