// Function to generate a random color
const getColor = () => {
  const randomNumber = Math.floor(Math.random() * 16777215);
  const randomCode = "#" + randomNumber.toString(16).padStart(6, "0"); // Ensure 6 digits
  document.body.style.backgroundColor = randomCode;
  document.getElementById("color-code").innerText = randomCode;

  // Store current background color in localStorage for potential undo
  localStorage.setItem("lastColor", randomCode);

  // Copy color code to clipboard and display confirmation
  navigator.clipboard
    .writeText(randomCode)
    .then(() => {
      showCopyNotification();
    })
    .catch((err) => {
      console.error("Failed to copy color code: ", err);
    });
};

// Function to show confirmation that color is copied
const showCopyNotification = () => {
  const notification = document.createElement("div");
  notification.innerText = "Color code copied!";
  notification.style.position = "fixed";
  notification.style.bottom = "20px";
  notification.style.right = "20px";
  notification.style.padding = "10px";
  notification.style.backgroundColor = "#61dafb";
  notification.style.color = "#1f1f1f";
  notification.style.borderRadius = "5px";
  notification.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
  notification.style.opacity = "0";
  notification.style.transition = "opacity 0.5s";

  document.body.appendChild(notification);

  // Fade in the notification
  setTimeout(() => {
    notification.style.opacity = "1";
  }, 10);

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.opacity = "0";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 3000);
};

// Add an undo button to revert to the last color
const undoColorChange = () => {
  const lastColor = localStorage.getItem("lastColor");
  if (lastColor) {
    document.body.style.backgroundColor = lastColor;
    document.getElementById("color-code").innerText = lastColor;
  } else {
    alert("No previous color to revert to.");
  }
};

// Event listener for the "Change Color" button
document.getElementById("btn").addEventListener("click", getColor);

// Initial call to generate the first random color on page load
getColor();

// Undo functionality (optional)
const undoButton = document.createElement("button");
undoButton.innerText = "Undo Last Color";
undoButton.style.marginTop = "10px";
undoButton.style.fontSize = "1.2rem";
undoButton.style.padding = "12px";
undoButton.style.width = "100%";
undoButton.style.backgroundColor = "#ff4f4f";
undoButton.style.color = "#fff";
undoButton.style.borderRadius = "5px";
undoButton.style.border = "none";
undoButton.style.cursor = "pointer";

document.querySelector(".container").appendChild(undoButton);
undoButton.addEventListener("click", undoColorChange);
