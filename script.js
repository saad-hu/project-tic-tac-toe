//create a module pattern named Gameboard. it should have an array of the gameboard's boxes. add methods that:
// takes input of the position the player has clicked to mark
// 1) fill up the array with the player's assigned markers
// 2) check if the array has markers such that a player has won
// 3) restart the whole object on play again


//refernce to the gameboard container
let gbHTML = document.querySelector('.gameboard');


//module pattern function. Gameboard is an object created via module pattern function. check return statement at end to see which properties and methods Gameboard object has access to
let Gameboard = ( function() {
    let gbMarkerArray = []; //private property;
    let winningCombinations = ['012','345','678','036','147','258','048','246'];

    //this function creates gameboard boxes, appends it to the dom inside gbHTML, and fills up the gbMarkerArray with null
    let createGbBoxes = () => {
        for(let i=0; i<9; i++) {
            let box = document.createElement('div');
            box.classList.add('gameboard-box');
            box.id = i;


            gbHTML.appendChild(box);
            gbMarkerArray.push(null);
        }
    }


    let markBoxandArray = (event, player) => {
        //boxNode is the box that user clicked
        let boxNode = event.target;

        boxNode.textContent = player.marker;
        gbMarkerArray[boxNode.id] = player.marker;


    }

    
    //returns true if player has one, else returns false
    let hasPlayerWon = (player) => {
        //looping through each combination in the winning array
        for(let combination of winningCombinations) {
            let matchCount = 0;
            //looping through each combination's character
            for(let i=0; i<combination.length; i++) {
                // if the player marked index matches a combination character, count is incremented
               if ( player.markedIndices.search(combination[i]) != -1) matchCount++;
            }

            // if matchCount is equals to three, this means that player has a winning combination, hence they have one the game
            if(matchCount === 3) {
                return true;
                break;
            }
        }
        //player has not won
        return false;
    }


    let startGame = (oponent1, oponent2) => {

        let currentPlayer = oponent1;
        let boxes = document.querySelectorAll('.gameboard-box');

        //adding eveny listener to each gameboard box
        boxes.forEach(box => {
            box.addEventListener('click', (e) => {

                //furthur steps are only taken if box is not aleady filled. this is checked if the array index assigned to that particular box is already filled or not. if it is filled nothing happens
                if(gbMarkerArray[e.target.id] === null) {
                    currentPlayer.markedIndices = currentPlayer.markedIndices.concat(e.target.id);

                    markBoxandArray(e,currentPlayer);
                    if(hasPlayerWon(currentPlayer)) console.log(`${currentPlayer.name} has won`);
                    currentPlayer = currentPlayer===oponent1 ? oponent2 : oponent1;
                }
            })
        })



    }

    return { createGbBoxes, startGame }
})();


//a factory function to create a player
function CreateUserPlayer(name,marker) {
    markedIndices = '';
    return { name, marker, markedIndices };
}

let player1 = CreateUserPlayer('Player 1','X');
let player2 = CreateUserPlayer('Player 2', 'O');


Gameboard.createGbBoxes();
Gameboard.startGame(player1, player2);







