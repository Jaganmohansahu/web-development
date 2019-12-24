var mySwiper = new Swiper(".swiper-container", {
	// Optional parameters
	effect: "coverflow",
	grabCursor: true,
	centeredSlides: true,
	slidesPerView: "auto",
	coverflowEffect: {
		rotate: 50,
		stretch: 0,
		depth: 100,
		modifier: 1,
		slideShadows: true
	},
/* 	direction: "vertical",
	loop: true,

	// If we need pagination
	pagination: {
		el: ".swiper-pagination"
	},

	// Navigation arrows
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev"
	},

	// And if we need scrollbar
	scrollbar: {
		el: ".swiper-scrollbar"
	} */
});
