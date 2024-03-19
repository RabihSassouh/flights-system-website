const editBtn=document.getElementById('editBtn');
const bookingHistory=document.getElementById('bookingHistory');
const editForm=document.getElementById('editForm');
const requestCoinsBtn= document.getElementById('requestCoinsBtn');
const coinRequestForm=document.getElementById('coinRequestForm');
const saveEdit=document.getElementById('saveEdit');
const submitRequest=document.getElementById('submitRequest');

const editName = document.getElementById('editName');
const editEmail = document.getElementById('editEmail');
const editPassword = document.getElementById('editPassword');
const editPhone = document.getElementById('editPhone');
const editGender = document.getElementById('editGender');
const editDate = document.getElementById('editDate');

function displayEdit(){
    editBtn.addEventListener('click',()=>{
        bookingHistory.classList.add('hidden');
        editForm.classList.remove('hidden');
    })
}
function displayCoinRequest(){
    requestCoinsBtn.addEventListener('click',()=>{
        coinRequestForm.classList.remove('hidden');       
    })
}

function saveChanges(){

    saveEdit.addEventListener('click',(event)=>{
        event.preventDefault();
        let formdata= new FormData();
           formdata.append("name", "rab");
             formdata.append("email", "rab@gmail.com");
             formdata.append("password", "123456");
             formdata.append("phone_number", "12345"); 
             formdata.append("gender", "male");
             formdata.append("birth_date", "1919/12/12"); 
             formdata.append("userId", "1");

        
        fetch('http://localhost/flights-system-website/backend/savechanges.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formdata
        })
        .then(response => response.json())
        .then(data => {
            
            console.log(data);

            // Handle success or error messages here
        })
        .catch(error => {
            console.error('Error:', error);
        });
        

        editForm.classList.add('hidden');
        bookingHistory.classList.remove('hidden');
    })
}

function requestCoins(){

        submitRequest.addEventListener('click', (event) => {
            event.preventDefault();
            const coins = document.querySelector('.coin-request-ammount').value;
    
            fetch('http://localhost/flights-system-website/backend/usercoinsrequest.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    coins: coins
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status === 'success') {
                    console.log(data.message);
                } else {
                    console.log(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        coinRequestForm.classList.add('hidden');
    })
}

displayEdit();
displayCoinRequest();
// saveChanges();
// requestCoins();