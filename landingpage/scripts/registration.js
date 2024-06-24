"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const username = document.getElementById("username").value;
  const fullname = document.getElementById("fullname").value;
  const password = document.getElementById("password").value;
  const createAccountButton = document.getElementById("createAccountButton");
  const messageDiv = document.querySelector("#messageDiv");

  createAccountButton.onclick = register;

  function register(event) {
    // POST /api/users
    event.preventDefault();
    let bodyData = {
      username: username,
      fullName: fullname,
      password: password,
    };
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
        if (newUser.statusCode === 409) {
          console.log(newUser);
          messageDiv.innerHTML = "Something wrong";
        } else {
          window.location.assign("/login.html"); // redirect to login page to receive token
        }
      });
  }
});
