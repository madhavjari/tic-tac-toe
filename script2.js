//creating container for game
const body = document.querySelector('body');
const gameContainer = document.createElement('div');
gameContainer.classList.add('game-container');
body.appendChild(gameContainer);

//creating container for scoring
const scoreContainer = document.createElement('div');
scoreContainer.classList.add('score-container');

//creating container for board
const boardContainer = document.createElement('div');
boardContainer.classList.add('board-container');

//creating container for reset
const resetContainer = document.createElement('div');
resetContainer.classList.add('reset-container');

const dialog = document.getElementById('game-result');
const playerWin = document.createElement('h3');
dialog.appendChild(playerWin);

const startButton = document.getElementById('start-game');

function appendContainers(){
    gameContainer.append(scoreContainer,boardContainer,resetContainer);
}

function appendScoreElements(){
    const scoreTitle = document.createElement('h1');
    const player1 = document.createElement('div');
    const player2 = document.createElement('div');
    const player1Name = document.createElement('div');
    const player1Score = document.createElement('div');
    const player2Name = document.createElement('div');
    const player2Score = document.createElement('div');

    scoreContainer.append(scoreTitle,player1, player2);
    player1.append(player1Name,player1Score);
    player2.append(player2Name,player2Score);
    return{scoreTitle,player1Name,player2Name,player1Score,player2Score};
}

function createPlayer(name,marker,score=0){
    return{name,marker,score,array:[]};
}

function gameBoard(players){
    let board = [];
    const startGame = () =>{
        board = [];
        scoreContainer.innerHTML = '';
        boardContainer.innerHTML = '';
        const scoreElems = appendScoreElements();
        gameScore(players,scoreElems);
        for(let i = 0; i < 9; i++){
            const cell = document.createElement('button');
            cell.setAttribute('data-column',i+1);
            boardContainer.appendChild(cell);
            board.push(cell);
        }
    }
    const winningCombination = [[1,4,7],[1,5,9],[1,2,3],
                                [2,5,8],[3,6,9],[4,5,6],
                                [7,8,9],[3,5,7]];
    const getBoard = () => board;
    const resetBoard = () => {
        players.forEach(player => player.array=[]);
        startGame();
    }
    return{getBoard, winningCombination,resetBoard, startGame};
}

function gameScore(players,elements){
    elements.scoreTitle.textContent = 'Score';
    elements.player1Name.textContent = players[0].name + ' ' + players[0].marker + ':';
    elements.player2Name.textContent = players[1].name+ ' ' + players[1].marker + ':';
    elements.player1Score.textContent = players[0].score;
    elements.player2Score.textContent = players[1].score;
}

function resultCheck(winningCombination,array){
    return winningCombination.some(combination => {
        return combination.every(element => array.includes(element));
  });
}

function inputPlayer(){
    const player1 = document.getElementById('player1');
    const player2 = document.getElementById('player2');
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        startButton.disabled = true;
        const player1Name = player1.value;
        const player2Name = player2.value;
        gameController(player1Name,player2Name);
        form.reset();
    })
}

function gameController(player1Name,player2Name){
    const players = [createPlayer(player1Name,'O'),createPlayer(player2Name,'X')];
    activePlayer = players[0];
    appendContainers();
    const switchPlayerTurn = () => activePlayer = activePlayer === players[0] ? players[1] : players[0];

    const board = gameBoard(players);
    board.startGame();

    function resetGameButtons(){
        resetContainer.innerHTML = '';

        const reset = document.createElement('button');
        reset.textContent = 'Reset Game';

        const resetPlayer = document.createElement('button');
        resetPlayer.textContent = 'New Players';

        resetContainer.append(reset,resetPlayer);
        reset.addEventListener('click', () => {
            players[0].score = 0;
            players[1].score = 0;
            console.log(players);
            resetGame();
        })
        resetPlayer.addEventListener('click',() => {
            resetPlayers();
        })
}

    function attachListeners(){
        const cells = board.getBoard();
        cells.forEach(cell => {
            cell.addEventListener('click',() =>{ 
                cell.textContent = activePlayer.marker;
                cell.disabled = true;
                activePlayer.array.push(parseInt(cell.dataset.column)); 

                if(resultCheck(board.winningCombination,activePlayer.array)){
                    activePlayer.score++;
                    gameResult(`${activePlayer.name} wins!`);
                    return;
                }

                if(activePlayer.array.length === 5){
                    gameResult("It's a tie!"); 
                    return;
                }

                switchPlayerTurn();
            });
        });
    };

    function gameResult(message){
        playerWin.textContent = message;
        dialog.showModal(); 
        document.getElementById('close-button').onclick = () =>{
            dialog.close();
            playerWin.textContent = '';
            resetGame();
        };
    }

    function resetGame(){
        board.resetBoard();
        attachListeners();
    }
    
    function resetPlayers(){
        startButton.disabled = false;
        gameContainer.innerHTML = '';
    }
    resetGameButtons();
    attachListeners();
}

const game = inputPlayer();