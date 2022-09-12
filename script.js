//refernce to the gameboard container
let gbHTML = document.querySelector('.gameboard');

//modal for displaying winning player
let winningModal = document.querySelector('.game-winner-modal');
let winnerName = document.querySelector('.winner-name');


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

    
    let deleteGbBoxesAndArray = (oponent1, oponent2) => {
        let boxes = document.querySelectorAll('.gameboard-box');
        //deleting boxes
        while(gbHTML.lastChild) gbHTML.removeChild(gbHTML.lastChild);
        //retarting array
        gbMarkerArray = [];

        //deleting the marked indices of each player from the previous game
        oponent1.markedIndices = '';
        oponent2.markedIndices = '';
    }

    let restartGame = (oponent1,oponent2) => {
        deleteGbBoxesAndArray(oponent1,oponent2);
        startGame(oponent1,oponent2);
        restartHighlightPlayer()
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

    let displayWinner = (winner) => {
        //winnerName and winningModal are refernce to html modal elements created at the start of the script
        winnerName.textContent = winner.name;
        winningModal.style['display'] = 'flex';
    }

    let closeWinningModalAndRestart = (oponent1,oponent2) => {

        winningModal.addEventListener('click', () => {
            winningModal.style['display'] = 'none';
            restartGame(oponent1,oponent2);
        });

    }


    let startGame = (oponent1, oponent2) => {

        createGbBoxes();

        let currentPlayer = oponent1;
        let boxes = document.querySelectorAll('.gameboard-box');

        //adding eveny listener to each gameboard box
        boxes.forEach(box => {
            box.addEventListener('click', (e) => {

                //furthur steps are only taken if box is not aleady filled. this is checked if the array index assigned to that particular box is already filled or not. if it is filled nothing happens
                if(gbMarkerArray[e.target.id] === null) {
                    currentPlayer.markedIndices = currentPlayer.markedIndices.concat(e.target.id);

                    markBoxandArray(e,currentPlayer);
                    if(hasPlayerWon(currentPlayer)) {
                        displayWinner(currentPlayer);
                        closeWinningModalAndRestart(oponent1,oponent2);
                        return;
                    } 
                    currentPlayer = currentPlayer===oponent1 ? oponent2 : oponent1;
                    toggleHighlightPlayer();
                }
            });
        });
    }

    return { startGame, restartGame }
})();


//a factory function to create a player
function CreateUserPlayer(name,marker) {
    markedIndices = '';
    return { name, marker, markedIndices };
}


//creating empty player variables because these need to be global
let player1;
let player2;



//player info form portion

let playerInfoModal = document.querySelector('.player-info-modal');


//adding submit event listener to form. after submit two player objects will be created
let playerInfoForm = document.querySelector('.player-info-form');

playerInfoForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // refernce to all form inputs
    let player1Name = document.querySelector('#player1-name');
    let player1Marker = document.querySelector('input[name="player1-marker"]:checked');

    let player2Name = document.querySelector('#player2-name');
    let player2Marker = document.querySelector('input[name="player2-marker"]:checked');

    player1 = CreateUserPlayer(player1Name.value, player1Marker.value);

    player2 = CreateUserPlayer(player2Name.value, player2Marker.value);


    playerInfoModal.style['display'] = 'none';
    displayNamesAndMarkers();

    Gameboard.startGame(player1, player2);
});



//refernce to restart button
let restartButton = document.querySelector('.restart-button');
//adding event listener to restart the game
restartButton.addEventListener('click', () => {
    Gameboard.restartGame(player1,player2);
});




// for player info display while playing
// let playersInfoDisplay = document.querySelector('.player-info-display');

let player1DisplayName = document.querySelector('.player1-display-name');
let player2DisplayName = document.querySelector('.player2-display-name');

let player1DisplayMarker = document.querySelector('.player1-display-marker');
let player2DisplayMarker = document.querySelector('.player2-display-marker');


function displayNamesAndMarkers() {
    player1DisplayName.textContent = player1.name;
    player1DisplayMarker.textContent = player1.marker;

    player2DisplayName.textContent = player2.name;
    player2DisplayMarker.textContent = player2.marker;
}

//reference to each player's diplay container
let individualPlayerDisplay = document.querySelectorAll('.player');

//this function highlights the current player and removes highlight from previous player. this is done via toggling the active class, on which the highlight css is applied. This function is called in the startGame method in the GameBoard module pattern.  
function toggleHighlightPlayer() {

    individualPlayerDisplay.forEach(playerDisplayNode => {
        playerDisplayNode.classList.toggle('active');
    })
};

function restartHighlightPlayer() {
    document.querySelector('.player-info-display > .player1').classList.add('active');
    document.querySelector('.player-info-display > .player2').classList.remove('active');
}