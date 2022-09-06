//create a module function named Gameboard. it should have an array of the gameboard's boxes. add methods that:
// takes input of the position the player has clicked to mark
// 1) fill up the array with the player's assigned markers
// 2) check if the array has markers such that a player has won
// 3) restart the whole object on play again

//a factory function to create a player
function CreateUserPlayer(name,marker) {

    return { name, marker };
}

