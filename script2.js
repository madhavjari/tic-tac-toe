function inputPlayer(){
    const player1 = document.getElementById('player1');
    const player2 = document.getElementById('player2');
    form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formElement = event.target;
        const player1Name = player1.value;
        const player2Name = player2.value;
        console.log(player1Name);
        gameController(player1Name,player2Name);
        formElement.reset();
    })
}

//creating container for game
const body = document.querySelector('body');
const container = document.createElement('div');
container.classList.add('container');
body.appendChild(container);

function createPlayer(name,marker){
    array = [];
    return{name,marker,array};
}

function gameBoard(){
    const startGame = () =>{
        let board = [];
        for(let i = 0; i < 9; i++){
            board[i] = document.createElement('button');
            board[i].textContent = '';
            board[i].setAttribute('data-column',i+1);
            container.appendChild(board[i]);
        }
    }
    const winningCombination = [[1,4,7],[1,5,9],[1,2,3],[2,5,8],[3,6,9],[4,5,6],[7,8,9],[3,5,7]]
    const getBoard = () => board;
    const resetBoard = () => {
        container.innerHTML = '';
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
    const players = [createPlayer(player1Name,'O'),createPlayer(player2Name,'X')];
    console.log(players);
    let activePlayer = players[0];
    console.log(activePlayer);
    const switchPlayerTurn = () => activePlayer = activePlayer === players[0] ? players[1] : players[0];
    const board = gameBoard();
    board.startGame();
    function attachListeners(){
        const clickedButton = document.querySelectorAll('button');
        clickedButton.forEach(button => {
            button.addEventListener('click',(event) =>{ 
                console.log(activePlayer);
                const clickedElement = event.target;
                clickedElement.textContent = activePlayer.marker;
                clickedElement.disabled = true;
                activePlayer.array.push(parseInt(clickedElement.dataset.column));  
                const result = resultCheck(board.winningCombination,activePlayer.array);
                if(result){
                    alert(`${activePlayer.name} has won`);
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
    attachListeners();
}

const game = inputPlayer();