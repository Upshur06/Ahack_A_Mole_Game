let boxs = document.querySelectorAll('.box');
let scoreBoard = document.querySelector('.score-board');
let timeKeeper = document.querySelector('.time');
let startBtn = document.getElementById('start-button');
let boxContainer = document.getElementById('box-container');

let time = 60;
let speed = 5000;
let x1 = "";
let points = "";
let restart = true;

startBtn.addEventListener('click',countDown);

const reset = ()=>{
    boxs.forEach((box)=>{
        box.classList.remove('active');
    });  
}

function start(){
    reset();
    let x2 = Math.floor(Math.random()*10+1);

    if(x2 == x1){
        start();
    }

    x1=x2;
    document.getElementById(x2).classList.add('active');
}


function score(elem){
    if(time == 0){
        clearInterval(s)
        return
    }
    if(elem.id == x1 && elem.className == 'box active'){
        reset();
        points++;
        scoreBoard.innerText = "Score: " + points;
     } else {
         if(elem.id !== x1 && elem.className == 'box'){
             boxContainer.style.border = "1px solid #FF494A";
             setTimeout(()=>{
                boxContainer.style.border = "1px solid #fff";
             },250)
         }
     }

     if(points >= 30){
         speed = 500;
         clearInterval(s);
         s = setInterval(start,speed);
     }else if(points >= 20){
        speed = 650;
        clearInterval(s);
        s = setInterval(start,speed) ;       
     }else if(points >= 10){
        speed = 750;
        clearInterval(s);
        s = setInterval(start,speed);
     }
}

function countDown(){
    if(restart == true){
        startBtn.style.opacity = "0";
        points = 0;
        scoreBoard.innerText = "Score: " + points;
        timeKeeper.innerText = "Time: 60";
        time = 60;
        speed = 1000;
        restart = false;
        s = setInterval(start,speed);
        y = setInterval(function(){
            timeKeeper.innerText = "Time: " + time--;
            if(time == 0){
                score();
                clearInterval(y);
                reset();
                restart = true;
                timeKeeper.innerText = "Game Over";
                startBtn.style.opacity = "1";
            }
        }, 1000);
    }
}