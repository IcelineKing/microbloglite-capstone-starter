"use strict";

// use to create button. loo into using add event listener
// submitBlogBtn.onclick = addBlogPost;

// submit post to api
const submitBlogBtn = document.getElementById("submitBlogBtn");

submitBlogBtn.onclick = (e) => {
  e.preventDefault();
  addBlogPost();

  const writeBlogEntry = document.getElementById("writeBlogEntry");
  writeBlogEntry.value = "";
  alert("Yay! You've Grown a New Vine!");
  window.location.assign("/index.html"); // redirect to post page
}

//create post in the body

function addBlogPost(event) {
  let blogEntry = {
    text: writeBlogEntry.value,
  };

  console.log(blogEntry);

  const options = {
    method: "POST",
    headers: {
      // This header specifies the type of content we're sending.
      // This is required for endpoints expecting us to send
      // JSON data.
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        JSON.parse(window.localStorage.getItem("login-data")).token
      }`,
    },
    body: JSON.stringify(blogEntry),
  };

  fetch(apiBaseURL + "/api/posts", options)
    .then((response) => response.json())
    .then((newPost) => {
      console.log(newPost);
      if (newPost.statusCode === 409) {
        console.log(newPost);
        messageDiv.innerHTML = "Whoops Try Again!";
      }
    });
}

// This is to render all of the posts in the Microblog
function getPosts() {
  //Auth to make sure user has logged in, by requesting their token
  const options = {
    method: "GET",
    headers: {
      // This header specifies the type of content we're sending. This is required for endpoints expecting us to send JSON data.
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        JSON.parse(window.localStorage.getItem("login-data")).token
      }`,
    },
  };
  return fetch(apiBaseURL + "/api/posts", options)
    .then((response) => response.json())
    .then((posts) => {
      for (let post of posts) {
        // console.log(post.username);
        let userPostDiv = createPost(post);
        hostDiv.appendChild(userPostDiv);
      }
      console.log(posts);
    });
}

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.onclick = (e) => {
  e.preventDefault();
  logout();
};


