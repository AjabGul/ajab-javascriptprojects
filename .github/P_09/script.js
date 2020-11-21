const balance = document.getElementById('balance');
const money_plus =  document.getElementById('money-plus');
const money_minus =  document.getElementById('money-minus');
const list =  document.getElementById('list');
const form =  document.getElementById('form');
const description =  document.getElementById('description');
const amount =  document.getElementById('amount');

// step 1
// For Dummy Transaction create array cantains objects:

const dummyTransactions = [

    { id: 1, description: "salary", amount: 60000},
    { id: 4, description: "part Time Job Profit", amount: 10000},
    { id: 2, description: "Electric Bill", amount: -10000},
    { id: 3, description: "internet Bill", amount: -3000},
    { id: 4, description: "meals and bike fuel", amount: -30000}
    
]

let transactions = dummyTransactions;

// step 7
// function to generate ID

function generateID(){
    
    return Math.floor(Math.random()* 100000000);

};

// step 6
// add function for event listener for the form submition

function addTransaction(e){
    e.preventDefault();

    if (description.value.trim() === '' || amount.value.trim() === '') {
        alert('Please enter a valid description and transaction amount.')
    }else{
        const transaction = {
            id: generateID(),
            description: description.value,
            amount: +amount.value
            };
            
        transactions.push(transaction);   
        
        addTransactionUI(transaction)
        updateSums();

        description.value = '';
        amount.value = '';
    }  

};

// step 8
// function to remove transaction

function deleteTransaction(id) {
    transactions = transactions.filter( transaction => transaction.id != id );
    init();
}



// step 2

// function to display transactions in transaction History
function addTransactionUI(transaction){
    // classify if income '+' or expense '-'
    const type = transaction.amount > 0 ? '+' : '-';

    //create DOM elelment for list items.
    const item = document.createElement('li');

    //add class for list item based on + and - type
    item.classList.add(transaction.amount > 0 ? 'plus' : 'minus');
    item.innerHTML =`
        ${transaction.description}
        <span>${type} ${Math.abs(transaction.amount)}</span>
        <button class"delelte-btn" onclick="deleteTransaction(${transaction.id})">X</button>
    `;

    list.appendChild(item);

};

// step 4
// function to uppdate the balance, income and expense summaries
function updateSums(){

    // created array of tasaction amounts from transaction array
    const amounts = transactions.map( transaction => transaction.amount)

    // calculate total amount/value for balance
    const total = amounts
                    .reduce( (acc, amount) => (acc += amount), 0)
                    .toFixed(2);

    // calculate total income
    const income = amounts
                    .filter( amount => amount > 0 )
                    .reduce( (acc, amount) => (acc += amount), 0)
                    .toFixed(2)

    // calculate total expense
    const expense = amounts
                    .filter( amount => amount < 0 )
                    .reduce( (acc, amount) => (acc += amount), 0)
                    .toFixed(2)

    // Update Balance in DOM
    balance.innerHTML = `${total} PKR`

    // Update Income in DOM
    money_plus.innerHTML = `${income} PKR`

    // Update expense in DOM
    money_minus.innerHTML = `${expense}`
    
   }


// step 3
// function to initialize the app and call the function to display Transaction History
function init(){
    list.innerHTML = "";

    transactions.forEach(addTransactionUI);
    updateSums();
}

// event listeners
// Step 5
// 1. event listener for form submission

form.addEventListener('submit', addTransaction);

init();