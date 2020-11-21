const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const resultHeading = document.getElementById('result-heading');
const mealContainer = document.getElementById('meals');
const selectedMeal = document.getElementById('selected-meal');

// step 3. create function for event listeners

function searchMeal(e){
    e.preventDefault() 

    // clear selected meal added after step 6
    selectedMeal.innerHTML = "";

    const term = search.value; // get the search term of user from input field
    // search if search term exist
    if(term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            resultHeading.innerHTML = `<h2>Serach result for ${term}:</h2>`
            if(data.meals === null){
                resultHeading.innerHTML = `<p>Meal search for ${term} is not found, please search another meal </p>`
            }else{
                mealContainer.innerHTML = data.meals.map( meal => `
                    <div class = "meal">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                        <div class="meal-info" data-mealID="${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>
                        </div> 
                    </div>
                `)
                .join('') // join used after map to convert array in string.
            }
        })
    }else{
        alert('Please enter valid search')
    }
    
    // clear search Term

    search.value = '';
}

// step 5: function getMealById to fetch meal data using meal id
function getMealById(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then( res => res.json())
        .then( data => {
            const meal = data.meals[0];
            addMealToDOM(meal);
        })
}

// step 6: function add meal to DOM

function addMealToDOM(meal) {
    const ingredients = [];

    for(let i = 1; i <= 20; i++) {
        if(meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            break;
        }
    };

    selectedMeal.innerHTML = `
        <div class="selected-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class="selected-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : '' }
                ${meal.strArea ? `<p>${meal.strArea}</p>` : '' }
            </div>
            <div class="main">
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                    ${ingredients.map( ingredient => `<li>${ingredient}</li>` ).join('')}
                </ul>
            </div>
        </div>
    `;
}

// step 8: function to get random meal upon clicking random button 

// 4. Function to get random meal
function randomMeal() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(res => res.json())
        .then(data => {
            // here the data is assign to meal and than call the addMealToDom() function
            // becouse every thing is already define so there is no need of another function.
            const meal = data.meals[0];
            console.log(meal);
            addMealToDOM(meal);
            
        })
}



//  Event listeners
// step 2. submit form
submit.addEventListener('submit', searchMeal)
//step 4. click on meal getting full info
mealContainer.addEventListener('click', e => {
    const mealInfo = e.path.find( item => {
        if(item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false
        }
    });

    if(mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealid');
        getMealById(mealID); // function getMealById
    }

}); 

// step 7: fetch the random btn on click

random.addEventListener('click', randomMeal);

