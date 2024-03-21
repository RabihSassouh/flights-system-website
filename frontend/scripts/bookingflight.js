const accountBalance=document.getElementById("accountBalance");

async function fetchUserInfo() {
    try {
        const userId = localStorage.getItem('loggedUser');
        const response = await axios.get(`http://localhost/flights-system-website/backend/userInfo.php?userId=${userId}`);
        const data = response.data;
        
        // name_info.textContent = data.name;
        // email_info.textContent = data.email;
        // phonenumber_info.textContent = data.phone_number;
        // gender_info.textContent = data.gender;
        // birthdate_info.textContent = data.birth_date;
        accountBalance.textContent = data.balance;
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchUserInfo();


document.addEventListener('DOMContentLoaded', ()=> {
    const seats = document.querySelectorAll('.seat.available');

    seats.forEach(seat => {
        seat.addEventListener('click', function () {
            seat.classList.remove('available');
            seat.classList.add('unavailable');
          
            const flightId = "1"; 
            increasePassengers(flightId);
        });
    });
    function increasePassengers(flightId) {
    const formData= new FormData();
    formData.append('flightId',flightId);

        axios.post('http://localhost/flights-system-website/backend/increasepassengers.php',formData)
        .then((response) => {
            console.log(response.data);
            if (response.data.status === "success") {
                console.log(response.data.message);
            } else {
                console.log(response.data.message);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    }
});
