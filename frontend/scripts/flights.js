const flightsContainer = document.getElementById('flights-container');
const departureCountrySelect = document.getElementById('departure-country');
const arrivalCountrySelect = document.getElementById('destination-country');


const getAllFlights = () => {
    fetch("http://localhost/flights-system-website/backend/read_flights.php", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
          displayFlights(data);
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

const displayFlights = (data) => {
    flightsContainer.innerHTML = '';

    data.flights?.forEach((flight) => {
        const flightCard = generateFlightCard(flight);
        flightsContainer.innerHTML += flightCard;
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

const generateFlightCard = (flight) => {
    console.log(flight);
    const { id, departure_date, return_date, departure_time, arrival_time, num_passengers, price, departure_country, arrival_country } = flight;
    
    const f_departure_date = formatDateToDisplay(departure_date, "MMM Do, YYYY");
    const f_return_date = formatDateToDisplay(return_date, "MMM Do, YYYY");

    return `<div class="flight-card" id="${id}">
                <img src="../assets/images/flight.jpg" />
                <div class="flight-info flex column center">
                    <div class="date-time white-text flex row center gap-10">
                        <div class="departure flex column center">
                            <p class="date">${f_departure_date}</p>
                            <p class="time">${departure_time}</p>
                        </div>
                        <img src="../assets/icons/double-arrow.svg" />
                        <div class="destination flex column center">
                            <p class="date">${f_return_date}</p>
                            <p class="time">${arrival_time}</p>
                        </div>
                    </div>
                
                    <div class="departure-destination">
                        <h3>${departure_country} - ${arrival_country}</h3>
                    </div>
                    
                    <div class="passengers flex row">
                        <img src="../assets/icons/passenger-gray.svg" /> ${num_passengers} Passenger${num_passengers>1 ? 's' : ''}
                    </div>
                </div>

                <h3 class="price">${price}$</h3>
                <btn class="book btn-style-3">Book now</btn>
            </div>`;
};


getAllFlights();