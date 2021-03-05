console.log("reading js");

(function() {
    'use strict';
    console.log("reading js from IIFE");

    var startGame = document.getElementById('startgame');
    var gameControl = document.getElementById('gamecontrol');
    var game = document.getElementById('game');
    var score = document.getElementById('score');
    var actionArea = document.getElementById('actions');
    var rolldice = document.getElementById('rolldice');

    
   //sounds
    const dingSound = new Audio('media/ding.wav');
    const beepSound =new Audio('media/beep.wav');
    const winSound = new Audio('media/win.wav');
    const diceSound = new Audio('media/diceroll.m4a');


    var gameData = {
        dice: ['1die.jpg', '2die.jpg', '3die.jpg', '4die.jpg', '5die.jpg', '6die.jpg'],
        players: ['PLAYER 1', 'PLAYER 2'],
        score: [0,0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29
    };

    startGame.addEventListener("click", function (){
        //randomly set game index
        gameData.index = Math.round(Math.random());
        //gameControl.innerHTML = '<h2 id="gamestarted">GAME HAS STARTED</h2>';
        gameControl.innerHTML = '<button id="quit">QUIT</button>';

        //button to quit game and reload page
        document.getElementById("quit").addEventListener("click", function (){

            location.reload();

            
        });

        //sound plays
        dingSound.play();

        //console.log("set up the turn!");
        console.log(gameData.index);
        setUpTurn();


    });

    function setUpTurn(){
        game.innerHTML = `<p>Roll the dice for <span style="background-color:black; color:white">${gameData.players[gameData.index]}</span></p>`;
        actionArea.innerHTML = '';
        rolldice.innerHTML = '<div class="buttonroll"><button id="roll">ROLL THE DICE</button></div>';
        document.getElementById('roll').addEventListener('click', function(){
            //sound plays
            diceSound.play();

            throwDice();
        });
    };

    function throwDice(){
        rolldice.innerHTML = '';
        gameData.roll1 = Math.floor(Math.random()*6) + 1;
        gameData.roll2 = Math.floor(Math.random()*6) + 1;
        game.innerHTML = `<p>Roll the dice for <span style="background-color:black; color:white">${gameData.players[gameData.index]}</span></p>`;
        game.innerHTML += `<div id="dicearea"><img src ="images/${gameData.dice[gameData.roll1-1]}">
                        <img src = "images/${gameData.dice[gameData.roll2-1]}"></div>`;
        gameData.rollSum = gameData.roll1 + gameData.roll2;
        console.log(gameData);

        //if two 1's are rolled
        if(gameData.rollSum === 2) {   
            game.innerHTML += '<p>Oh snap! Snake eyes! </p>';
            //switch player
            gameData.score[gameData.index]=0;
            gameData.index ? (gameData.index = 0) : (gameData.index=1);

            showCurrentScore();

            //show current score
            setTimeout(setUpTurn, 2000);
        }

        // if either die is a 1
        else if (gameData.roll1 === 1 || gameData.roll2 === 1){
            //switch players
            gameData.index ? (gameData.index = 0) : (gameData.index=1);
            game.innerHTML += `<p><div id="sorry">Oops! One of your rolls was a 1, switching to ${gameData.players[gameData.index]}</p></div>`;

            setTimeout(setUpTurn, 4000);
        }


        // if neither die is a 1
        else {
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            actionArea.innerHTML = '<div class="bg"><div id="rollask">ROLL AGAIN?</div> <div id="actionbtn"> <div id="passbtn"><img class=greenarrow src="images/roll.png"><button id="pass">NO</button></div>  <div id="againbtn"><img class=greenarrow src="images/arrow.svg"><button id="rollagain">YES</button></div></div>';

            document.getElementById('rollagain').addEventListener('click', function(){
                //setUpTurn();
                throwDice();

                //sound plays
                dingSound.play();
            });

            document.getElementById('pass').addEventListener('click', function(){
                //switch players
                gameData.index ? (gameData.index = 0) : (gameData.index=1);
                setUpTurn();

                //sound plays
                beepSound.play();
        
            });

            //check if player won
           checkWinningCondition();
        }


    };

    function checkWinningCondition(){
        if (gameData.score[gameData.index] > gameData.gameEnd) {
            score.innerHTML = `<div id="win"><h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h2></div>`;

             //sound plays
             winSound.play();

            actionArea.innerHTML="";
            document.getElementById('quit').innerHTML = "NEW GAME";
            game.innerHTML = '<div id="gameover"><p>GAME OVER<p></div>';

        }

        else {
            showCurrentScore();

        };
    };

    function showCurrentScore(){
        //update score
        score.innerHTML = `<div id="scoreboard"><p><strong><div id="p1"><span style="color:#ff006e">${gameData.players[0]}</span>
      <div class="scorenum">${gameData.score[0]}</div></div></strong> <div id="p2"><strong><span style="color:#4361ee">${gameData.players[1]}</span> <div class="scorenum">${gameData.score[1]}</strong></p></div></div></div>`;

    };

   

   


}()); 