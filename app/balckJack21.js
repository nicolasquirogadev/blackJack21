let cardsDeck = []

const suits = ['diamonds', 'hearts', 'spades', 'cloves']

let playerHand = []

const ranks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13']

function createDeck() {
    for (let suit of suits){
        for (let rank of ranks) {
        cardsDeck.push({ rank: rank, suit: suit});
        }
    }
}

function shuffleDeck(){
    for (let i = cardsDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() *i +1);
    [cardsDeck[i], cardsDeck[j]] = [cardsDeck[j], cardsDeck[i]]
    }
}

function dealCards(numPlayers) {
    for (let i = 0; i < numPlayers; i++){
        const hand = []
        for (let j = 0; j < 2; j++){
            hand.push(cardsDeck.pop())
        }
        playerHand.push(hand)
    }
}

createDeck()
shuffleDeck()

let numPlayers = 1 + parseInt(prompt("Bienvenido/s a BlackJack21! \nCuantos jugadores enfrentaran al croupier?"))

dealCards(numPlayers)
console.log("Croupier's Hand: ", playerHand[0])
console.log("Player 1's Hand:", playerHand[1])

let msg = "";
for (let i=0; i<1; i++) {
    msg += `Croupier's hand: \n` ;
    for (let card of playerHand[0]) {
        msg += `[ ${card.rank} of ${card.suit} ] `
    msg = msg.slice(0, -2);
    msg += `\n` };
for (let i = 1; i < numPlayers; i++) {
    msg += `Player ${i}'s hand: \n` ;
    for (let card of playerHand[i]) {
        msg += `[ ${card.rank} of ${card.suit} ] `
    msg = msg.slice(0, -2);
    msg += `\n`
}
}
}

alert(msg)