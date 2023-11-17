const ratMesh = document.querySelector('#ratMesh');
const ratBox = document.querySelector('#ratBox');
const controller = document.querySelector('#controller');
const screen = document.querySelector('.screen');
const h1 = document.querySelector('h1');
const y = document.querySelector('#y');
const u = document.querySelector('#u');
const d = document.querySelector('#d');

let KeyUp = false; 
let KeyDown = false;
let KeyLeft = false;
let KeyRight = false;

let randChoice = 0;
let anyBtnPressed = false;

//movement controls
let speedX = 0;
let speedY = 0;

window.addEventListener('load', () => {
    ratMesh.src = './imgs/static-rat.png'
    ratBox.style.position = 'absolute';
    ratBox.style.left = 480 + 'px';
    ratBox.style.top = 480 + 'px';
    game();
})

//key check
window.addEventListener('keydown', (e) => {
    ratMesh.src = "./imgs/h-run.gif"
    switch(e.key){
        case 'a':
        KeyLeft = true;
        ratBox.style.transform = 'scaleX(-1)'
        break;
        case 'd':
        KeyRight = true;
        ratBox.style.transform = 'scaleX(1)'
        break;
        case 'w':
        KeyUp = true;
        break;
        case 's':
        KeyDown = true;
        break;
    }
})

//game loop
setInterval(function GameTicks(){
    ratBox.style.left = parseInt(ratBox.style.left) + speedX + 'px';
    ratBox.style.top = parseInt(ratBox.style.top) + speedY + 'px';

    if(KeyRight){
        speedX += .2;
    } else if (KeyLeft){
        speedX -= .2;
    } else if (KeyUp){
        speedY -= .2;
    } else if (KeyDown){
        speedY += .2;
    }

    checkCollisions();
    //console.log(anyBtnPressed)
    if(inputs[0] == true || inputs[1] == true || inputs[2] == true){
        anyBtnPressed = true;
    } else {
        anyBtnPressed = false;
    }
}, 10)

//keyup reset
window.addEventListener('keyup', () => {
    ratMesh.src = './imgs/static-rat.png'
    speedY = 0;
    speedX = 0;
    KeyUp = false; 
    KeyDown = false;
    KeyLeft = false;
    KeyRight = false;

    if(anyBtnPressed){
        console.log('new instruction')
        game()
    }
})

//collisions
let inputs = ['u', 'd', 'y'];
function checkCollisions(){
    const ratHitBox = ratBox.getBoundingClientRect();
    const yBox = y.getBoundingClientRect();
    const uBox = u.getBoundingClientRect();
    const dBox = d.getBoundingClientRect();
    
    //down
    let dX = ratHitBox.right >= dBox.left && ratHitBox.right <= dBox.right || ratHitBox.left >= dBox.left && ratHitBox.left <= dBox.right;
    let dY = ratHitBox.top >= dBox.top && ratHitBox.top <= dBox.bottom || ratHitBox.bottom >= dBox.top && ratHitBox.bottom <= dBox.bottom;
    //up
    let uX = ratHitBox.right >= uBox.left && ratHitBox.right <= uBox.right || ratHitBox.left >= uBox.left && ratHitBox.left <= uBox.right;
    let uY = ratHitBox.top >= uBox.top && ratHitBox.top <= uBox.bottom || ratHitBox.bottom >= uBox.top && ratHitBox.bottom <= uBox.bottom;
    //y
    let yX = ratHitBox.right >= yBox.left && ratHitBox.right <= yBox.right || ratHitBox.left >= yBox.left && ratHitBox.left <= yBox.right;
    let yY = ratHitBox.top >= yBox.top && ratHitBox.top <= yBox.bottom || ratHitBox.bottom >= yBox.top && ratHitBox.bottom <= yBox.bottom;
    
    if(uX && uY){
        controller.style.backgroundImage = 'url(./imgs/u-pressed.png)';
        inputs[0] = true;
        inputs[1] = 'd';
    } else if (dX && dY){
        controller.style.backgroundImage = 'url(./imgs/d-pressed.png)';
        inputs[1] = true;
        inputs[0] = 'u';
    } else if (yX && yY){
        controller.style.backgroundImage = 'url(./imgs/y-pressed.png)';
        inputs[2] = true;
    } else {
        controller.style.backgroundImage = 'url(./imgs/controller.png)';
        inputs = ['u', 'd', 'y'];
    }
}

function game(){
    let myPress = inputs.findIndex(isTrue);
    function isTrue(btn){
        return btn == true;
    }
    setTimeout(function getOff(){
        screen.style.backgroundColor = 'white'
        randChoice = Math.floor(Math.random() * 3);
        let choices = ['Press Up', 'Press Down', 'Press Yellow']
        h1.innerHTML = choices[randChoice];
    }, 1000)

    if(anyBtnPressed){
        console.log(myPress)
        if(myPress === randChoice){
            screen.style.backgroundColor = 'green'
            console.log('match!')
        } else if (myPress != randChoice) {
            console.log('unmatched')
            gameOver()
        }
    }
}

function gameOver(){
    screen.style.backgroundColor = 'red'
    ratBox.style.left = 480 + 'px';
    ratBox.style.top = 480 + 'px';
    h1.innerHTML = 'Press any key to start'
}
