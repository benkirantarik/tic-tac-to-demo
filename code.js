'use strict';

let app       = document.querySelector('#app');

let start_btn = document.querySelector('#start-btn');

let boxsDiv = document.querySelector('#app #boxs');

start_btn.onclick = function(){
    if(app.getAttribute('game-stat') == 'OFF'){
        app.setAttribute('game-stat','ON');
        boxsDiv.setAttribute('class','on');
        start_btn.setAttribute('class','on');
        start_btn.innerHTML = "Replay";
    }else{
        location.reload();
    }
}

app.setAttribute('game-stat','OFF');

for( let i = 0 ; i < 9 ; i++ ){

    document.querySelector('#app #boxs').innerHTML += `<div class="box" data-id="${i}"></div>`;

}

function generateStringPermutations(inputString) {
    const results = [];
    const usedChars = [];
  
    function permute(input) {
      const chars = input.split('');
  
      if (chars.length === inputString.length) {
        results.push(chars.join(''));
      } else {
        for (let i = 0; i < inputString.length; i++) {
          if (usedChars.includes(inputString[i])) {
            continue;
          }
          usedChars.push(inputString[i]);
          permute(input + inputString[i]);
          usedChars.pop();
        }
      }
    }
  
    permute('');
    return results;
}

let winSerials = ["012","345","678","036","147","258","048","246"];

let allWinSerialsProbs = [];

for(let s = 0 ; s < winSerials.length ; s++ ){

    let arr = generateStringPermutations(winSerials[s]);

    for( let ss = 0 ; ss < arr.length ; ss ++ ){

        allWinSerialsProbs.push(arr[ss]);

    }

}


let boxs = document.querySelectorAll('#app #boxs .box');

let i = 0;

let playerOneSerial = "";

let playerTwoSerial = "";

boxs.forEach(function(e){

        e.onclick = function(){

            let playerOneColor   = document.querySelector('#player-one-color').value;
            let playerTwoColor   = document.querySelector('#player-two-color').value;
            let playerOneBgColor = document.querySelector('#player-one-bg-color').value;
            let playerTwoBgColor = document.querySelector('#player-two-bg-color').value;
    
            if( app.getAttribute('game-stat') == 'ON' ){

                let playersSings = [document.querySelector('#player-one-sing').value,document.querySelector('#player-two-sing').value];

            let clickedBoxID = e.getAttribute("data-id");
    
            if(!e.classList.contains('active') && playerOneSerial.indexOf(clickedBoxID) == -1 && playerTwoSerial.indexOf(clickedBoxID) == -1){
    
                

                if( i % 2 == 0 ){
                    
                    e.classList.add('one');
                    e.setAttribute('style',`color:${playerOneColor};background:${playerOneBgColor}`);
                    playerOneSerial += clickedBoxID;
        
                }else{
        
                    e.classList.add('two');
                    e.setAttribute('style',`color:${playerTwoColor};background:${playerTwoBgColor}`);
                    playerTwoSerial += clickedBoxID;
        
                }
    
                document.querySelector('#app #boxs').setAttribute('player-one-serial',playerOneSerial);
                document.querySelector('#app #boxs').setAttribute('player-two-serial',playerTwoSerial);
    
                putSing(e,playersSings[i%2]);
        
                i++;
    
            }else{
                e.classList.add('active');
            }
    
            if(checkSerialWin(playerOneSerial)){
                setTimeout(() => {
                    alert("PLAYER 1 WIN !!!")
                }, 300);
                playerOneSerial = '';
            }
    
            if(checkSerialWin(playerTwoSerial)){
                setTimeout(() => {
                    alert("PLAYER 2 WIN !!!")
                }, 300);
                playerTwoSerial = '';
            }
    
        }else{
        alert("Click Start To Start The Game !")
    }
    }

})

function putSing(ele,sing){

    if(ele.innerHTML == ""){

        ele.innerHTML += sing;

    }

}

function clearBoxs(boxs){
    for(let i = 0 ; i < 9 ; i++){
        boxs[i].innerHTML = "";
        boxs[i].removeAttribute('style');
        boxs[i].setAttribute('class','box');
    }
    document.querySelector('#boxs').setAttribute('player-one-serial','');
    document.querySelector('#boxs').setAttribute('player-two-serial','');
}

function checkSerialWin(serial){

    for( let p = 0 ; p < allWinSerialsProbs.length ; p++){
        if(serial.search(allWinSerialsProbs[p]) !== -1){
            return true
        }
    }

}