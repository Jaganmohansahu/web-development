$(function() {
	// default config
	// $(".cursor").confettiButton();

	// manual config
	$(".cursor").confettiButton({
		// the number of particles
		num: 60,

		// an array of colos
		colorArray: ["#FF5566", "#FFFFFF", "#F1C40F", "#2EBFF6", "#2ECC71"],

		// min/max distances
		minX: 5,
		minY: 5,
		maxX: 120,
		maxY: 120,

		// min/max scale levels
		minScale: 50,
		maxScale: 150,

		// animation speed
		speed: 1,

		// rotate the particles
		rotation: true,

		// appears on a hover event
		hoverOnly: false
	});
});

$(document).mousemove(function(e) {
	$(".cursor").css({ left: e.pageX, top: e.pageY });
});
