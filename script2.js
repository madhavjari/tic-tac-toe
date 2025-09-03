function createPlayer(name,marker){
    return{name,marker};
}

function gameController(){
    player1 = 'Madhav';
    player2 = 'Shreya';
    const players = [createPlayer(player1,'X'),createPlayer(player2,'O')];
    let activePlayer = players[0];
    const switchPlayerTurn = () => activePlayer = activePlayer === players[0] ? players[1] : players[0];
    let array = ['1','2','3','4','5','6','7','8','9'];
    const clickedButton = document.querySelector('.container');
    let position;
    clickedButton.addEventListener('click',(event) =>{ 
        const clickedElement = event.target;
        position = clickedElement.textContent;
        if(array.includes(position)){
            const index = array.indexOf(position);
            if(index!== -1) array.splice(index,1);
            clickedElement.textContent = activePlayer.marker;
            switchPlayerTurn();
        };
    });
    return{position,activePlayer};
}

const clickedButton = document.querySelector('.container');

const game = gameController();