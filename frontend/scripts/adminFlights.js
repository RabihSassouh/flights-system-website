const selectorDepartureAirports=document.getElementById("departureSelect");
const selectorArrivalAirports=document.getElementById("arrivalSelect");
const selectorPlanes=document.getElementById("planeSelect");

function addOptionPlane(text, id) {
    let option = document.createElement("option");
    option.value = id;
    option.text = text;
    selectorPlanes.appendChild(option);
  }

  function addOptionAirport(text, id) {
    let departureOption = document.createElement("option");
    let arrivalOption = document.createElement("option");
    departureOption.value = id;
    departureOption.text = text;;
    arrivalOption.value = id;
    arrivalOption.text = text;
    selectorDepartureAirports.appendChild(departureOption);
    selectorArrivalAirports.appendChild(arrivalOption);
    
  }

const GetPlane = () => {
    fetch(
      "http://localhost/flights-system-website/backend/adminGetPlanes.php",
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const planes = data["planes"];
        planes.forEach(element => {
            const {id, manufacturer, model, airline}=element
            plane=manufacturer +" "+ model +" owned by "+airline;
            addOptionPlane(plane,id)
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const GetAirport = () => {
    fetch(
      "http://localhost/flights-system-website/backend/adminGetAirport.php",
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const airports = data["airports"];
        airports.forEach(element => {
            const {id,name}=element
            addOptionAirport(name,id)
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  GetPlane();
  GetAirport();