const selectorAirports=document.getElementById("airportSelect");
const selectorPlanes=document.getElementById("planeSelect");

function addOption(text, id) {
    let option = document.createElement("option");
    option.value = id;
    option.text = text;
    selectorPlanes.appendChild(option);
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
            addOption(plane,id)
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };


  GetPlane();