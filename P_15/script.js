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

    // step 5: pagination if required 
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