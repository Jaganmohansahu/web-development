const bg = document.getElementById("bg");
function randomColor() {
    return Math.floor(Math.random() * 255);
}
bg.addEventListener('click', () => {
    bg.style.backgroundColor = 'rgba(' + randomColor() + ',' + randomColor() + ',' + randomColor() + ')';
});