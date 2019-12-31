count = 10;
$(document).ready(function() {
	for (i = 0; i < count; i++) {
		$(".cont").append(`<div class='dot dot${i}'></div>`);
	}

	$(document).mousemove(function() {
		mX = event.clientX;
		mY = event.clientY;
		for (i = 0; i < count; i++) {
			$(".dot" + i).css({
				left: mX + "px",
				top: mY + "px",
				transition: i * 0.05 + "s linear",
				background: "hsl(" + i * 20 + ",70%,50%)"
			});
		}
	});
});
