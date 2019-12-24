var slide = document.getElementById("slide");
window.onmousemove = function(e) {
    var x = e.clientX;
    slide.style.left = x + 'px';
}