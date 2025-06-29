const handleRegistration = (event) => {
  event.preventDefault();
  const username = getValue("username");
  const first_name = getValue("first_name");
  const last_name = getValue("last_name");
  const email = getValue("email");
  const password = getValue("password");
  const confirm_password = getValue("confirm_password");
  const info = {
    username,
    first_name,
    last_name,
    email,
    password,
    confirm_password,
  };

  if (password === confirm_password) {
    document.getElementById("error").innerText = "";
    if (
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        password
      )
    ) {
      console.log(info);

      fetch("https://publication-tm35.onrender.com/employee/register/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(info),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Registration failed. Please try again.");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          alert("Registration successful! Check Your Email and Activate your Account. After activated Then You can log in.");
          window.location.href = "login.html";
        })
    } else {
      document.getElementById("error").innerText =
        "pass must contain eight characters, at least one letter, one number and one special character:";
    }
  } else {
    document.getElementById("error").innerText =
      "password and confirm password do not match";
    alert("password and confirm password do not match");
  }
};

const getValue = (id) => {
  const value = document.getElementById(id).value;
  return value;
};



// const handleLogin = (event) => {
//   event.preventDefault();

//   const username = getValue("login-username");
//   const password = getValue("login-password");

//   // Validate inputs
//   if (!username || !password) {
//     alert("Please provide both username and password.");
//     return;
//   }

//   // API call for login
//   fetch("https://publication-tm35.onrender.com/employee/login/", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ username, password }),
//   })
//     .then((res) => {
//       if (!res.ok) {
//         if (res.status === 401) {
//           throw new Error("Invalid username or password.");
//         } else {
//           throw new Error("Login failed. Please try again later.");
//         }
//       }
//       return res.json();
//     })
//     .then((data) => {
//       console.log(data);

//       if (data.token && data.user_id) {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user_id", data.user_id);


//         // Use `user_id` to fetch user details
//         const userId = data.user_id;
//         fetch(`https://publication-tm35.onrender.com/users/${userId}/`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${data.token}`, // Use token for authentication
//           },
//         })
//           .then((res) => {
//             if (!res.ok) {
//               throw new Error("Failed to fetch user details.");
//             }
//             return res.json();
//           })
//           .then((userData) => {
//             console.log(userData);

//             localStorage.setItem("username", userData.username);


//             if (userData.is_superuser) {
//               window.location.href = "https://rabi993.github.io/hfb-pms-rabiul-f/";
//             } else {
//               // window.location.href = "login.html";
//               window.location.href = "https://rabi993.github.io/hfb-pms-rabiul-f/login.html";

//             }
//           })
//           .catch((error) => {
//             console.error("Error fetching user details:", error);
//             alert("Failed to retrieve user details. Please try again.");
//           });
//       } else {
//         alert("Unexpected response from the server. Please try again.");
//       }
//     })
//     .catch((error) => {
//       console.error("Login error:", error);
//       alert(error.message);
//     });
// };


const handleLogin = (event) => {
  event.preventDefault();

  const username = getValue("login-username");
  const password = getValue("login-password");

  if (!username || !password) {
    alert("Please provide both username and password.");
    return;
  }

  fetch("https://publication-tm35.onrender.com/employee/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => {
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Invalid username or password.");
        } else {
          throw new Error("Login failed. Please try again later.");
        }
      }
      return res.json();
    })
    .then((data) => {
      if (data.token && data.user_id) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.user_id);

        const userId = data.user_id;

        fetch(`https://publication-tm35.onrender.com/users/${userId}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`,
          },
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to fetch user details.");
            }
            return res.json();
          })
          .then((userData) => {
            localStorage.setItem("username", userData.username);
            localStorage.setItem("roll", userData.is_superuser);

            const roll = localStorage.getItem("roll");

            // Assuming you want to set 'userroll' to "admin" or "user" based on is_superuser
            if (roll === "true") {
              localStorage.setItem("userroll", "admn");
            } else {
              localStorage.setItem("userroll", "usr");
            }

            // Now fetch employee list and find the matching employee
            fetch("https://publication-tm35.onrender.com/employee/list/", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.token}`,
              },
            })
              .then((res) => {
                if (!res.ok) {
                  throw new Error("Failed to fetch employee list.");
                }
                return res.json();
              })
              .then((employees) => {
                const user_id = parseInt(localStorage.getItem("user_id"));
                const employee = employees.find((p) => p.user === user_id);
                if (employee) {
                  localStorage.setItem("employeeid", employee.id);
                }

                // Redirect based on role
                if (userData.is_superuser) {
                  window.location.href = "http://127.0.0.1:5500/index.html";
                  // window.location.href = "http://hfb246.surge.sh/indexa.html";
                } else if (localStorage.getItem("employeeid")) {
                  window.location.href = "http://127.0.0.1:5500/index.html";
                  // window.location.href = "http://hfb246.surge.sh/indexap.html";
                } else {
                  window.location.href = "http://127.0.0.1:5500/login.html";
                  // window.location.href = "http://hfb246.surge.sh/login.html";
                }
              })
              .catch((error) => {
                console.error("Error fetching employee list:", error);
                alert("Could not fetch employee information.");
              });
          })
          .catch((error) => {
            console.error("Error fetching user details:", error);
            alert("Failed to retrieve user details. Please try again.");
          });
      } else {
        alert("Unexpected response from the server. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Login error:", error);
      alert(error.message);
    });
};
