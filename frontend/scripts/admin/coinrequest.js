const coinContainer = document.getElementById("coinData");
const coinPopUp = document.getElementById("pop-up-coin");
const closePopUp = document.getElementById("close-coin");
const editForm = document.getElementById("editCoinRequest");
let coinRequests = [];
const getCoinData = async () => {
  try {
    const response = await axios.get(
      "http://localhost/Flight-System/backend/coinRequest.php"
    );
    coinRequests = response.data.coinsRequests;
    coinContainer.innerHTML = "";
    coinRequests.forEach((coin) => {
      coinContainer.innerHTML += generateCoins(coin);
    });
  } catch (error) {
    console.log(error);
  }
};
const generateCoins = (coin) => {
  const { amount, first_name, last_name, request_id, status } = coin;
  const statusText =
    status === 1 ? "Approved" : status === 0 ? "Pending" : "Rejected";
  return `
        <div class="table-row flex-row gap2 rounded center m-botom">
            <div class="el">${request_id}</div>
            <div class="el">${first_name + " " + last_name}</div>
            <div class="el">${amount}</div>
            <div class="el">${statusText}</div>
            <div class="el">
                 <button class="delete-coin">
                        <img data-set-delete="${request_id}" src="../../assets/delete.svg" alt="" class="delete-svg-coin">
                </button>
                 <button class="edit-coin">
                    <img src="../../assets/edit.svg" data-set-edit="${request_id}" alt="" class="edit-svg-coin">
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
const deleteCoin = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost/Flight-System/backend/coinRequest.php?id=${parseInt(
        id
      )}`
    );
    console.log(response);
    if (response.data.status === "Success") {
      showToast(response.data.message);
      getCoinData();
    }
  } catch (error) {}
};
const editCoinAction = (id) => {
  editForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const requestId = parseInt(id);
    const requestStaus = parseInt(
      document.getElementById("requestStatus").value
    );
    try {
      const response = await axios.put(
        `http://localhost/Flight-System/backend/coinRequest.php?id=${requestId}&status=${requestStaus}`
      );
      if (response.data.status === "Success") {
        showToast(response.data.message);
        getCoinData();
        coinPopUp.classList.remove("show");
      }
    } catch (error) {}
  });
};
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-svg-coin")) {
    const deleteCoinId = e.target.getAttribute("data-set-delete");
    deleteCoin(deleteCoinId);
  }
  if (e.target.classList.contains("edit-svg-coin")) {
    coinPopUp.classList.add("show");
    const editCoinId = e.target.getAttribute("data-set-edit");
    editCoinAction(editCoinId);
  }
});
closePopUp.addEventListener("click", () => {
  coinPopUp.classList.remove("show");
});
getCoinData();
