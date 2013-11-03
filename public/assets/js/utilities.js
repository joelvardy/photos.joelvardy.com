Element.prototype.hasClass = function(className) {
	return new RegExp(' '+className+' ').test(' '+this.className+' ');
}