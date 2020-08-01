const form = document.getElementById("form")
const username = document.getElementById("username")
const email = document.getElementById("email")
const password = document.getElementById("password")
const passwordAgain = document.getElementById("passwordAgain")

//show input error message
function showError(input, message) {
    const formControl = input.parentElement
    formControl.className = 'form-control error'
    const small = formControl.querySelector('small')
    small.innerText = message
}

//show success outline
function showSuccess(input) {
    const formControl = input.parentElement
    formControl.className = 'form-control success'
}

//check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    }else {
        showError(input, 'Email is not valid')
    }
}

//check required fields
function checkRequired(inputArr) {
    let isRequired = false;
    inputArr.forEach(input => {
        if (input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is required`)
            isRequired = true
        }else{
            showSuccess(input)
        }
    });

    return isRequired;
}

//check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} is too short`)
    }else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} is too long`)
    }else {
        showSuccess(input)
    }
}

//check password match
function checkPassword(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'passwordAgain not match')
    }else {
        showSuccess(input2)
    }
}

//get field name
function getFieldName(input) {
    const x = input.id.charAt(0).toUpperCase() + input.id.slice(1)
    console.log(x)
    return x;
}

//event listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!checkRequired([username, email, password, passwordAgain])) {
        checkLength(username, 3, 15)
        checkLength(password, 6, 25)
        checkEmail(email)
        checkPassword(password, passwordAgain)
    }
}) 