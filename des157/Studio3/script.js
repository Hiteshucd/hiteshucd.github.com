console.log("reading js");

(function () {
    'use strict';
    console.log("reading js from IIFE");

    var startGame = document.getElementById('startgame');
    var gameControl = document.getElementById('gamecontrol');
    var game = document.getElementById('game');
    var score = document.getElementById('score');
    var actionArea = document.getElementById('actions');
    var rolldice = document.getElementById('rolldice');




    var gameData = {
        dice: ['1die.jpg', '2die.jpg', '3die.jpg', '4die.jpg', '5die.jpg', '6die.jpg'],
        players: ['PLAYER 1', 'PLAYER 2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29
    };

    startGame.addEventListener("click", function () {
        //randomly set game index
        gameData.index = Math.round(Math.random());
        //gameControl.innerHTML = '<h2 id="gamestarted">GAME HAS STARTED</h2>';
        gameControl.innerHTML = '<button id="quit">QUIT</button>';

        //button to quit game and reload page
        document.getElementById("quit").addEventListener("click", function () {

            location.reload();


        });

        //sound plays
        const fluteSound = new Audio('Media/mixkit-flute-alert-2307');
        fluteSound.play();


        //console.log("set up the turn!");
        console.log(gameData.index);
        setUpTurn();


    });

    function setUpTurn() {
        game.innerHTML = `<p>Roll the dice for <span style="background-color:black; color:white">${gameData.players[gameData.index]}</span></p>`;
        actionArea.innerHTML = '';
        rolldice.innerHTML = '<div class="buttonroll"><button id="roll">ROLL THE DICE</button></div>';
        document.getElementById('roll').addEventListener('click', function () {
            //sound plays
            const smallSound = new Audio('Media/mixkit-small-hit-in-a-game-2072');
            smallSound.play();


            throwDice();
        });
    };

    function throwDice() {
        actionArea.innerHTML = '';
        gameData.roll1 = Math.floor(Math.random() * 6) + 1; //using ceil would result in a zero, random() is inclusive of 0 but not 1.
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        game.innerHTML = `<p>Roll the dice for ${gameData.players[gameData.index]}</p>`;
        game.innerHTML += `<img src="${gameData.dice[gameData.roll1 - 1]}">
                            <img src="${gameData.dice[gameData.roll2 - 1]}">`;
        gameData.rollSum = gameData.roll1 + gameData.roll2;
        //if two 1's are rolled
        if (gameData.rollSum === 2) {
            game.innerHTML += '<p>Oh snap! Snake eyes!</p>';
            gameData.score[gameData.index] = 0;
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            //if true (1)                if false (0)
            //show current score
            setTimeout(setUpTurn, 2000);
        } //if either die is a 1 
        else if (gameData.roll1 === 1 || gameData.roll2 === 1) {
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            game.innerHTML += `<p>Sorry, one of your rolls was a one, switching to ${gameData.players[gameData.index]}</p>`;
            setTimeout(setUpTurn, 2000);
        } //if neither die is a 1
        else {
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            actionArea.innerHTML = '<button id="rollagain">Roll again</button> or <button id="pass">Pass</button>';

            document.getElementById('rollagain').addEventListener('click', function () {
                //sound plays
                const smallSound = new Audio('Media/mixkit-small-hit-in-a-game-2072');
                smallSound.play();

                throwDice();
            });
            document.getElementById('pass').addEventListener('click', function () {
                //sound plays
                const smallSound = new Audio('Media/mixkit-small-hit-in-a-game-2072');
                smallSound.play();

                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                throwDice();
            });
            checkWinningCondition();
        }
    }
    function checkWinningCondition() {
        if (gameData.score[gameData.index] > gameData.gameEnd) {
            score.innerHTML = `<div id="win"><h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h2></div>`;

            //sound plays
            const smallSound = new Audio('Media/mixkit-small-hit-in-a-game-2072');
            smallSound.play();



            actionArea.innerHTML = "";
            document.getElementById('quit').innerHTML = "NEW GAME";
            game.innerHTML = '<div id="gameover"><p>GAME OVER<p></div>';

        }

        else {
            showCurrentScore();

        };
    };

    function showCurrentScore() {
        //update score
        score.innerHTML = `<div id="scoreboard"><p><strong><div id="p1"><span style="color:#ff006e">${gameData.players[0]}</span>
      <div class="scorenum">${gameData.score[0]}</div></div></strong> <div id="p2"><strong><span style="color:#4361ee">${gameData.players[1]}</span> <div class="scorenum">${gameData.score[1]}</strong></p></div></div></div>`;

    };


}()); 