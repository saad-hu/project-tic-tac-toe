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


    let markBox = (event, player) => {
        event.target.textContent = player.marker;
    }


    let startGame = (oponent1, oponent2) => {

        let currentPlayer = oponent1;
        let boxes = document.querySelectorAll('.gameboard-box');

        //adding eveny listener to each gameboard box
        boxes.forEach(box => {
            box.addEventListener('click', (e) => {
                markBox(e,currentPlayer);
                currentPlayer = currentPlayer===oponent1 ? oponent2 : oponent1;
            })
        })
    }

    return { createGbBoxes, startGame }
})();


//a factory function to create a player
function CreateUserPlayer(name,marker) {

    return { name, marker };
}

let player1 = CreateUserPlayer('Player 1','X');
let player2 = CreateUserPlayer('Player 2', 'O');


Gameboard.createGbBoxes();
Gameboard.startGame(player1, player2);







