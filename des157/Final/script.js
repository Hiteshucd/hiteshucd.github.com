(function(){

            'use strict';
            console.log('reading js');
        
            // variables for all buttons / clickable elements
            var startGame = document.getElementById('startgame');
            var gameControl = document.getElementById('gamecontrol');
            var game = document.getElementById('game');
            var score = document.getElementById('score');
        
          
            var actionArea = document.getElementById('actions');
            const ResetGame = document.getElementById('quit');
           
            const scorePlayer1 = document.getElementById('scoreOne');
            const scorePlayer2 = document.getElementById('scoreTwo');
        
            //sounds added
        
            var rollEffect = new Audio('Media/mixkit-game-blood-pop-slide-2363.wav');
            const winSound = new Audio('Media/mixkit-game-bonus-reached-2065.wav');
        
            // variables for other game elements
        
            const playGameScreen = document.getElementById('playgame');
            var gameData = {
                dice: ['images/dice1.png', 'images/dice2.png', 'images/dice3.png', 'images/dice4.png', 'images/dice5.png', 'images/dice6.png'],
                players: ['PLAYER 1', 'PLAYER 2'],


            score: [0, 0],
            roll1: 0,
            roll2: 0,
            rollSum: 0,
            index: 0,
            gameEnd: 30,
        
               
        };
            
            // After clicking changing
            startGame.addEventListener("click", function(e){
                e.preventDefault();
                
                playGameScreen.style.opacity = 1;
                playGameScreen.className = '';
        
                setUpTurn();
                // Changes overlay from welcome to game page
                document.getElementById('intro').className = 'onboarding hidden';
                document.getElementById('screenOne').className = 'onboarding showing';
                
            });
           
        // Resetting back to beginning
            ResetGame.addEventListener('click', function(event){
                event.preventDefault();
                location.reload();
                document.getElementById('intro').className = 'onboarding showing';
                document.getElementById('screenOne').className = 'onboarding hidden';
        
            });
        
        // 
         
          function setUpTurn(){
           
                game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
                actionArea.innerHTML = '<button id = "roll"> Roll the Dice </button>';
               
                // assignift effect sounds sound
                document.getElementById('roll').addEventListener("click", function(){
                    throwDice();
                    rollEffect.play();
                    console.log("Roll the Dice ");
            });
        }
        
            function throwDice(){
                actionArea.innerHTML = '';
                gameData.roll1 = Math.floor(Math.random() * 6) + 1; //using ceil could result in a zero
                gameData.roll2 = Math.floor(Math.random() * 6) + 1;
                game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
                game.innerHTML += `<img src = "${gameData.dice[gameData.roll1-1]}">
                <img src = "${gameData.dice[gameData.roll2-1]}">`;
        
                gameData.rollSum = gameData.roll1 + gameData.roll2;
            
                // snakes eyes!
            if (gameData.rollSum === 2){
                game.innerHTML += `<p>Oh snap! Snake eyes! Switching to ${gameData.players[gameData.index]} <br> Switching..</p>`;
                
                gameData.score[gameData.index] = 0;
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
        
                showCurrentScore();
                setTimeout(setUpTurn, 3000);
                console.log("snake eyes were rolled");
            }
            // two 1s? a switching happends
            else if (gameData.roll1 === 1 || gameData.roll2 === 1){
             
                gameData.index ? (gameData.index = 0) :( gameData.index = 1);
                game.innerHTML += `<p>Sorry, one of your rolls was a one, switchin to ${gameData.players[gameData.index]} <br> Switching.. </p> `;
        
                showCurrentScore();
                setTimeout(setUpTurn, 3000);
                console.log("one of the two dice was a 1");
        
        
            }
            else {
        
                gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
                actionArea.innerHTML = '<button id="rollagain">Roll Again </button> or <button id= "pass" class="yellow" > Pass </button>';
        
                document.getElementById('rollagain').addEventListener("click", function(){
                   
                setUpTurn();
                });
                
        
                document.getElementById('pass').addEventListener("click", function(){
                    gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                    setUpTurn();
                });
               //winningcondition
            
                checkWinningCondition();
            }
                
            // funciton to check winning
            function checkWinningCondition (){
                if (gameData.score[gameData.index] > gameData.gameEnd){
                    
                    score.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h2>`;
                    //effect sound after the player wins
                    winSound.play();
                    actionArea.innerHTML = '';
                    document.getElementById('quit').innerHTML = "Start a new Game?";
                }
                else {
                   showCurrentScore();
                }
            }
            
            }
            function showCurrentScore(){
                // score.innerHTML  = `<p>The score is currenlty <strong>${gameData.players[0]} ${gameData.score[0]}</strong> and </strong> ${gameData.players[1]} ${gameData.score[1]}</strong>  </p>`;
                // console.log("the game proceeds");
        
                scorePlayer1.innerHTML = gameData.score[0];
                scorePlayer2.innerHTML = gameData.score[1];
            }
          
        
        
            
        
        })();