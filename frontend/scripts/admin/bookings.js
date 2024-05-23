let bookings = [];
const bookingsData = document.getElementById("bookingsData");

const getBookings = async () => {
  try {
    const response = await axios.get(
      "http://localhost/Flight-System/backend/getBookings.php"
    );
    console.log(response);
    bookingsData.innerHTML = "";
    bookings = response.data.bookings;
    bookings.forEach((element) => {
      bookingsData.innerHTML += generateBookings(element);
    });
  } catch (error) {
    console.log(error);
  }
};

const formatDate = (inputDate) => {
  const date = new Date(inputDate);

  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear().toString().slice(-2);

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
};

const generateBookings = (booking) => {
  const { id, user_name, flight_id, payment_status, booking_date } = booking;
  const formattedDate = formatDate(booking_date);
  return `
    <div class="table-row flex-row gap2 rounded center m-botom">
        <div class="el">${id}</div>
        <div class="el">${flight_id}</div>
        <div class="el">${user_name}</div>
        <div class="el">${formattedDate}</div>
        <div class="el">${payment_status === 0 ? "Not paid" : "Paid"}</div>
        <div class="el">
             <button class="delete-booking">
                    <img data-set-delete="${id}" src="../../assets/delete.svg" alt="" class="delete-svg-booking">
            </button>
        </div>
     </div> `;
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

const deleteBooking = async (bookingId) => {
  try {
    const bookingData = new FormData();
    bookingData.append("booking_id", parseInt(bookingId));
    const response = await axios.post(
      "http://localhost/Flight-System/backend/deleteBookings.php",
      bookingData
    );
    if (response.data.status === "success") {
      showToast(response.data.message);
      getBookings();
    }
  } catch (error) {
    console.log(error);
  }
};

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-svg-booking")) {
    const bookingId = event.target.dataset.setDelete;
    deleteBooking(bookingId);
  }
});

getBookings();
