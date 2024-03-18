const loginContainer = document.getElementById("loginContainer");
const signupContainer = document.getElementById("signupContainer");
const signupToLogin=document.getElementById("signupToLogin");
const loginToSignup=document.getElementById("loginToSignup"); 

function toggleContainers(containerToShow) {

  if (containerToShow === "login") {
    loginContainer.classList.remove("hidden");
    signupContainer.classList.add("hidden");
  } else if (containerToShow === "signup") {
    loginContainer.classList.add("hidden");
    signupContainer.classList.remove("hidden");
  }
}
loginToSignup.addEventListener('click',()=>{
    toggleContainers(containerToShow);
})
signupToLogin.addEventListener('click',function(){
toggleContainers(containerToShow);
})