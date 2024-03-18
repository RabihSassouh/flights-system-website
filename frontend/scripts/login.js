const loginContainer = document.getElementById("loginContainer");
const signupContainer = document.getElementById("signupContainer");
const signupToLogin = document.getElementById("signupToLogin");
const loginToSignup = document.getElementById("loginToSignup");

const signupBtn=document.getElementById('signupBtn');
const formName = document.getElementById('formName');
const formEmail = document.getElementById('formEmail');
const formPassword = document.getElementById('formPassword');
const formDate = document.getElementById('formDate');
const formGender = document.getElementById('formGender');
const formPhone = document.getElementById('formPhone');
const unfilled=document.getElementById('unfilled');

const loginBtn=document.getElementById('loginBtn');

function toggleContainers() {
  loginToSignup.addEventListener("click", () => {
    loginContainer.classList.add("hidden");
    signupContainer.classList.remove("hidden");
  });
  signupToLogin.addEventListener("click", function () {
      loginContainer.classList.remove("hidden");
      signupContainer.classList.add("hidden");
      unfilled.classList.add("hidden");
    
  });
}
toggleContainers();

function signup(){
    
    signupBtn.addEventListener('click',(event)=>{
        event.preventDefault();
        if (formName.value && formEmail.value && formPassword.value && formDate.value && formGender.value
             && formPhone.value) {
            window.location.href = '../index.html';
        } else {
            unfilled.classList.remove("hidden");
        }
    })
    
}
signup();

function login(){
    loginBtn.addEventListener('click',()=>{
        window.location.href='../index.html'
    })
}
login();

