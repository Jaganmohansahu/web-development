document.addEventListener("mousemove", function(e) {
	var body = document.querySelector("body");
	var bubbles = document.createElement("span");

	var x = e.offsetX;
	var y = e.offsetY;

	bubbles.style.left = x + "px";
	bubbles.style.top = y + "px";

	var size = Math.random() * 100;
	bubbles.style.width = 20 + size + "px";
	bubbles.style.height = 20 + size + "px";

	body.appendChild(bubbles);

	setTimeout(function() {
		bubbles.remove();
	}, 4000);
});
