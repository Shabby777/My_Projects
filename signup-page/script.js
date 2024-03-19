// const emailInput = document.getElementById('email');
// const passwordInput = document.getElementById('password');
// const confirmPasswordInput = document.getElementById('confirm-password');
// const signupForm = document.getElementById('signup-form');
// const errorMessageSpans = document.querySelectorAll('.error-message');
// const passwordStrengthEl = document.querySelector('.password-strength');

// function showErrorMessage(input, message) {
//   const errorMessageSpan = input.nextElementSibling;
//   errorMessageSpan.textContent = message;
//   errorMessageSpan.style.display = 'block';
// }

// function hideErrorMessage(input) {
//   const errorMessageSpan = input.nextElementSibling;
//   errorMessageSpan.textContent = '';
//   errorMessageSpan.style.display = 'none';
// }

// function validateEmail(email) {
//   const re = /^([a-zA-Z0-9_\-\.]+@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)*)$/;
//   return re.test(email);
// }

// function checkPasswordMatch() {
//   if (passwordInput.value !== confirmPasswordInput.value) {
//     showErrorMessage(confirmPasswordInput, 'Passwords do not match!');
//     return false;
//   }
//   return true;
// }

// signupForm.addEventListener('submit', function(event) {
//   event.preventDefault(); // Prevent default form submission

//   let hasError = false;

//   // Email validation
//   if (!validateEmail(emailInput.value)) {
//     showErrorMessage(emailInput, 'Invalid email format!');
//     hasError = true;
//   } else {
//     hideErrorMessage(emailInput);
//   }

//   // Password match validation
//   if (!checkPasswordMatch()) {
//     hasError = true;
//   }

//   if (!hasError) {
//     // Simulate successful signup (replace with actual backend interaction)
//     alert('Sign Up Successful!');
//     // Clear form fields (optional)
//     signupForm.reset();
//   }
// });


const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const signupForm = document.getElementById('signup-form');
const errorMessageSpans = document.querySelectorAll('.error-message');
const passwordStrengthEl = document.querySelector('.password-strength');

function showErrorMessage(input, message) {
  const errorMessageSpan = input.nextElementSibling;
  errorMessageSpan.textContent = message;
  errorMessageSpan.style.display = 'block';
}

function hideErrorMessage(input) {
  const errorMessageSpan = input.nextElementSibling;
  errorMessageSpan.textContent = '';
  errorMessageSpan.style.display = 'none';
}

function validateEmail(email) {
  const re = /^([a-zA-Z0-9_\-\.]+@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)*)$/;
  return re.test(email);
}

function checkPasswordMatch() {
  if (passwordInput.value !== confirmPasswordInput.value) {
    showErrorMessage(confirmPasswordInput, 'Passwords do not match!');
    return false;
  }
  return true;
}

signupForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  let hasError = false;

  // Email validation
  if (!validateEmail(emailInput.value)) {
    showErrorMessage(emailInput, 'Invalid email format!');
    hasError = true;
  } else {
    hideErrorMessage(emailInput);
  }

  // Password match validation
  if (!checkPasswordMatch()) {
    hasError = true;
  }

  if (!hasError) {
    // Simulate successful signup (replace with actual backend interaction)
    const userData = {
      email: emailInput.value,
      password: passwordInput.value, // **Note:** Don't store plain text passwords!
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    alert('Sign Up Successful!');
    // Clear form fields (optional)
    signupForm.reset();
  }
});
