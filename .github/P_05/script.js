const main = document.getElementById('main');
const addUserButton = document.getElementById('add_user');
const doubleMoneyButton = document.getElementById('double');
const showMillionairesButton = document.getElementById('showMillionaires');
const sortButton = document.getElementById('sort');
const totalButton = document.getElementById('calculate_total');

// step 1: 
// Data Array initialization
let data = [];

// step 3: calling function 3 times bcoz we need 3 user and its name and worth
generateRandomUser();
generateRandomUser();
generateRandomUser();
generateRandomUser();
generateRandomUser();

// step 2: 
// function to fetch random data from Api (https://randomuser.me/api)

// two ways to get random data from api
// 1. Using then method
// function generateRandomUser(){
//     fetch('https://randomuser.me/api')
//         .then(res => res.json())
//         .then( data => { })
// }

// 2. using async and await method

async function generateRandomUser(){
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    // geting data results and its 0 index (we need name, available in 0 index) 
    const user = data.results[0];

    // we need objects for name and worth 
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        worth: Math.round(Math.random() * 10000000)
    }

    addData(newUser); // calling function 
   

}

// step 3: function for adding new generated data to data initial array

function addData(newUser){
    data.push(newUser) // Push method used to push data in array
    updateDom()
}

// step 4. function to update UI with DOM

function updateDom(inputData = data){
    main.innerHTML = `<h2><strong>Name</strong> Net Worth</h2>`
    // here we override the main div inner HTML

    inputData.forEach(item => {
        const element = document.createElement('div');
        // creat element method is used to creat/update HTML, Css Via JS
        element.classList.add('name')
        // name was created in css
        element.innerHTML = `<strong>${item.name}</strong> PKR  ${currencyFormate(item.worth)}`;
        main.appendChild(element); // appendchil method to append in main div
    })
}

// step 5. function to convert net worth into currency

function currencyFormate(num){
    return (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// 6. function for eventlisterner: map method, Sort method, filter method,

function doubleWorth(){
    data = data.map( item => {
        return { ...item, worth: item.worth * 2}
    });

    updateDom()
}

function sortRichest (){
    data.sort((a,b) => b.worth - a.worth);

    updateDom()
}

function Millionaires(){
    data = data.filter( item =>
        item.worth > 1000000
    );

    updateDom()
}

function totalwealth(){
    const totalWarth = data.reduce(
        (acc, item)=> (acc += item.worth), 0 
    );

    const netWorthElement = document.createElement('div');
    netWorthElement.innerHTML = `<h3>Total Net Worth: <strong> PKR ${currencyFormate(totalWarth)}</strong></h3>`
    main.appendChild(netWorthElement);

}


// step 6: event listeners:

addUserButton.addEventListener('click', generateRandomUser);
doubleMoneyButton.addEventListener('click', doubleWorth);
sortButton.addEventListener('click', sortRichest);
showMillionairesButton.addEventListener('click', Millionaires);
totalButton.addEventListener('click', totalwealth)


