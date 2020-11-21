const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// All function
// function to show error

function showError(input, message){

    const formControl = input.parentElement;
    formControl.className = "form_control error";
    const small = formControl.querySelector("small");
    small.innerText = message;


}

// function for success

function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = "form_control success"
}

// function for email validation JS email rgular expression coppied

function checkEmail(input){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())){
        showSuccess(input);
    } else {
        showError(input, `Please provid valid Email`)
    }
}

// function to check password match

function checkPasswordMatch(input1, input2){
    if (input1.value !== input2.value){
        showError(input2, "Password don't match")
    }
}
// function to check the required field

function checkRequired(inputArray) {
    inputArray.forEach(function(input){
        if (input.value === ""){
            showError(input, `${getfieldid(input)} is Required`);
        } else {
            showSuccess(input);
        }
    });
}

// Function to get id input feiled first letter in capital

function getfieldid(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// function to check input field length

function checklength(input, min, max){
    if (input.value.length < min) {
        showError(input, `${getfieldid(input)} need to be at least ${min} charactors`);
    } else if(input.value.length > max) {
        showError(input, `${getfieldid(input)} nead to be less than ${max} charactor`);
    } else {
        showSuccess(input);
    }
}

// event listener for the form on submit

form.addEventListener("submit", function(e){
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checklength(username, 3, 20);
    checklength(password, 6, 20);
    checkEmail(email);
    checkPasswordMatch(password, password2);

})