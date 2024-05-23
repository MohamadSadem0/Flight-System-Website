let airPlanes = [];
let airLines = [];
let flights = [];
const flightsData = document.getElementById("flightsData");
const addFlightButton = document.getElementById("addFlightButton");
const addFlightForm = document.getElementById("addFlightForm");
const popUpFlight = document.getElementById("pop-up-createFlight");
const closeFlight = document.getElementById("close-flight");
const airlineList = document.getElementById("airline");
const airplaneList = document.getElementById("airplane");
const departureAirport = document.getElementById("departureAirport");
const arrivalAirport = document.getElementById("arrivalAirport");
const departureDate = document.getElementById("departureDate");
const arrivalDate = document.getElementById("arrivalDate");
const departureTime = document.getElementById("departureTime");
const arrivalTime = document.getElementById("arrivalTime");
const basePrice = document.getElementById("basePrice");

const editFlightPopUp = document.getElementById("pop-up-editeFlight");
const editFlightForm = document.getElementById("pop-up-editeFlight");
const closeEditFlight = document.getElementById("close-Editflight");
const editAirlineList = document.getElementById("editAirline");
const editAirplaneList = document.getElementById("editAirplane");
const getFlights = async () => {
  try {
    const response = await axios.get(
      "http://localhost/Flight-System/backend/getFlights.php"
    );
    airPlanes = response.data.airplanes;
    airLines = response.data.airlines;
    fillAirlineSelect();
    fillAirplaneSelect();
    fillSelect(editAirlineList, airLines);
    fillSelect(editAirplaneList, airPlanes);
    flightsData.innerHTML = "";
    flights = response.data.flights;
    flights.forEach((element) => {
      flightsData.innerHTML += generateFlights(element);
    });
  } catch (error) {
    console.log(error);
  }
};
const addFlightAction = async () => {
  try {
    const flightData = new FormData();
    flightData.append("airplane_id", parseInt(airplaneList.value));
    flightData.append("airline_id", parseInt(airlineList.value));
    flightData.append("departure_airport", departureAirport.value);
    flightData.append("arrival_airport", arrivalAirport.value);
    flightData.append("departure_date", departureDate.value);
    flightData.append("arrival_date", arrivalDate.value);
    flightData.append("departure_time", departureTime.value);
    flightData.append("arrival_time", arrivalTime.value);
    flightData.append("base_price", basePrice.value);
    const response = await axios.post(
      "http://localhost/Flight-System/backend/addFlights.php",
      flightData
    );
    if (response.data.status === "success") {
      showToast(response.data.message);
      getFlights();
    }
  } catch (error) {}
};
const generateFlights = (flight) => {
  const { airplane_id, arrival_date, departure_date, flight_status, id } =
    flight;
  return `
        <div class="table-row flex-row gap2 rounded center m-botom">
            <div class="el">${id}</div>
            <div class="el">${airPlanes[airplane_id].name}</div>
            <div class="el">${departure_date}</div>
            <div class="el">${arrival_date}</div>
            <div class="el">${
              flight_status === 0 ? "Running" : "Canceled"
            }</div>
            <div class="el">
                 <button class="delete-flight">
                        <img data-set-delete="${id}" src="../../assets/delete.svg" alt="" class="delete-svg-flight">
                </button>
                 <button class="edit-flight">
                    <img src="../../assets/edit.svg" data-set-edit="${id}" alt="" class="edit-svg-flight">
                </button>
            </div>
         </div> `;
};
const deleteFlight = async (flightId) => {
  try {
    const flightData = new FormData();
    flightData.append("flight_id", parseInt(flightId));
    const response = await axios.post(
      "http://localhost/Flight-System/backend/deleteFlights.php",
      flightData
    );
    if (response.data.status === "success") {
      showToast(response.data.message);
      getFlights();
    }
  } catch (error) {
    console.log(error);
  }
};
const fillSelect = (selectElement, data) => {
  data.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item.name;
    selectElement.appendChild(option);
  });
};

const fillAirlineSelect = () => {
  fillSelect(airlineList, airLines);
};

const fillAirplaneSelect = () => {
  fillSelect(airplaneList, airPlanes);
};

const showToast = (message, duration = 2000) => {
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, duration);
};
const editFlight = async (flightId) => {
  const flightDetails = flights.find(
    (flight) => flight.id === parseInt(flightId)
  );
  const editDepartureAirport = document.getElementById("editDepartureAirport");
  const editArrivalAirport = document.getElementById("editArrivalAirport");
  const editDepartureDate = document.getElementById("editDepartureDate");
  const editArrivalDate = document.getElementById("editArrivalDate");
  const editDepartureTime = document.getElementById("editDepartureTime");
  const editArrivalTime = document.getElementById("editArrivalTime");
  const flightStatus = document.getElementById("flightStatus");
  const editBasePrice = document.getElementById("editBasePrice");
  editDepartureAirport.value = flightDetails.departure_airport;
  editArrivalAirport.value = flightDetails.arrival_airport;
  editDepartureDate.value = flightDetails.departure_date;
  editArrivalDate.value = flightDetails.arrival_date;
  editDepartureTime.value = flightDetails.departure_time;
  editArrivalTime.value = flightDetails.arrival_time;
  editBasePrice.value = flightDetails.base_price;

  editFlightForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const flightData = new FormData();
    flightData.append("flight_id", parseInt(flightId));
    flightData.append("air_plane", parseInt(editAirplaneList.value));
    flightData.append("air_line", parseInt(editAirlineList.value));
    flightData.append("departure_airport", editDepartureAirport.value);
    flightData.append("arrival_airport", editArrivalAirport.value);
    flightData.append("departure_date", editDepartureDate.value);
    flightData.append("arrival_date", editArrivalDate.value);
    flightData.append("departure_time", editDepartureTime.value);
    flightData.append("arrival_time", editArrivalTime.value);
    flightData.append("base_price", parseInt(editBasePrice.value));
    flightData.append("flight_status", parseInt(flightStatus.value));
    try {
      const updateResponse = await axios.post(
        "http://localhost/Flight-System/backend/updateFlights.php",
        flightData
      );
      console.log(updateResponse);
      if (updateResponse.data.status === "success") {
        showToast(updateResponse.data.message);
        getFlights();
        editFlightPopUp.classList.remove("show");
      } else {
        showToast("Failed to update flight");
      }
    } catch (error) {
      console.log(error);
    }
  });
};
addFlightButton.addEventListener("click", () => {
  popUpFlight.classList.add("show");
});
closeFlight.addEventListener("click", () => {
  popUpFlight.classList.remove("show");
});
addFlightForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addFlightAction();
  popUpFlight.classList.remove("show");
});
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-svg-flight")) {
    const flightId = event.target.dataset.setDelete;
    deleteFlight(flightId);
  }
  if (event.target.classList.contains("edit-svg-flight")) {
    editFlightPopUp.classList.add("show");
    const flightId = event.target.dataset.setEdit;
    editFlight(flightId);
  }
});
closeEditFlight.addEventListener("click", () => {
  editFlightPopUp.classList.remove("show");
});

getFlights();
