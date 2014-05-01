window._initTransitions = function() {

	var removeTransition = function($el) {
		$el.removeClass (function (index, css) { return (css.match (/t[0-9]*\-trans/) || []).join(' '); });
	}
	$('.trans-0').each(function() {
		var $this = $(this);
		setTimeout(function() { removeTransition($this) }, 300);
	});
	$('.trans-700, .trans-400, .trans-600, .trans-2000').each(function() {
		var $this = $(this);
		setTimeout(function() { removeTransition($this) }, 500);
	});

};