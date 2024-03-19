const editBtn=document.getElementById('editBtn');
const bookingHistory=document.getElementById('bookingHistory');
const editForm=document.getElementById('editForm');
const requestCoinsBtn= document.getElementById('requestCoinsBtn');
const coinRequestForm=document.getElementById('coinRequestForm');

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
displayEdit();
displayCoinRequest();