const supportContainer = document.getElementById("supportContainer");
let supports = [];
const getSupportData = async () => {
  try {
    const response = await axios.get(
      "http://localhost/Flight-System/backend/messages.php"
    );
    supports = response.data;
    supportContainer.innerHTML = "";
    supports.forEach((support) => {
      supportContainer.innerHTML += generateSupportCard(support);
    });
  } catch (error) {
    console.log(error);
  }
};
const generateSupportCard = (support) => {
  const { first_name, last_name, user_id, message_text, message_id } = support;
  return `  <div class="question-card">
              <div class="info flex-row gap-5 mb-30">
                <img src="../../assets/profile.svg" alt="profile" />
                <h2 class="f-small">${first_name + " " + last_name}</h2>
              </div>
              <p>${message_text}</p>
              <div class="actions flex-row">
                <div>
                  <button>
                    <img src="../../assets/delete.svg" alt="" srcset="" class="delete-support" data-set-delete="${message_id}" />
                  </button>
                </div>
                <div>
                  <button class="flex-row j-center center reply">
                  <input type="text" placeholder="write your reply" class="message" />
                  <img class="createResponse" src="../../assets/send.svg" alt="" data-set-create="${message_id}" />
                  </button>
                </div>
              </div>
            </div>`;
};
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("delete-support")) {
      const id = e.target.getAttribute("data-set-delete");
      try {
        const response = await axios.delete(
          `http://localhost/Flight-System/backend/messages.php?message_id=${parseInt(
            id
          )}`
        );
        getSupportData();
      } catch (error) {
        console.log(error);
      }
    }
    if (e.target.classList.contains("createResponse")) {
      const id = parseInt(e.target.getAttribute("data-set-create"));
      const messageInput = e.target.parentElement.querySelector(".message");
      const messageText = messageInput.value;
      const specificSupport = supports.filter(
        (support) => support.message_id === id
      );

      try {
        const userId = parseInt(specificSupport[0].user_id);
        const responseData = new FormData();
        responseData.append("user_id", userId);
        responseData.append("message_text", messageText);
        responseData.append("user_type", 1);
        const response = await axios.post(
          `http://localhost/Flight-System/backend/messages.php`,
          responseData
        );
      } catch (error) {
        console.log(error);
      }
    }
  });
});
getSupportData();
