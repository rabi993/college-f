

// ==================== Logout Functionality ====================
const handlelogOut = () => {
  // Show confirmation prompt before logging out
  const confirmLogout = confirm("Are you sure you want to log out?");

  if (!confirmLogout) {
    // If user cancels, do nothing and return
    console.log("Logout canceled.");
    return;
  }

  const token = localStorage.getItem("token");

  fetch("https://publication-tm35.onrender.com/employee/logout/", {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Logout response:", data);




      // Clear all localStorage items
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("username");
      localStorage.removeItem("employeeid");
      localStorage.removeItem("roll");
      localStorage.removeItem("userroll");

      console.log("LocalStorage cleared successfully.");

      // Redirect to login page
      // window.location.href = "index.html"; // Redirect to the index page
      window.location.href = "login.html"; // Redirect to the login page
      // window.location.href = "https://rabi993.github.io/hfb-pms-rabiul-f/login.html"; // Redirect to the login page
    })
    .catch((err) => {
      console.error("Logout failed:", err);
      alert("An error occurred during logout.");
    });
};

// ==================== Attach Logout Event Listener ====================
document.getElementById("logout-btn").addEventListener("click", handlelogOut);