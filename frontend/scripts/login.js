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
const loginEmail=document.getElementById('loginEmail');
const loginPassword=document.getElementById('loginPassword');


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
        const userData={
            name:formName.value,
            email:formEmail.value,
            password:formPassword.value,
            phone_number:formPhone.value,
            gender:formGender.value,
            birth_date:formDate.value,
        };
        axios.post('http://localhost/flights-system-website/backend/signup.php',userData)
            
            
            
        .then(response=>{
            console.log(response.data);
            if(response.data.status==='success'){
                window.location.href = '../index.html';    
            } else{
                unfilled.classList.remove("hidden");    
            }
        })
        .catch(error=>{
            console.error('Error',error);
        });
        // if (formName.value && formEmail.value && formPassword.value && formDate.value && formGender.value
        //      && formPhone.value) {
        //     window.location.href = '../index.html';
        // } else {
        //     unfilled.classList.remove("hidden");
        // }
    });
    
}
// signup();

function login(){
    loginBtn.addEventListener('click',async (event)=>{
        event.preventDefault();

        const email=loginEmail.value;
        const password= loginPassword.value;
        try{
        const response=await axios.post('http://localhost/flights-system-website/backend/login.php',{email,password})
        // .then(response=>{
            console.log(response.data);
            if (response.data.status==='logged in'){
                    window.location.href='../index.html';
                }else{
                    console.log(response.data.status);
                }
            // })
            }catch(error){
                console.error('Error',error);
            };
    });
}
login();

