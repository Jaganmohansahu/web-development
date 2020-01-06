$(window).scroll(function() {
	var scroll = $(window).scrollTop();
	dh = $(document).height();
	wh = $(window).height();
	//scrollPercent = (scroll / (dh - wh)) * 100;
	dw = $(document).width();
	ww = $(window).width();
	scrollPercent = (scroll / (dh - ww)) * 100;
	$(".progressbar").css("width", scrollPercent + "%");
});
