const feedbackContainer = document.getElementById("feedbackContainer");
let reviews = [];
const getFeedbacks = async () => {
  try {
    const response = await axios.get(
      "http://localhost/Flight-System/backend/reviews.php"
    );
    reviews = response.data.reviews;
    feedbackContainer.innerHTML = "";
    reviews.forEach((review) => {
      feedbackContainer.innerHTML += generateReviewCard(review);
    });
  } catch (error) {}
};

const generateReviewCard = (review) => {
  const { first_name, last_name, rating, review_id, review_text } = review;
  return ` <div class="review">
              <div class="info">
                <img src="../../assets/profile.svg" alt="" srcset="" />
                <h2>${first_name + " " + last_name}</h2>
              </div>
              <p>${review_text}</p>
              <div class="delete">
                <button>
                  <img src="../../assets/delete.svg" alt="" srcset="" data-set-id="${review_id}" class="delete-review" />
                </button>
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
document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-review")) {
    try {
      const review_id = e.target.getAttribute("data-set-id");
      const response = await axios.delete(
        `http://localhost/Flight-System/backend/reviews.php?review_id=${parseInt(
          review_id
        )}`
      );
      if (response.data.status === "success") {
        showToast("Review deleted successfully");
        getFeedbacks();
      }
    } catch (error) {
      console.log(error);
    }
  }
});
getFeedbacks();
