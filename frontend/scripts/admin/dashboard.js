const userTotal = document.getElementById("user");
const bookTotal = document.getElementById("book");
const revenueTotal = document.getElementById("revenue");
const ctx = document.getElementById("myChart").getContext("2d");

const fetchData = async () => {
  try {
    const response = await axios.get(
      "http://localhost/Flight-System/backend/overview.php"
    );
    bookTotal.innerHTML = response.data.totalBooks;
    userTotal.innerHTML = response.data.totalUsers;
    revenueTotal.innerHTML = response.data.totalRevenes;
    const flightPerMonth = response.data.flights_per_month;
    const months = Object.keys(flightPerMonth);
    const counts = Object.values(flightPerMonth);

    // Create chart after fetching data
    createChart(months, counts);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const createChart = (months, counts) => {
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: months,
      datasets: [
        {
          label: "Number of flights per month",
          data: counts,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 0.5,
          barThickness: 50,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

document.addEventListener("DOMContentLoaded", fetchData);
