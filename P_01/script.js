const form = document.getElementById("form");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userPassword = document.getElementById("userPassword");
const confirmPassword= document.getElementById("confirmPassword");

// Functions 
// step 2: function for show error 

function showError(input, message){
    const formControl = input.parentElement;
    formControl.className ="form_control error";
    const small = formControl.querySelector("small");
    small.innerText = message
}

// step 3: function for showsuccess 

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

// step 1: 
// Event Listener 

form.addEventListener("submit", function(e){
    e.preventDefault();

    checkRequired([userName, userEmail, userPassword, confirmPassword]);
    checklength(userName, 3, 20);
    checklength(userPassword, 6, 20);
    checkEmail(userEmail);
    checkPasswordMatch(userPassword, confirmPassword);

})



// Event Listener 
// step 1: 

// form.addEventListener("submit", e=>{
//     e.preventDefault();
//     // user Name
//     if(userName.value === ''){
//         showError(userName, "User Name is required");
//     }else{
//         showSuccess(userName);
//     }

//     // Email 
//     if(userEmail.value === ''){
//         showError(userEmail, "User Email is required");
//     }else{
//         showSuccess(userEmail);
//     }

//     // password 

//     if(userPassword.value === ''){
//         showError(userPassword, "User Password is required");
//     }else{
//         showSuccess(userPassword);
//     }

//     // confirmPassword 

//     if(confirmPassword.value === ''){
//         showError(confirmPassword, "Confirm Your Password");
//     }else{
//         showSuccess(confirmPassword);
//     }
// });