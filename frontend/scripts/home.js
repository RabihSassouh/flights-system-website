
const departureCountrySelect = document.getElementById('departure-country');
const arrivalCountrySelect = document.getElementById('destination-country');
const departureDateInput = document.getElementById('departure-date');
const returnDateInput = document.getElementById('return-date');
const numPassengersInput = document.getElementById('num-passengers');
const searchBtn = document.getElementById('search-btn');



const getAllFlights = () => {
    fetch("http://localhost/flights-system-website/backend/read_flights.php", {
      method: "GET",
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        fillCountrySelects(data);
    })
    .catch((error) => {
        console.error(error);
    });
};

const fillCountrySelects = ({flights}) => {
    const departureCountries = [];
    const arrivalCountries = [];

    flights?.forEach(flight => {
        departureCountries.push(
            {
                'id': flight.departure_airport_id,
                'name': flight.departure_country
            });
            arrivalCountries.push(
            {
                'id': flight.arrival_airport_id,
                'name': flight.arrival_country
            });
    });
    
    const uniqueDepartureCountries = [...new Set(departureCountries.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
    const uniqueArrivalCountries = [...new Set(arrivalCountries.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));

    uniqueDepartureCountries.forEach(country => {
        departureCountrySelect.innerHTML += `<option value="${country.id}">${country.name}</option>`;
    });
    uniqueArrivalCountries.forEach(country => {
        arrivalCountrySelect.innerHTML += `<option value="${country.id}">${country.name}</option>`;
    });
};

const formatDateToDisplay = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) {
      throw new Error("Invalid date string format. Please use YYYY-MM-DD.");
    }
  
    const date = new Date(dateString);
  
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
  
    return formattedDate;
}




searchBtn.addEventListener('click', () => {
    const departureCountryId = departureCountrySelect.value;
    const arrivalCountryId = arrivalCountrySelect.value;
    const departureDate = departureDateInput.value;
    const returnDate = returnDateInput.value;
    const numPassengers = numPassengersInput.value == '' ? 0 : numPassengersInput.value;

    const flightsFilterOptions = {
        departureCountryId: departureCountryId,
        arrivalCountryId: arrivalCountryId,
        departureDate: departureDate,
        returnDate: returnDate,
        numPassengers: numPassengers
    };

    localStorage.setItem('flightsFilterOptions', JSON.stringify(flightsFilterOptions));

    window.location.href = "./pages/flights.html";
});

getAllFlights();