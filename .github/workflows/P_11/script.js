const filter = document.getElementById('filter')
const postContainer = document.getElementById('post-container')
const loader = document.getElementById("loader")

// step 1: limit and page varible for the limitaion of api 
let limit = 5;
let page = 1;

// step 2:
// get post from the API with limit of 5 paragraph form page 1

async function getPosts() {
    const res = await fetch(`http://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = await res.json();

    return data;
}

// step 3 
// show post after fetched API posts
async function showPosts() {
    const posts = await getPosts();
    posts.forEach( post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
        `;
        postContainer.appendChild(postElement);
    })
}


// Display the initially fetched API posts
showPosts();

// step 5
// showLoader function to display the loader and fetch next post when reached the bottom of the page
function showLoader(){
    loader.classList.add('show');

    // to removie the loader after 1 second we will apply setTimeout 

    setTimeout( () => {
        loader.classList.remove('show')

            setTimeout(() => {
                page++;
                showPosts();
            },300)

    }, 1000)
}

// step 4 
// event handlar for page scrolling

window.addEventListener('scroll', () => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement
    if (scrollTop + clientHeight === scrollHeight) {
        // when we reached to the bottom of the page show loader
        showLoader()
    }
})

// step 7
// function for filter to display posts on filter

function filterPosts(e){
    // event to get the posts form input 
    const filterTerm = e.target.value.toUpperCase();
    // now here we have to get all posts which class is .post 
    const posts = document.querySelectorAll('.post');

    posts.forEach( post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if( title.indexOf(filterTerm) > -1 || body.indexOf(filterTerm) > -1 ) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    })
}

// step 6 
// Eventlistener for filter 
filter.addEventListener('input', filterPosts)