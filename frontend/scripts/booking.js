let scrollCounter = 0;
let flights = [];
let selectedFlightList = [];

const hero = document.getElementsByClassName("hero");
const card = document.getElementById("image-card");
const back = document.getElementById("image-bck");
const searchDestination = document.getElementById("destination");
const searchDestinationData = document.getElementById("checkIn");
const searchArrivalDate = document.getElementById("checkOut");
const searchBtn = document.getElementById("search");
let page = 0;
let lastScrollPosition = window.scrollY;
let scrollDirectionElement;
const allFlightsConatiner = document.getElementById("container");

const getFlights = async () => {
  try {
    const response = await axios.get(
      "http://localhost/Flight-System/backend/getFlights.php"
    );
    flights = response.data.flights;
    allFlightsConatiner.innerHTML = "";
    flights.forEach((flight) => {
      allFlightsConatiner.innerHTML += generateFlightsCard(flight);
    });
  } catch (error) {}
};
const searchFlights = async () => {
  try {
    const destinationText = searchDestination.value;
    const destinationDate = searchDestinationData.value;
    const arrivalDate = searchArrivalDate.value;
    const response = await axios.get(
      `http://localhost/Flight-System/backend/searchFlights.php?
      departure_airport=${destinationText}&departure_date=${destinationDate}&arrival_date=${arrivalDate}`
    );
    const flights = response.data;
    allFlightsConatiner.innerHTML = "";
    flights.forEach((flight) => {
      allFlightsConatiner.innerHTML += generateFlightsCard(flight);
    });
    if (destinationText === "") {
      getFlights();
    }
  } catch (error) {
    console.log(error);
  }
};
function formatTime(timeString, hourOffset = 0) {
  const [hours, minutes] = timeString.split(":");
  let formattedHours = (parseInt(hours) + hourOffset) % 12;
  formattedHours = formattedHours === 0 ? 12 : formattedHours; // Handle midnight (0:00)
  const period = parseInt(hours) + hourOffset < 12 ? "am" : "pm";
  const formattedTime = `${formattedHours}:${minutes} ${period}`;

  return formattedTime;
}
const generateFlightsCard = (flight) => {
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
            <button class="addDeal" data-set-flight="${id}">Add To Deal</button>
          </div>
        </div>
      </div>`;
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
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("addDeal")) {
    const flightId = parseInt(e.target.getAttribute("data-set-flight"));
    const selectedFlight = flights.find((flight) => flight.id === flightId);
    selectedFlightList.push(selectedFlight);
    localStorage.setItem("bookedFlights", JSON.stringify(selectedFlightList));
    showToast("Please confirm your booking in your profile");
  }
});
window.addEventListener("scroll", function () {
  let currentScrollPosition = window.scrollY;

  if (currentScrollPosition > lastScrollPosition) {
    scrollDirectionElement = "Down";

    if (this.window.scrollY > 100) {
      switch (page) {
        case 0:
          card.classList.add("fade-out");
          back.classList.add("fade-out");
          setTimeout(() => {
            card.src = "../../assets/bookig-page/card-2.webp";
            back.src = "../../assets/bookig-page/bck-2.webp";
            card.classList.remove("fade-out");
            back.classList.remove("fade-out");
            page = 1;
            window.scrollTo(0, 0);
          }, 500);
          break;

        case 1:
          card.classList.add("fade-out");
          back.classList.add("fade-out");
          setTimeout(() => {
            card.src = "../../assets/bookig-page/card-3.png";
            back.src = "../../assets/bookig-page/bck-3.webp";
            card.classList.remove("fade-out");
            back.classList.remove("fade-out");
            page = 2;
            window.scrollTo(0, 0);
          }, 500);
          break;
        case 2:
          this.scrollTo(0, 600);
          page = 3;
          break;

        default:
          break;
      }
    }
  } else {
    scrollDirectionElement = "Up";
  }

  lastScrollPosition = currentScrollPosition;
});
searchBtn.addEventListener("click", searchFlights);
getFlights();
