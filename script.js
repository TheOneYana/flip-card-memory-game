// array of objects with other side of cards
let backs = [
    {id: '',
name: 'program',
src: './img1.png'},
{id:'',
name: 'crest',
src: './crest.jpg' },
{id:'',
name:'yana',
src:'./yana.jpg'},
{id:'',
name: 'program',
src: './img1.png'},
{id:'',
name: 'crest',
src: './crest.jpg' },
{id:'',
name:'yana',
src:'./yana.jpg'},
{id:'',
name:'tea',
src:'./tea.jpg'},
{id:'',
name:'cat',
src:'./cat.jpg'},
{id:'',
name:'cat',
src:'./cat.jpg'},
{id:'',
name:'tea',
src:'./tea.jpg'},
{id:'',
name:'flower',
src:'./flower.jpg'},
{id:'',
name:'flower',
src:'./flower.jpg'},
{id:'',
name:'butter',
src:'./butter.jpg'},
{id:'',
name:'butter',
src:'./butter.jpg'},
{id:'',
name:'book',
src:'./book.jpg'},
{id:'',
name:'book',
src:'./book.jpg'},
]

// creating a set of unique nums to assign to id's inside 'backs' array
const nums = new Set();
while(nums.size !== backs.length){
    nums.add(Math.floor(Math.random() * backs.length)+1);
}
// iterating through the SET to assign random nums to id's inside 'backs' array
let iterator = [...nums];
iterator.forEach((randomNum, i)=> {
    backs[i].id = randomNum }
)
// selecting all img nodes
const imgs = document.querySelectorAll('img');

// creating an array of img nodes
let iterator2 = [...imgs];

let cardNumsArr = []; 
let cardsIdsArr =[];
let winner = document.getElementById('winner');
let playButton = document.querySelector('.rainbow');


playButton.addEventListener('click', function letsPlay(){
    for (let i = 0; i<iterator2.length; i++) {
        let b = backs.find(t => t.id == iterator2[i].className)
        iterator2[i].src = b.src;}
    setTimeout(() => {
    for (let i = 0; i<iterator2.length; i++) {
        iterator2[i].src = './cardSkin.jpg';
    }}, 2000)
    playButton.style.display = 'none';
    openTwoCards();
});

// MAIN FUNCTION
function openTwoCards() {

let click = 0;
window.addEventListener('click', function cardClick(event){
// reacts to click event only if clicked on imgs object
if(iterator2.includes(event.target)){
    click++;
    console.log(`click = ${click}`);
// assign class name of a clicked card to cardNum variable
let cardNum = (event.target.className);
// find an object with the same id as card's class
const back = backs.find(t => t.id == cardNum);
// replace card skin with an image from backs object
event.target.src = back.src;
// add image name to the following array
cardsIdsArr.push(back.src);
// find a card with matching class name
const cardClass = iterator2.find(a => a.className == cardNum);
// add the card to the following array
cardNumsArr.push(cardClass);

if(click % 2 == 0 && cardsIdsArr[click-2] !== cardsIdsArr[click-1]) {
    console.log(`turn over`);
    if(cardClass.className == cardNum){
    // if pictures don't match, they will be turned over after a second.
    this.setTimeout(() => {
        cardNumsArr[click-2].src = './cardSkin.jpg'
        cardNumsArr[click-1].src = './cardSkin.jpg'
    }
    ,"350");
    }
    // if a pair of two cards don not have matching pics, turn the cards over
    } else if (click % 2 == 0 && cardNumsArr[click-2] === cardNumsArr[click-1] && event.target.src !== './cardSkin.jpg'){
        event.target.src = './cardSkin.jpg'
    // if a pair of two cards have matching pics, keep showing them.    
    } else if (click % 2 == 0  && cardsIdsArr[click-2] == cardsIdsArr[click-1]){
        console.log(`you guessed right!`)
    } 
    let cardsLeft = iterator2.some(a => a.src === "http://127.0.0.1:5500/cardSkin.jpg");
    if(!cardsLeft){
    winner.innerText = `Congrats! You won! Number of attempts: ${click/2}`;
    window.removeEventListener('click', cardClick);
    console.log(`You won the game! Number of attempts: ${click/2}`)
    }
}})};



/* to do:
4. is it possible to create js module for backs array and import it to this file? It would make the code look more dry 

SOLVED:
1. add "Attempts" section where opening two cards would count as 1 attempt
3. add 'play' button that reveals all cards for 1 second
2.(added removeEventListener) add function that doesn't allow to interact with cards anymore after all cards are open
5.(added condition for reacting to click only if it's one of imgs objects): is it possible to add event listener to img nodes instead window object? It would reduce the number of bugs, since every time user accidentally clicks on background instead of img, there's an error and the number of clicks become odd */