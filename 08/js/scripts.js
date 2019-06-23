let coordinateWrapper = document.getElementById('coordinates');

document.onkeyup = function(event) {
const keyCodePressed = event.keyCode;
document.getElementById('message').innerHTML = keyCodePressed
if (keyCodePressed === 13) {
    //Generate random between 0 and whatever Math.random is multiplied
    const x = Math.floor(Math.random() * window.innerWidth);
    const y = Math.floor(Math.random() * window.innerHeight);
    console.log(x, y);
    const coordinates = 'x: ' + x + ', y: ' + y;
    coordinateWrapper.innerHTML = coordinates;
    coordinateWrapper.appendChild(document.createElement('div'))
}
}