let messages = [];
let adminMessages = [];
const chat = document.getElementById("chat-box");
const createMessageBtn = document.getElementById("createMessage");
const sendMessage = (message) => {
  const { message_text } = message;
  let userBubble = document.createElement("div");
  userBubble.classList.add("chat-bubble", "user-bubble");
  userBubble.innerHTML = `<p class="txt-grey-24">${message_text}</p>`;
  chat.appendChild(userBubble);
};
const getMessage = async () => {
  try {
    const userId = parseInt(localStorage.getItem("user_id"));
    const response = await axios.get(
      `http://localhost/Flight-System/backend/messages.php?user_id=${userId}`
    );
    chat.innerHTML = "";
    getAdminMessage();
    messages = response.data;
    messages.forEach((message) => {
      sendMessage(message);
    });
  } catch (error) {
    console.log(error);
  }
};
const sendAdminMessage = (message) => {
  const { message_text } = message;
  let adminBubble = document.createElement("div");
  adminBubble.classList.add("chat-bubble", "admin-bubble");
  adminBubble.innerHTML = `<p class="txt-grey-24">${message_text}</p>`;
  chat.appendChild(adminBubble);
};
const getAdminMessage = async () => {
  try {
    const userId = parseInt(localStorage.getItem("user_id"));
    const response = await axios.get(
      `http://localhost/Flight-System/backend/getAdminMessages.php?user_id=${userId}`
    );
    adminMessages = response.data;
    console.log(adminMessages);
    adminMessages.forEach((message) => {
      console.log(message);
      sendAdminMessage(message);
    });
  } catch (error) {
    console.log(error);
  }
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
const createMessage = async () => {
  try {
    const userInput = document.getElementById("user-input").value;
    const userId = parseInt(localStorage.getItem("user_id"));
    const userType = 0;
    const messageData = new FormData();
    messageData.append("user_id", userId);
    messageData.append("message_text", userInput);
    messageData.append("user_type", userType);
    const response = await axios.post(
      "http://localhost/Flight-System/backend/messages.php",
      messageData
    );
    if (response.data.status === "success") {
      showToast(response.data.message);
      getAdminMessage();
      getMessage();
    }
  } catch (error) {
    console.log(error);
  }
};
createMessageBtn.addEventListener("click", (e) => {
  e.preventDefault();
  createMessage();
});
getMessage();
