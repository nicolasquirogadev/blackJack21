
var croupierSum = 0;
var playerSum = 0;

var croupierAceCount = 0;
var playerAceCount = 0;

var hidden;
let cardsDeck = []

var canHit = true; 
var roundWin;

const suits = ['D', 'H', 'S', 'C']

const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']


function createDeck() {
    for (let suit of suits){
        for (let rank of ranks) {
        cardsDeck.push(rank + "-" + suit);
        }
    }
};

function shuffleDeck(){
    for (let i = cardsDeck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() *i);
    [cardsDeck[i], cardsDeck[j]] = [cardsDeck[j], cardsDeck[i]]
    }
};

document.getElementById("startbutton").addEventListener("click", startGame);

function startGame() {
    createDeck();
    shuffleDeck();
    console.log(cardsDeck);
    
    canHit = true;

    getChips();
    document.getElementById("chips-counter").innerText = getChips();

    let hiddenImg = document.createElement("img");
    hiddenImg.src = "./cards/BACK.png";
    hiddenImg.id = "hidden"
    document.getElementById("croupier-cards").append(hiddenImg);

    hidden = cardsDeck.pop();
    croupierSum += getValue(hidden);
    croupierAceCount += checkAce(hidden);

    while (croupierSum < 17) {
        let cardImg = document.createElement("img");
        let card = cardsDeck.pop();
        cardImg.src = "./cards/" + card + ".png";
        croupierSum += getValue(card);
        croupierAceCount += checkAce(card);
        document.getElementById("croupier-cards").append(cardImg);
    }
    console.log(`Croupier has: ` + croupierSum);

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = cardsDeck.pop();
        cardImg.src = "./cards/" + card + ".png";
        playerSum += getValue(card);
        playerAceCount += checkAce(card);
        document.getElementById("player-cards").append(cardImg);
    }
    console.log(`You have: ` + playerSum);
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
        roundWin = false;
        Swal.fire({
            title: "You lose!",
            text: `You busted out with ${playerSum} !`,
            icon: "error"
          });
    }
    else if (croupierSum > 21){
        msg = "You Win!";
        roundWin = true;
        Swal.fire({
            title: "You win!",
            text: `The croupier busted out with ${croupierSum} !`,
            icon: "success"
          });
    }
    else if (playerSum == croupierSum){
        msg = "Tie!";
        roundWin = false;
    }
    else if (playerSum > croupierSum) {
        msg = "You Win!";
        roundWin = true;
        Swal.fire({
            title: "You win!",
            text: `You beat the croupier ${playerSum} to ${croupierSum} !`,
            icon: "success"
          });
    }
    else if (playerSum < croupierSum) {
        msg = "You Lose!";
        roundWin = false;
        Swal.fire({
            title: "You lose!",
            text: `Your ${playerSum} lose to the croupier's ${croupierSum} `,
            icon: "error"
          });
    }
    else if (playerSum == 21) {
        msg = "BLACKJACK! \n You Win!"
        roundWin = true;
        Swal.fire({
            title: "You win!",
            text: `You have ${playerSum}! That's a BLACKJACK! `,
            icon: "success"
          });
    }

   roundOutcome();

    cardsDeck = [];
    
    document.getElementById("chips-counter").innerText = getChips();
    document.getElementById("croupier-sum").innerText = croupierSum;
    document.getElementById("player-sum").innerText = playerSum;
    document.getElementById("results").innerText = msg;
    document.getElementById("startbutton").addEventListener("click", resetGame);
}

function resetGame() {
    
    const element1 = document.getElementById("player-cards");
    while (element1.firstChild) {
    element1.removeChild(element1.firstChild);
    }

    const element2 = document.getElementById("croupier-cards");
    while (element2.firstChild) {
    element2.removeChild(element2.firstChild);
    }

    const element3 = document.getElementById("results");
    while (element3.firstChild) {
        element3.removeChild(element3.firstChild);
        }

    croupierSum = 0;
    playerSum = 0;

    croupierAceCount = 0;
    playerAceCount = 0;

    document.getElementById("chips-counter").innerText = "";
    document.getElementById("croupier-sum").innerText = "";

    startGame();
}

function getValue(card) {
    let data = card.split("-");
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

// Verificamos que haya fichas guardadas en localStorage, de no haberlas, se inicializa el banco en 1000.
if (!localStorage.getItem('chips')) {
    localStorage.setItem('chips', 1000);
  }
  
  // Funcion para obtener el conteo actual de fichas.
  function getChips() {
    return parseInt(localStorage.getItem('chips'));
  }
  
  // Funcion para actualizar el valor del contador de fichas.
  function updateChips(amount) {
    let currentChips = getChips();
    currentChips += amount;
    localStorage.setItem('chips', currentChips);
    }

    //Funcion que marca la variacion en las fichas segun el resultado de la ronda. En cada mano se juega por 100 fichas.
    function roundOutcome() {
        //Si el jugador vence al croupier, recibe el doble de lo que aposto para jugar, es decir, 200 fichas.
        if(roundWin) {
            updateChips(200);
            console.log(`You have ` +getChips()+ ` chips left`);
            document.getElementById("chips-counter").innerText = getChips();
        }else {
            //Si el croupier vence al jugador, éste perderá las 100 fichas que apostó.
            updateChips(-100);
            console.log(`You have ` +getChips()+ ` chips left`);
            document.getElementById("chips-counter").innerText = getChips();
        }
    }