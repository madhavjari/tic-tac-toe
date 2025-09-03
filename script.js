const player1 = {name:'Madhav', marker: 'O'};
const player2 = {name: 'Shreya', marker: 'X'};
let player1_pos;
let player2_pos;
let count = 0;
let array = ['1','2','3','4','5','6','7','8','9'];
let player1Array = [];
let player2Array = [];

while (true){
    if(count%2 ===0){
        player1_pos = prompt('Player 1');
        if (array.includes(player1_pos)){
            let index = array.indexOf(player1_pos);
            if(index!== -1) array.splice(index,1);
            player1Array.push(player1_pos);
            if(player1Array.includes('1') && player1Array.includes('2') && player1Array.includes('3')){
                alert('player1 wins');
                break;
            }
            if(player1Array.includes('1') && player1Array.includes('4') && player1Array.includes('7')){
                alert('player1 wins');
                break;
            }
            if(player1Array.includes('1') && player1Array.includes('5') && player1Array.includes('9')){
                alert('player1 wins');
                break;
            }
            if(player1Array.includes('2') && player1Array.includes('5') && player1Array.includes('8')){
                alert('player1 wins');
                break;
            }
            if(player1Array.includes('4') && player1Array.includes('5') && player1Array.includes('6')){
                alert('player1 wins');
                break;
            }
            if(player1Array.includes('7') && player1Array.includes('8') && player1Array.includes('9')){
                alert('player1 wins');
                break;
            }
            if(player1Array.includes('3') && player1Array.includes('6') && player1Array.includes('9')){
                alert('player1 wins');
                break;
            }
            if(player1Array.includes('3') && player1Array.includes('5') && player1Array.includes('7')){
                alert('player1 wins');
                break;
            }
        }
        else{
            alert('Wrong choice, try again');
            continue;
        }

    }
    else{
        player2_pos = prompt('Player 2');
        if(array.includes(player2_pos)){
            let index = array.indexOf(player2_pos);
            if(index!== -1) array.splice(index,1);
            player2Array.push(player2_pos);
            if(player2Array.includes('1') && player2Array.includes('2') && player2Array.includes('3')){
                alert('player2 wins');
                break;
            }
            if(player2Array.includes('1') && player2Array.includes('4') && player2Array.includes('7')){
                alert('player2 wins');
                break;
            }
            if(player2Array.includes('1') && player2Array.includes('5') && player2Array.includes('9')){
                alert('player2 wins');
                break;
            }
            if(player2Array.includes('2') && player2Array.includes('5') && player2Array.includes('8')){
                alert('player2 wins');
                break;
            }
            if(player2Array.includes('4') && player2Array.includes('5') && player2Array.includes('6')){
                alert('player2 wins');
                break;
            }
            if(player2Array.includes('7') && player2Array.includes('8') && player2Array.includes('9')){
                alert('player2 wins');
                break;
            }
            if(player2Array.includes('3') && player2Array.includes('6') && player2Array.includes('9')){
                alert('player2 wins');
                break;
            }
            if(player2Array.includes('3') && player2Array.includes('5') && player2Array.includes('7')){
                alert('player2 wins');
                break;
            }
        }
        else{
            alert('Wrong choice, try again');
            continue;
        }   
    }
    count++;
    if(array.length === 0){
        alert("Its a tie");
        break;
    }
}