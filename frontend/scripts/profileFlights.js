const confirmContainer = document.getElementById("confirmContainer");
const reviewContainer = document.getElementById("reviewContainer");
let flights = [];
let userAmount = 0;
const getConfirmFlights = () => {
  const confirmedData = localStorage.getItem("bookedFlights");
  userAmount = localStorage.getItem("userAmount");
  flights = JSON.parse(confirmedData) || [];
};
getConfirmFlights();
const formatTime = (timeString, hourOffset = 0) => {
  const [hours, minutes] = timeString.split(":");
  let formattedHours = (parseInt(hours) + hourOffset) % 12;
  formattedHours = formattedHours === 0 ? 12 : formattedHours;
  const period = parseInt(hours) + hourOffset < 12 ? "am" : "pm";
  const formattedTime = `${formattedHours}:${minutes} ${period}`;

  return formattedTime;
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
const getReviewData = async () => {
  try {
    const user_id = parseInt(localStorage.getItem("user_id"));
    const response = await axios.get(
      `http://localhost/Flight-System/backend/userFlight.php?id=${user_id}`
    );
    const reviewFlights = response.data.flights;
    reviewContainer.innerHTML = "";
    reviewFlights.forEach((flight) => {
      reviewContainer.innerHTML += generateReviewCardElement(flight);
    });
  } catch (error) {
    console.log(error);
  }
};
const generateCreateCardElement = (flight) => {
  const {
    base_price,
    id,
    departure_time,
    arrival_time,
    departure_airport,
    arrival_airport,
  } = flight;
  return `<div class="card flex-col txt-20">
        <div class="flex-row gap1">
          <img src="./../../assets/bookig-page/plain-1.svg" alt />
          <div class="flex-col dep-data j-center">
            <div>${formatTime(departure_time)} - ${formatTime(
    departure_time,
    1
  )}</div>
            <div>${departure_airport}</div>
          </div>
        </div>
        <div class="flex-row gap1">
          <img src="./../../assets/bookig-page/plain-2.svg" alt />
          <div class="flex-col dep-data j-center">
            <div>${formatTime(arrival_time)} - ${formatTime(
    arrival_time,
    1
  )}</div>
            <div>${arrival_airport}</div>
          </div>
        </div>
        <div class="flex-row gap1">
          <div class="txt-32">
            $${base_price}
          </div>
          <div class="submit-btn">
            <button class="ConfirmDeal" data-set-flight="${id}">Confirm Booking</button>
          </div>
        </div>
      </div>`;
};
const generateReviewCardElement = (flight) => {
  const {
    base_price,
    id,
    departure_time,
    arrival_time,
    departure_airport,
    arrival_airport,
  } = flight;
  return `<div class="card flex-col txt-20">
        <div class="flex-row gap1">
          <img src="./../../assets/bookig-page/plain-1.svg" alt />
          <div class="flex-col dep-data j-center">
            <div>${formatTime(departure_time)} - ${formatTime(
    departure_time,
    1
  )}</div>
            <div>${departure_airport}</div>
          </div>
        </div>
        <div class="flex-row gap1">
          <img src="./../../assets/bookig-page/plain-2.svg" alt />
          <div class="flex-col dep-data j-center">
            <div>${formatTime(arrival_time)} - ${formatTime(
    arrival_time,
    1
  )}</div>
            <div>${arrival_airport}</div>
          </div>
        </div>
        <div class="flex-row gap1">
          <div class="txt-32">
            $${base_price}
          </div>
          <div>
          </div>
        </div>
      </div>`;
};
const confirmFlight = async (id) => {
  const flightId = parseInt(id);
  const flight = flights.find((flight) => flight.id === flightId);
  const flight_price = parseInt(flight.base_price);
  if (parseInt(userAmount) >= flight_price) {
    try {
      const new_amount = parseInt(userAmount) - flight_price;
      const user_id = parseInt(localStorage.getItem("user_id"));
      const response = await axios.get(
        `http://localhost/Flight-System/backend/userCoinRequest.php?user_id=${user_id}&new_amount=${new_amount}`
      );
      const updateStatus = await axios.get(
        `http://localhost/Flight-System/backend/updateFlightStatus.php?flight_id=${flightId}`
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    showToast("You do not have enough coins to book this flight, request more");
  }
};
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("ConfirmDeal")) {
    const id = parseInt(e.target.getAttribute("data-set-flight"));
    confirmFlight(id);
  }
});
const fillConfirmFlightsContainer = () => {
  confirmContainer.innerHTML = "";
  flights.forEach((flight) => {
    confirmContainer.innerHTML += generateCreateCardElement(flight);
  });
};
fillConfirmFlightsContainer();
getReviewData();
document.addEventListener("DOMContentLoaded", getConfirmFlights);
