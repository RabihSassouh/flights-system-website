const editBtn = document.getElementById("editBtn");
const bookingHistory = document.getElementById("bookingHistory");
const editForm = document.getElementById("editForm");
const requestCoinsBtn = document.getElementById("requestCoinsBtn");
const coinRequestForm = document.getElementById("coinRequestForm");
const saveEdit = document.getElementById("saveEdit");
const submitRequest = document.getElementById("submitRequest");

const editName = document.getElementById("editName");
const editEmail = document.getElementById("editEmail");
const editPassword = document.getElementById("editPassword");
const editPhone = document.getElementById("editPhone");
const editGender = document.getElementById("editGender");
const editDate = document.getElementById("editDate");

const name_info=document.getElementById("name_info");
const accountBalance=document.getElementById("accountBalance");
const gender_info=document.getElementById("gender_info");
const birthdate_info=document.getElementById("birthdate_info");
const email_info=document.getElementById("email_info");
const phonenumber_info=document.getElementById("phonenumber_info");

function displayEdit() {
  editBtn.addEventListener("click", () => {
    bookingHistory.classList.add("hidden");
    editForm.classList.remove("hidden");
  });
}
function displayCoinRequest() {
  requestCoinsBtn.addEventListener("click", () => {
    coinRequestForm.classList.remove("hidden");
  });
}

function saveChanges() {
  saveEdit.addEventListener("click", async (event) => {
    event.preventDefault();

    try {
      const userId = localStorage.getItem("loggedUser");
      const formData = new FormData();

      formData.append("name", editName.value);
      formData.append("email", editEmail.value);
      formData.append("password", editPassword.value);
      formData.append("phone_number", editPhone);
      formData.append("gender", editGender.value);
      formData.append("birth_date", editDate.value);
      formData.append("userId", userId);

      const response = await axios.post(
        `http://localhost/flights-system-website/backend/savechanges.php?userId=${userId}`,
        formData
      );
      const data = response.data;

      if (data.status === "success") {
        console.log("User info updated");
        gender_info.textContent =
          formData.get("gender");
        birthdate_info.textContent =
          formData.get("birth_date");
        document.getElementById("location_info").textContent = "leb";
        email_info.textContent =
          formData.get("email");
        phonenumber_info.textContent =
          formData.get("phone_number");
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.log("Error");
    }

    editForm.classList.add("hidden");
    bookingHistory.classList.remove("hidden");
  });
}

function requestCoins() {
  submitRequest.addEventListener("click", (event) => {
    event.preventDefault();
    const coins = document.querySelector(".coin-request-ammount").value;

    fetch(
      "http://localhost/flights-system-website/backend/usercoinsrequest.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coins: coins,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          console.log(data.message);
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    coinRequestForm.classList.add("hidden");
  });
}


async function fetchUserInfo() {
    try {
        const userId = localStorage.getItem('loggedUser');
        const response = await axios.get(`http://localhost/flights-system-website/backend/userInfo.php?userId=${userId}`);
        const data = response.data;
        
        name_info.textContent = data.name;
        email_info.textContent = data.email;
        phonenumber_info.textContent = data.phone_number;
        gender_info.textContent = data.gender;
        birthdate_info.textContent = data.birth_date;
        accountBalance.textContent = data.balance;
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchUserInfo();


displayEdit();
displayCoinRequest();
saveChanges();
// requestCoins();
