const loginForm = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");

const loginAction = async () => {
  try {
    const dataForm = new FormData();
    dataForm.append("email", email.value);
    dataForm.append("password", password.value);
    const response = await axios.post(
      "http://localhost/Flight-System/backend/login.php",
      dataForm
    );
    console.log(response.data.status);
    let userType = getUserType(response.data.token);
    console.log(typeof userType);
    if (response.data.status === "success" && userType === 0) {
      window.location.href = "http://127.0.0.1:5500/frontend/index.html";
    } else if (response.data.status === "success" && userType === 1) {
      window.location.href =
        "http://127.0.0.1:5500/frontend/pages/admin/dashboard.html";
    }
  } catch (error) {}
};
function getUserType(token) {
  localStorage.setItem("token", token);
  try {
    const [_, payloadEncoded] = token.split(".");
    const payload = JSON.parse(atob(payloadEncoded));
    const userType = payload.user_type;
    const userId = payload.user_id;
    localStorage.setItem("user_id", userId);

    return userType;
  } catch (error) {
    console.error("Error extracting user type from JWT token:", error.message);
    return null;
  }
}
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  loginAction();
});
