const searchIcon = document.querySelector(".search-icon-wrapper");
searchIcon.addEventListener("click", function() {
	searchIcon.parentElement.classList.toggle("open");
	if (document.querySelector(".open")) {
		searchIcon.previousElementSibling.value = "";
	}
});
