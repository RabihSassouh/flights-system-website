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

// function calling the API to get the number of users
const getTotalUsers = () => {
  const result = fetch(
    "http://localhost/flights-system-website/backend/adminTotalUsers.php",
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const number = data["result"];
      showResults(numberUsers, number);
    })
    .catch((error) => {
      console.error(error);
    });
};

// function calling the API to get the number of planes
const getTotalPlanes = () => {
  const result = fetch(
    "http://localhost/flights-system-website/backend/adminTotalPlanes.php",
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const number = data["result"];
      showResults(numberPlanes, number);
    })
    .catch((error) => {
      console.error(error);
    });
};

// function calling the API to get the revenue
const getRevenue = () => {
  const result = fetch(
    "http://localhost/flights-system-website/backend/adminTotalRevenue.php",
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const number = data["result"];
      showResults(revenue, number);
    })
    .catch((error) => {
      console.error(error);
    });
};

getTotalBookings();
getTotalUsers();
getTotalPlanes();
getRevenue();
