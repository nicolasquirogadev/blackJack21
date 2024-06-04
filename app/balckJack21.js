var croupierSum = 0;
var playerSum = 0;

var croupierAceCount = 0;
var playerAceCount = 0;

var hidden;
cardsDeck = []

var canHit = true; 


const suits = ['D', 'H', 'S', 'C']

const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

function createDeck() {
    for (let suit of suits){
        for (let rank of ranks) {
        cardsDeck.push(rank + `-` + suit);
        }
    }
}

function shuffleDeck(){
    for (let i = cardsDeck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() *i);
    [cardsDeck[i], cardsDeck[j]] = [cardsDeck[j], cardsDeck[i]]
    }
}

 window.onload = function(){
    createDeck();
    shuffleDeck();
}
console.log(cardsDeck)

let numPlayers = 2

document.getElementById("startbutton").addEventListener("click", startGame);

function startGame() {
    hidden = cardsDeck.pop();
    croupierSum += getValue(hidden);
    croupierAceCount += checkAce(hidden);
    //console.log(hidden);
    //console.log(croupierSum)

    while (croupierSum < 17) {
        let cardImg = document.createElement("img");
        let card = cardsDeck.pop();
        cardImg.src = "./cards/" + card + ".png";
        croupierSum += getValue(card);
        croupierAceCount += checkAce(card);
        document.getElementById("croupier-cards").append(cardImg);
    }
    console.log(croupierSum);

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = cardsDeck.pop();
        cardImg.src = "./cards/" + card + ".png";
        playerSum += getValue(card);
        playerAceCount += checkAce(card);
        document.getElementById("player-cards").append(cardImg);
    }
    console.log(playerSum);
    document.getElementById("ask-for-card").addEventListener("click", askForCard); 
    document.getElementById("stay").addEventListener("click", stay);
    document.getElementById("player-sum").innerText = playerSum;

}




function askForCard() {
    if (!canHit) {
        return;
    }

        let cardImg = document.createElement("img");
        let card = cardsDeck.pop();
        cardImg.src = "./cards/" + card + ".png";
        playerSum += getValue(card);
        playerAceCount += checkAce(card);
        document.getElementById("player-cards").append(cardImg);

    if (reduceAce(playerSum, playerAceCount) > 21) {
        canHit = false;
    }
    document.getElementById("player-sum").innerText = playerSum;
}
    
    

function stay() {
    

    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";

    croupierSum = reduceAce(croupierSum, croupierAceCount);
    playerSum = reduceAce(playerSum, playerAceCount);

    let msg = "";
    if (playerSum > 21) {
        msg = "You Lose!";
    }
    else if (croupierSum > 21){
        msg = "You Win!";
    }
    else if (playerSum == croupierSum){
        msg = "Tie!";
    }
    else if (playerSum > croupierSum) {
        msg = "You Win!";
    }
    else if (playerSum < croupierSum) {
        msg = "You Lose!";
    }
    else if (playerSum == 21) {
        msg = "BLACKJACK! \n You Win!"
    }
    
    document.getElementById("croupier-sum").innerText = croupierSum;
    document.getElementById("player-sum").innerText = playerSum;
    document.getElementById("results").innerText = msg;
}


function getValue(card) {
    let data = card.split(`-`);
    let value = data[0];

    if (isNaN(value)) {
        if (value == "A"){
            return 11;
        }
        return 10;
    }

    return parseInt(value);
} 

function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce (playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}

