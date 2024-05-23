const panels = document.querySelectorAll(".panel");
const flightStatusContainer = document.getElementById("flightStatusContainer");
let airPlanes = [];

panels.forEach((panel) => {
  panel.addEventListener("mouseenter", () => {
    removeActiveClasses();
    panel.classList.add("active");
  });
});

function removeActiveClasses() {
  panels.forEach((panel) => {
    panel.classList.remove("active");
  });
}
const getFlightsData = async () => {
  try {
    const response = await axios.get(
      "http://localhost/Flight-System/backend/getFlights.php"
    );
    const flights = response.data.flights;
    airPlanes = response.data.airplanes;
    flightStatusContainer.innerHTML = "";
    flights.forEach((flight) => {
      flightStatusContainer.innerHTML += generateFlights(flight);
    });
  } catch (error) {
    console.log(error);
  }
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
         </div> `;
};
getFlightsData();
