// DOM elements
// Cards Container
const cardContainer = document.getElementById('card-container');
// Navigation
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const currentCard = document.getElementById('current-card');
// Add Card Container
const addCardContainer = document.getElementById('add-card-container');
const addCardBtn = document.getElementById('add-card');
const closeCardBtn = document.getElementById('close-card');
const question = document.getElementById('question');
const answer = document.getElementById('answer');
const addNewCardBtn = document.getElementById('add-card-btn');
// Clear Cards
const clearBtn = document.getElementById('clear-btn');


// step 1: 
// track current card
let currentActiveCard = 0;

// array for collection of cards to store
const cardElements = [];

// array caontains objects for collection of cards question and Answer data
// step 9: function to get cards data 
const cardsData = getCardsData();

//  functions 
// step 2: function to create all cards
function createCards(){
    cardsData.forEach((data, index)=> createCard(data, index))
}

// step 3: function to createCard
function createCard(data, index){
    // 3.1 create div for class
    const card = document.createElement('div');
    // check for first card and assign active class
    card.classList.add('card'); 
    // 3.2 check for first card and assign active class
    if (index === 0){
        card.classList.add('active')
    }
    // 3.3 create the innerHTML for a card
    card.innerHTML = `
    <div class="inner-card">
        <div class="card-front">
            <p>${data.question}</p>
        </div>
        <div class="card-back">
            <p>${data.answer}</p>
        </div>
    </div>
    `;
    // step 4: Event listener on card to flip the card on click
    card.addEventListener('click', () => card.classList.toggle('show-answer'));
    // 3.4 add the newly created cards to cardElements array for collection of cards to store
    cardElements.push(card);
    // 3.5 add the card to the DOM by appending card to cardContainer
    cardContainer.appendChild(card);

    // step 5: display the current <- card / total-> card value
    updatecurrentCardText();
}

createCards();

// step 6: function to show the current <- card / total-> in navigation

function updatecurrentCardText(){
    currentCard.innerHTML = ` <p>${currentActiveCard +1}/ ${cardElements.length} </p>`;
}

// 9.1: get cards data from local storage 

function getCardsData(){
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}



// EventListener
// step 7:  eventlistener for next button
nextBtn.addEventListener('click', ()=> {
    //  hide the current card and move to left
    cardElements[currentActiveCard].className = 'card-left';
    // increament the the current active card tracker to next
    currentActiveCard++;
    // check if last card
    if(currentActiveCard > cardElements.length -1){
        currentActiveCard = cardElements.length -1;
    }
    // Display the new card
    cardElements[currentActiveCard].className = 'card active'
    // update the current card number
    updatecurrentCardText();
} )


// step 8:  eventlistener for prev button
prevBtn.addEventListener('click', ()=> {
    //  hide the current card and move to right
    cardElements[currentActiveCard].className = 'card right';
    // decreament the current active card tracker to prev
    currentActiveCard--;
    // check if last card
    if(currentActiveCard < 0){
        currentActiveCard = 0;
    }
    // Display the new card
    cardElements[currentActiveCard].className = 'card active'
    // update the current card number
    updatecurrentCardText();
} )

// step 9.2 event listener for the add new card button

addCardBtn.addEventListener('click', )