document.addEventListener("DOMContentLoaded", function () {
    const userRole = localStorage.getItem("userroll");

    const adminElements = document.querySelectorAll(".admin");
    const employeeElements = document.querySelectorAll(".employee");
    const login = document.querySelectorAll(".login");
    const logout = document.querySelectorAll(".logout");

    if (userRole === "admn") {
        // Hide employee items
        employeeElements.forEach(el => el.classList.add("d-none"));
        login.forEach(el => el.classList.add("d-none"));
    } else if (userRole === "usr") {
        // Hide admin items
        adminElements.forEach(el => el.classList.add("d-none"));
        login.forEach(el => el.classList.add("d-none"));
    } else {
        // If role is missing or invalid, hide both
        adminElements.forEach(el => el.classList.add("d-none"));
        employeeElements.forEach(el => el.classList.add("d-none"));
        logout.forEach(el => el.classList.add("d-none"));
    }
});
