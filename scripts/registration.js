"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const usernameField = document.getElementById("username");
  const fullnameField = document.getElementById("fullname");
  const passwordField = document.getElementById("password");
  const createAccountButton = document.getElementById("createAccountButton");
  const messageDiv = document.querySelector("#messageDiv");

  createAccountButton.onclick = register;

  function register(event) {
    // POST /api/users
    event.preventDefault();

    let bodyData = {
      username: usernameField.value,
      fullName: fullnameField.value,
      password: passwordField.value,
    };

    console.log(bodyData);

    const options = {
      method: "POST",
      headers: {
        // This header specifies the type of content we're sending.
        // This is required for endpoints expecting us to send
        // JSON data.
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    };

    fetch(apiBaseURL + "/api/users", options)
      .then((response) => response.json())
      .then((newUser) => {
        console.log(newUser);
        if (newUser.statusCode === 409) {
          console.log(newUser);
          messageDiv.innerHTML = "Whoops Try Again!";
        } else {
          window.location.assign("/index.html"); // redirect to login page to receive token
        }
      });
  }
});

// notes:
// users:
// john doe, jond, 1234
// tom yarn, tomy, 123456
// up down, updown, 12345
// sam brown, samb, pancakes1
