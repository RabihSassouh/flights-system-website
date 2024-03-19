const totalBookings = document.getElementById("total-Bookings");
const numberUsers = document.getElementById("num-users");
const numberPlanes = document.getElementById("num-planes");
const revenue = document.getElementById("revenue");

// function to load the html tags 
const showResults = (tag, number) => {
  tag.innerHTML = number;
};
// function calling the API to get the number of bookings
const getTotalBookings = () => {
  const result = fetch(
    "http://localhost/flights-system-website/backend/adminTotalBookings.php",
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const number = data["result"];
      showResults(totalBookings, number);
    })
    .catch((error) => {
      console.error(error);
    });
};



getTotalBookings();
