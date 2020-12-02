const main = document.getElementById('main');
const voiceSelect = document.getElementById('voices');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');
const customText = document.getElementById('text');
const readBtn = document.getElementById('read');
const customTextDiv = document.getElementById('custom-text')


// Step 1: Array for holding all images and text to be read
const data = [
    {
        image: './img/angry.jpg',
        text: "I'm Angry"
    },
    {
        image: './img/drink.jpg',
        text: "I'm Thirsty"
    },
    
    {
        image: './img/happy.jpg',
        text: "I'm Happy"
    },

    {
        image: './img/surprise.jpg',
        text: "I'm surprise"
    },

    {
        image: './img/hurt.jpg',
        text: "I'm Hurt"
    },

    {
        image: './img/sad.jpg',
        text: "I'm Sad"
    },

    {
        image: './img/going-home.png',
        text: "I'm going to home"
    },

    {
        image: './img/coding.jpg',
        text: "I love coding using python"
    },

    {
        image: './img/boring.jpg',
        text: "Sometimes class is boring"
    },

    {
        image: './img/gym.jpg',
        text: "It's time for gym"
    },

    {
        image: './img/punching.jpg',
        text: "I'm punching the bag"
    },

    {
        image: './img/swimming.jpg',
        text: "I love swimming"
    }

]

// step 14.1 Array for all Web Speech API Voices
let voicesBackup = [];

// step 2: creat a box for each object in data array

data.forEach(createBox);




// Functions

// step 3: 
// function 1: to create box 

function createBox(imageobj){
    console.log(imageobj);
    // create a empty div for box 
    const box = document.createElement('div');
    // add css class to the new div 
    box.classList.add('box')
    // getting image url and text for data array 
    const { image, text} = imageobj;
    //  add the image and text to the box
    box.innerHTML = `
        <img src="${image}" alt="${text}">
        <p class="imageInfo">${text}</p>
    `;
    // add the box div to the main element 
    main.appendChild(box)

    // step 10: eventListener to speak the text
    box.addEventListener('click', ()=> {
        setMessage(text);
        speakText();
    }) 
}

// step 9: initialize speech synthesis
const message = new SpeechSynthesisUtterance();


// step 6: 
// Function 2:  to get voices from web speech API and put it in select box 
function populateVoiceList() {
    if(typeof speechSynthesis === 'undefined') {
      return;
    }
  
    let voices = speechSynthesis.getVoices();
    voicesBackup = voices;
  
    for(var i = 0; i < voices.length; i++) {
      var option = document.createElement('option');
      option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
      
      if(voices[i].default) {
        option.textContent += ' -- DEFAULT';
      }
  
      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      voiceSelect.appendChild(option);
    }
}

// step 7: Execute populateVoiceList function
populateVoiceList();
if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
speechSynthesis.onvoiceschanged = populateVoiceList;
}

// step 11:
// function 3: Set the text for speech synthesis
function setMessage(text) {
    message.text = text;
}

// step 12: 
// function 4. To speak the text
function speakText() {
    speechSynthesis.speak(message);
}

// step 14:
// 5. Function for event listener on voiceSelect to set the new voice
function setVoice(e) {
    console.log(e.target.value);
    message.voice = voicesBackup.find(voice => voice.name === e.target.value);
}


// addEventListener 
// step 4: 
// 1. event listener for toggle button

toggleBtn.addEventListener('click', () =>{
    customTextDiv.classList.add('show');
})

// step 5:
// 2. eventlistener for close buton of custom text element
closeBtn.addEventListener('click', ()=>{
    customTextDiv.classList.remove('show');
})

// step 8:
// 3. event listener for changing voices
speechSynthesis.addEventListener('voiceschanged', populateVoiceList);

// step 13:
// 4. event listener for voiceSelect
voiceSelect.addEventListener('change', setVoice);

// step 15: 
// 5. Event Listener for custom text reader
readBtn.addEventListener('click', () => {
    setMessage(customText.value);
    speakText();
})

