const dragbox = document.getElementById('sortlist');
const checkBtn = document.getElementById('btn');
const listIndex = document.getElementById('listLi');


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

// Fishier algorithum

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

// console.log(largestCountries);
// console.log(countryList);

countryList.forEach(addToListTtem);


// Functions 

function addToListTtem(country, index) {

    dragbox.innerHTML += `
    <li draggable="true" id="listLi"> <span>${index + 1}</span> ${country} <br/> <i class="fas fa-grip-lines"></i></li>
  `;

}


// drag and drop starts here


// wait for window to fully loaded
window.addEventListener('load', function(){
    // get all the item 
    var items = document.querySelectorAll('#sortlist li'),
        // create a empty varible to hold dragg element
        dragged = null;
    // now create 7 draggable events to drage the list
    for(let i of items){
        // event 1 the list not dragged add hint color = yellow
        i.addEventListener("dragstart", function(){
            dragged = this;
            for(let it of items){
                if(it != dragged){ it.classList.add("hint");}
            }
            
        });

        // event 2 when draged give different highlight color
        i.addEventListener("dragenter", function(){
            if (this != dragged){ this.classList.add("active");}
        });


        // event 3 when draged leave removie active color(pink)
        i.addEventListener("dragleave", function(){
            this.classList.remove("active");
        });


        // event 4 when the draged end give remove all color for all list
        i.addEventListener("dragend", function(){
            for(let it of items){
                it.classList.remove("hint");  
                it.classList.remove("active");
            }
        });

        // NOT IN USE


        // event 5:
        i.addEventListener("dragover", function(evt){
           evt.preventDefault();
        });


        // event 6:
        i.addEventListener("drop", function(evt){
            evt.preventDefault();
            if(this !=dragged){
                let all = document.querySelectorAll(".sortlist li"),
                    draggedpos = 0, droppedpos = 0;
                for(let it=0; it<all.length; it++){
                    if (dragged == all[it]){draggedpos = it;}
                    if (this == all[it]){droppedpos = it;}
                }
                if(draggedpos < droppedpos){
                    this.parentNode.insertBefore(dragged, this.nextSibling);
                }else{
                    this.parentNode.insertBefore(dragged, this);
                }
                
            }
         });

    }
});

// drag and drop ends here
    


// EventListener
checkBtn.addEventListener('click', ()=>{
    var displaytext = console.log(sortedCountryList);
    console.log(displaytext);
});