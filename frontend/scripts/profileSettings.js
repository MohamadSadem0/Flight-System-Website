const userAmount = document.getElementById("amount");

const getUserAmount = async () => {
  try {
    const user_id = parseInt(localStorage.getItem("user_id"));
    const response = await axios.get(
      `http://localhost/Flight-System/backend/coinRequest.php?id=${user_id}`
    );
    console.log(response);
    const userRequest = response.data.coinsRequest;
    if (userRequest) {
      const amount = userRequest.totalAmount;
      userAmount.innerHTML = amount;
    } else {
      userAmount.innerText = "0";
    }
    localStorage.setItem("userAmount", userRequest.totalAmount || 0);
  } catch (error) {}
};
getUserAmount();
