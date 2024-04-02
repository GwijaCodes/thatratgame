const ratMesh = document.querySelector('#ratMesh');
const ratBox = document.querySelector('#ratBox');
const controller = document.querySelector('#controller');
const screen = document.querySelector('.screen');
const timeLeft = document.querySelector('#time-left');
let timePerc = 1000;
const scoreDisplay = document.querySelector('#score');
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
let disableU = false;
let disableD = false;
let disableY = false;
let score;

let speedX = 0;
let speedY = 0;

//after loading
window.addEventListener('load', () => {
    controller.style.width = 600 + 'px';
    controller.style.position = 'absolute';
    controller.style.left = window.innerWidth / 2 + 'px';
    score = 0;
    game();
    if(window.innerWidth <= 500){
    controller.style.top = window.innerHeight / 2 + 'px';
    } else {
        controller.style.top = window.innerHeight / 2 + window.innerHeight / 4 + 'px';
    }
})

//key check
window.addEventListener('keydown', (e) => {
    console.log('keydown')
    ratMesh.classList.add('run');
    ratMesh.classList.remove('idle')
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
    controller.style.left = parseInt(controller.style.left) + speedX + 'px';
    controller.style.top = parseInt(controller.style.top) + speedY + 'px';

    if(KeyRight){
        speedX -= .6;
    } else if (KeyLeft){
        speedX += .6;
    } else if (KeyUp){
        speedY += .6;
    } else if (KeyDown){
        speedY -= .6;
    }

    checkCollisions();
    //timeBar();

    //pseudo gravity
    if(parseInt(controller.style.left) > window.innerWidth / 2 + 300 || parseInt(controller.style.left) < window.innerWidth / 2 - 300){
        gameOver()
    }
    scoreDisplay.innerHTML = `Score: ${score}`
}, 10)

//keyup reset
window.addEventListener('keyup', () => {
    ratMesh.classList.add('idle');
    ratMesh.classList.remove('run');
    speedY = 0;
    speedX = 0;
    KeyUp = false; 
    KeyDown = false;
    KeyLeft = false;
    KeyRight = false;

    if(inputs[0] == true || inputs[1] == true || inputs[2] == true){
        anyBtnPressed = true;
    } else {
        anyBtnPressed = false;
    }
    if(anyBtnPressed){
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
        controller.style.backgroundPositionX = '1800px';
        if(!disableU){
            inputs[0] = true;
            inputs[1] = 'd';
            disableD = false;
            disableY = false;
            setTimeout(()=>{disableU = true; inputs = ['u', 'd', 'y'];}, 300);  
        }
    } else if (dX && dY){
        controller.style.backgroundPositionX = '1200px';
        if(!disableD){
            inputs[1] = true;
            inputs[0] = 'u';
            disableU = false;
            disableY = false;
            setTimeout(()=>{disableD = true; inputs = ['u', 'd', 'y'];}, 300);
        }
    } else if (yX && yY){
        controller.style.backgroundPositionX = '600px';
        if(!disableY){
            inputs[2] = true;
            disableU = false;
            disableD = false;
            setTimeout(()=>{disableY = true; inputs = ['u', 'd', 'y'];}, 300);
        }
    } else {
        controller.style.backgroundPositionX = '0px';
        inputs = ['u', 'd', 'y'];
        disableU = false;
        disableD = false;
        disableY = false;
    }
}

//game mechanic
function game(){
    console.log('game called!')
    let myPress = inputs.findIndex(isTrue);
    function isTrue(btn){
        return btn == true;
    }
    //right or wrong button
    if(anyBtnPressed){
         if(myPress === randChoice){
            screen.style.backgroundColor = 'green'
            score++;   
            timePerc = 1000;
        } else if (myPress != randChoice) {
            gameOver()
        }
    }
       
    //new game
    setTimeout(function getOff(){
        screen.style.backgroundColor = '#4EA5AA'
        randChoice = Math.floor(Math.random() * 3);
        let choices = ['Press Cross', 'Press Circle', 'Press Yellow']
        h1.innerHTML = choices[randChoice];
    }, 500)
}

function gameOver(){
    console.log('gameover called!')
    h1.innerHTML = 'Whoops'
    timeLeft.innerText = '100%'
    score = 0;
    setTimeout(() => {  
        controller.style.left = window.innerWidth / 2 + 'px';
        controller.style.top = window.innerHeight / 2 + window.innerHeight / 4 + 'px';
        if(window.innerWidth < 400){
            controller.style.top = window.innerHeight / 2 + 'px';
            }
        randChoice = -1;
        timePerc = 100;
        game()
        },500)
    }

function timeBar(){
    console.log('timebar called')
    timeLeft.innerText = parseInt(timePerc / 10) + '%';
    timePerc--
    if(timePerc <= 0){
        gameOver()
    }
}

for(let i > 0; i > 10; i++){
    console.log(i)
}