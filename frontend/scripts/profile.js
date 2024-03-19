const editBtn=document.getElementById('editBtn');
const bookingHistory=document.getElementById('bookingHistory');
const editForm=document.getElementById('editForm');
const requestCoinsBtn= document.getElementById('requestCoinsBtn');
const coinRequestForm=document.getElementById('coinRequestForm');
const saveEdit=document.getElementById('saveEdit');
const submitRequest=document.getElementById('submitRequest');

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
    saveEdit.addEventListener('click',()=>{
        editForm.classList.add('hidden');
        bookingHistory.classList.remove('hidden');
    })
}

function requestCoins(){
    submitRequest.addEventListener('click',()=>{
        coinRequestForm.classList.add('hidden');
    })
}

displayEdit();
displayCoinRequest();