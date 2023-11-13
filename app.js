const rat = document.querySelector('#rat');
const controller = document.querySelector('#controller');
const btnRed = document.querySelector('.btn1');
const btnGreen = document.querySelector('.btn2');

let KeyUp = false; 
let KeyDown = false;
let KeyLeft = false;
let KeyRight = false;

//movement controls
let speedX = 0;
let speedY = 0;

window.addEventListener('load', () => {
    rat.style.position = 'absolute';
    rat.style.left = 0;
    rat.style.top = 0;
})
//key check
window.addEventListener('keydown', (e) => {
    rat.style.backgroundImage = 'url(./imgs/ratrun.gif)';
    switch(e.key){
        case 'a':
        KeyLeft = true;
        rat.style.transform = 'scaleX(-1)'
        break;
        case 'd':
        KeyRight = true;
        rat.style.transform = 'scaleX(1)'
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
    rat.style.left = parseInt(rat.style.left) + speedX + 'px';
    rat.style.top = parseInt(rat.style.top) + speedY + 'px';

    if(KeyRight){
        speedX += .2;
    } else if (KeyLeft){
        speedX -= .2;
    } else if (KeyUp){
        speedY -= .2;
    } else if (KeyDown){
        speedY += .2;
    }

    const ratBox = rat.getBoundingClientRect();
    const btnRedBox = btnRed.getBoundingClientRect();

    checkCollisions(ratBox, btnRedBox);
}, 10)

//keyup reset
window.addEventListener('keyup', () => {
    rat.style.backgroundImage = 'url(./imgs/0009.png)';
    speedY = 0;
    speedX = 0;
    KeyUp = false; 
    KeyDown = false;
    KeyLeft = false;
    KeyRight = false;
})

//collisions
function checkCollisions(active, passive){
    let xc;
    let yc;
    if(active.right >= passive.left && active.right <= passive.right || active.left >= passive.left && active.left <= passive.right){
        //console.log('horizontal collisions!');
        xc = true;
    }
    if(active.top >= passive.top && active.top <= passive.bottom || active.bottom >= passive.top && active.bottom <= passive.bottom){
        //console.log('vertical collisions!');
        yc = true;
    }
    if(xc && yc){
        console.log('collisions!')
    }

}






