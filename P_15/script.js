const form = document.getElementById('form');
const search = document.getElementById('search');
const results = document.getElementById('results');
const pagination = document.getElementById('pagination');

// step 1:
// Base URL for API fetch
const api = 'https://api.lyrics.ovh';

// Function 
// step 3: function to search song title and artist
async function searchSongs(term) {
    const res = await fetch(`${api}/suggest/${term}`);
    const data = await res.json();

    showData(data);
}

// step 4: 
function showData(data) {
    // Display the first set of songs in the DOM
    results.innerHTML = `
        <ul class="songs">
            ${data.data.map( 
                    song =>  `
                        <li>
                            <span>${song.artist.name} - ${song.title}</span>
                            <button class="btn" data-artist="${song.artist.name}" data-title="${song.title}">Get Lyrics</button>
                        </li>
                    `
                ).join('')
            }
        </ul>
    `;

    // step 5: Pagination if required
    if ( data.prev || data.next ) {
        pagination.innerHTML = `
            ${ data.prev ? `<button class="btn" onClick="getMoreSongs('${data.prev}')">Prev</button>` : '' }
            ${ data.next ? `<button class="btn" onClick="getMoreSongs('${data.next}')">Next</button>` : '' }
        `;
    } else {
        pagination.innerHTML = '';
    }
}

// step 6: 
// function getMoreSongs by prev or next btn from API

async function getMoreSongs(url) {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();

    showData(data);
}

// step 8:  function to gets the lyrics of song
async function getLyrics(artist, title){
    const res = await fetch(`${api}/v1/${artist}/ ${title}`);
    const data = await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '</br>');

    results.innerHTML = `
        <h2>${lyrics}- ${title}</h2>
        <p>${lyrics}</p>
    `;

    pagination.innerHTML = '';
}



// Event Listeners
// step 2:  event lestener for search form
form.addEventListener('submit', e => {
    // Prevent the reload of page on submit
    e.preventDefault();
    // Get the search term from the input field
    const searchTerm = search.value.trim();
    // Check if search term is valid
    if (searchTerm) {
        searchSongs(searchTerm);
    } else {
        alert('Please enter a valid search')
    }
})

// step 7: eventlistener to get lyric of songs by clicking on lyrics button
results.addEventListener('click', e =>{
    //  find out what was clicked
    const clickedElement = e.target;
    // verfiy if the click is on button
    if (clickedElement.tagName === 'BUTTON'){
        // get artist name and title for HTML5 custom properties on button
        const artist = clickedElement.getAttribute('data-artist');
        const title = clickedElement.getAttribute('data-title');
        // Now fetch the lyrics 
        getLyrics(artist, title);
    }
    
})