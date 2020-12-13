const list = document.getElementById('list');
const checkBtn = document.getElementById('btn');

// sortable box 
var dragBox = document.querySelector('.dragbox');
new Sortable(dragBox, {
    animation: 400
})

const largestCountries = [

    'Russia',
    'Canada',
    'United State',
    'China',
    'Brazil',
    'Australia',
    'India',
    'Argentina',
    'Kazakhistan',
    'Algeria'
]


let countryList = [];
for (var i = 0; i < largestCountries.length; i++) {
    countryList.push(largestCountries[i]);
}

var i = countryList.length, j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = countryList[j];
        countryList[j] = countryList[i];
        countryList[i] = temp;
    }

console.log(largestCountries);
console.log(countryList);

countryList.forEach(addToListTtem);


// functions 

function addToListTtem(country, index) {

    list.innerHTML += `
         <li draggable="True"> <span>${index + 1}</span> ${country} <br/> <i class="fas fa-grip-lines"></i></li>
         
  `;

}


// EventListener
checkBtn.addEventListener('click', ()=>{
    
})