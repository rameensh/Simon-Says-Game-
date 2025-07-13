let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let h2 = document.querySelector('h2');
let btnColors = ["red", "green", "yellow", "purple"];

// q kae hum chahte hai pure document mai kahi par bhi key press  ho game start ho jae isiliye hum 
// document par EventListener lagaenge keypress event
document.addEventListener("keypress", function(){
    if (started == false){
        console.log("game started");
        started = true;
        levelUp();
    }
});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function gameFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp(){
    userSeq = [];
    // iss function mai hum doo kaam kar rahe honge 
    // 1. level increase karaenge
    level++;
    h2.innerText = `Level ${level}`;
    // 2. btn ko flash
    // q ke abh hamai button ko flsh baar baar karwana hai isiliye hum uske leae alag se function likhenge
    // choosing a random button and then passing that button as an argument to btnFlash function
    let randomIdx = Math.floor(Math.random() * 3);
    let randomColor = btnColors[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    btnFlash(randomBtn);
}

function checkAns(idx){
    // console.log("curr level ", level);
    if(gameSeq[idx] === userSeq[idx]){
        if(gameSeq.length == userSeq.length){
            setTimeout(levelUp, 1000);
        }
    }else{
        h2.innerHTML = `Game Over.Your score was <b>${level}</b> <br> Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress(){
    let btn = this;
    gameFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let btnAll = document.querySelectorAll(".btn");
for(btn of btnAll){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}