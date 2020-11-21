  
// Getting Elements from DOM
const currOnePicker = document.getElementById('currencyOne');
const currTwoPicker = document.getElementById('currencyTwo');
const currOneAmount = document.getElementById('amountOne');
const currTwoAmount = document.getElementById('amountTwo');
const flipButton = document.getElementById('flip');
const rate = document.getElementById('rate');

// Fetch exchange rate from 3rd Party API and update DOM
// www.exchangerate-api.com
function calculate() {
    const currencyOneCode = currOnePicker.value;
    const currencyTwoCode = currTwoPicker.value;
    
    fetch(`https://v6.exchangerate-api.com/v6/a43d02c063c1303f1c06c071/latest/${currencyOneCode}`)
        .then( res => res.json() )
        .then( data => {
            
            // getting exchange rate from API data
           const exchangeRate = data.conversion_rates[currencyTwoCode];
           console.log(exchangeRate);
           
           //currency exchange rate
           rate.innerText = ` 1 ${currencyOneCode} = ${exchangeRate} ${currencyTwoCode}`


           // currency two ammount update
           currTwoAmount.value = (currOneAmount.value * exchangeRate).toFixed(2);



        });
}

// function for fliping or reverse the currency by flip button
function flip() {
    const temp = currOnePicker.value;
    currOnePicker.value = currTwoPicker.value;
    currTwoPicker.value = temp;
    calculate();
};

// Event Listeners
currOnePicker.addEventListener('change', calculate);
currTwoPicker.addEventListener('change', calculate);
currOneAmount.addEventListener('input', calculate);
currTwoAmount.addEventListener('input', calculate);
flipButton.addEventListener('click', flip);

calculate();
    

