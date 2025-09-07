//creating container for game
const body = document.querySelector('body');
const gameContainer = document.createElement('div');
gameContainer.classList.add('game-container');
body.appendChild(gameContainer);

//creating container for scoring
const scoreContainer = document.createElement('div');
scoreContainer.classList.add('score-container');
const scoreTitle = document.createElement('h1');
const player1 = document.createElement('div');
const player2 = document.createElement('div');
const player1Name = document.createElement('div');
const player1Score = document.createElement('div');
const player2Name = document.createElement('div');
const player2Score = document.createElement('div');


//creating container for board
const boardContainer = document.createElement('div');
boardContainer.classList.add('board-container');


//creating container for reset
const resetContainer = document.createElement('div');
resetContainer.classList.add('reset-container');


function appendEverything(){
    gameContainer.appendChild(scoreContainer);
    gameContainer.appendChild(boardContainer);
    gameContainer.appendChild(resetContainer);
    scoreContainer.appendChild(scoreTitle);
    scoreContainer.appendChild(player1);
    scoreContainer.appendChild(player2);
    player1.appendChild(player1Name);
    player1.appendChild(player1Score);
    player2.appendChild(player2Name);
    player2.appendChild(player2Score);
}

const startButton = document.getElementById('start-game');
function inputPlayer(){
    const player1 = document.getElementById('player1');
    const player2 = document.getElementById('player2');
    form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        startButton.disabled = true;
        const formElement = event.target;
        const player1Name = player1.value;
        const player2Name = player2.value;
        gameController(player1Name,player2Name);
        formElement.reset();
    })
}

function gameScore(players){
    scoreTitle.textContent = 'Score';
    player1Name.textContent = players[0].name + ' ' + players[0].marker + ':';
    player2Name.textContent = players[1].name+ ' ' + players[1].marker + ':';
    player1Score.textContent = players[0].score;
    player2Score.textContent = players[1].score;
}

function createPlayer(name,marker,score){
    array = [];
    return{name,marker,array,score};
}

function gameBoard(players){
    const startGame = () =>{
        appendEverything();
        gameScore(players);
        let board = [];
        for(let i = 0; i < 9; i++){
            board[i] = document.createElement('button');
            board[i].textContent = '';
            board[i].setAttribute('data-column',i+1);
            boardContainer.appendChild(board[i]);
        }
    }
    const winningCombination = [[1,4,7],[1,5,9],[1,2,3],[2,5,8],[3,6,9],[4,5,6],[7,8,9],[3,5,7]]
    const getBoard = () => board;
    const resetBoard = () => {
        boardContainer.innerHTML = '';
        startGame();
    }
    return{getBoard, winningCombination,resetBoard, startGame};
}

function resultCheck(winningCombination,array){
    return winningCombination.some(combination => {
        return combination.every(element => array.includes(element));
  });
}

function gameController(player1Name,player2Name){
    const players = [createPlayer(player1Name,'O',0),createPlayer(player2Name,'X',0)];
    activePlayer = players[0];
    const switchPlayerTurn = () => activePlayer = activePlayer === players[0] ? players[1] : players[0];
    const board = gameBoard(players);
    board.startGame();
    function resetGameButtons(){
        const reset = document.createElement('button');
        reset.textContent = 'Reset Game';
        const resetPlayer = document.createElement('button');
        resetPlayer.textContent = 'Reset Players';
        resetContainer.appendChild(reset);
        resetContainer.appendChild(resetPlayer);
        reset.addEventListener('click', () => {
            resetGame();
            return;   
    })
        resetPlayer.addEventListener('click',() => {
            resetPlayers();
            return;
        })
}

    function attachListeners(){
        const clickedButton = document.querySelectorAll('.board-container>button');
        clickedButton.forEach(button => {
            button.addEventListener('click',(event) =>{ 
                const clickedElement = event.target;
                clickedElement.textContent = activePlayer.marker;
                clickedElement.disabled = true;
                activePlayer.array.push(parseInt(clickedElement.dataset.column));  
                const result = resultCheck(board.winningCombination,activePlayer.array);
                if(result){
                    activePlayer.score++;
                    resetGame();
                    return;
                }
                else if(activePlayer.array.length === 5){
                    alert('Game tied');
                    resetGame();
                    return;
                }
                switchPlayerTurn();
            });
        });
    }
    function resetGame(){
        players.forEach(player => player.array=[]);
        board.resetBoard();
        attachListeners();
    }
    
    function resetPlayers(){
        players.forEach(player => {
            player.array=[];
            player.name='';
            player.marker='';
            player.score=0;
        })
        startButton.disabled = false;
        gameContainer.innerHTML = '';
        boardContainer.innerHTML = '';
        scoreContainer.innerHTML = '';
        resetContainer.innerHTML = '';
    }
    resetGameButtons();
    attachListeners();
}

const game = inputPlayer();