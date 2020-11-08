// Step 1
const hangmanParts = document.querySelectorAll('.hangman-part'); 
const word = document.getElementById('word');
const wrongLetters = document.getElementById('wrong-letters');
const popup = document.getElementById('popup-container');
const message = document.getElementById('win-lose');
const restartButton = document.getElementById('restart');
const notification = document.getElementById('slider-container');


// step 2: generate array for word to select the words from the array:

// An array of words to select from
const wordPool = ['javascript','microsopt', 'python', 'datascience', 'hangman','facebook','youtube'];

// Selecting a word at random from the pool
let selectedWord = wordPool[Math.floor(Math.random() * wordPool.length)];

// step 3: array to classify the correct and incorrect input of the user
const correctLetters = [];
const incorrectLetters = [];

// step 4: function to display the words on screen
function displaySelectedWord() {
    word.innerHTML = `
        ${selectedWord
            .split('')
            .map(
                letter => `
                    <span class="letter">
                        ${correctLetters.includes(letter) ? letter : '' }
                    </span>
                `
            )
            .join('')
        }
    `;

    const wordText = word.innerText.replace(/\n/g, '');

    if( wordText === selectedWord ) {
        message.innerText = 'You won!';
        popup.style.display = 'flex';
    }

};

// step 6: function to show notification = slider-container
function showNotification() {
    notification.classList.add('show');

    setTimeout( () => {notification.classList.remove('show');}, 3000);
}

// step 7: function to update the display for wrong /incorrect letter
function updateWrongLetters() {
    // Update the Display for Wrong Letters
    wrongLetters.innerHTML = `
    ${incorrectLetters.length > 0 ? `<p>Wrong</p>` : '' }
    ${incorrectLetters.map( letter => `<span>${letter}</span>`)}
    `;

    // Display Hangman Parts on Incorrect Letter Input
    hangmanParts.forEach( (part, index) => {
        const errors = incorrectLetters.length;

        if ( index < errors ) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    // Show Popup if lost
    if(incorrectLetters.length === hangmanParts.length) {
        message.innerText = 'You lost!';
        popup.style.display = 'flex';
    }
}

// event handlers
// step 5: event handler for keyboard to write the letter
window.addEventListener('keydown', e => {
    if( e.keyCode >= 65 && e.keyCode <= 90 ) {
        const letter = e.key;
        
        if( selectedWord.includes(letter) ) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displaySelectedWord();
            } else {
                showNotification();
            }
        } else {
            if(!incorrectLetters.includes(letter)) {
                incorrectLetters.push(letter);
                updateWrongLetters();
            } else {
                showNotification();
            }
        }

    }
})
// step 7:
// 2. Event Listener for Restart Button
restartButton.addEventListener('click', () => {
    // Empty Arrays
    correctLetters.splice(0);
    incorrectLetters.splice(0);

    // Get a new selected word from the pool
    selectedWord = wordPool[Math.floor(Math.random() * wordPool.length)];

    displaySelectedWord();

    // Clear the Wrong Letters Div
    updateWrongLetters();

    // Hide the popup
    popup.style.display = 'none';

})

displaySelectedWord();
