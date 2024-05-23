const signUpForm = document.getElementById("signForm");
const firstName = document.getElementById("first_name");
const lastName = document.getElementById("last_name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const checkValues = (fnam, lnam, email, password) => {
  if (fnam === "" || lnam === "" || email === "" || password === "") {
    return false;
  }
  return true;
};

function showToast(message, duration = 2000) {
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, duration);
}

const createUser = async () => {
  try {
    const userFirstName = firstName.value;
    const userLastName = lastName.value;
    const userEmail = email.value;
    const userPassword = password.value;
    const validateInputs = checkValues(
      userFirstName,
      userLastName,
      userEmail,
      userPassword
    );

    if (validateInputs) {
      const userData = new FormData();
      userData.append("first_name", firstName.value);
      userData.append("last_name", lastName.value);
      userData.append("email", email.value);
      userData.append("password", password.value);
      const response = await axios.post(
        "http://localhost/Flight-System/backend/signup.php",
        userData
      );
      let userType = getUserType(response.data.token);
      if (response.data.status === "success" && userType === 0) {
        window.location.href = "http://127.0.0.1:5500/frontend/index.html";
      }
    } else {
      showToast("Please fill all the fields");
    }
    userFirstName = "";
    userLastName = "";
    userEmail = "";
    userPassword = "";
  } catch (error) {
    console.log(error);
  }
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
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  createUser();
});
