"use strict";

// use to create button. loo into using add event listener
// submitBlogBtn.onclick = addBlogPost;

// submit post to api
const submitBlogBtn = document.getElementById("submitBlogBtn");

submitBlogBtn.onclick = (e) => {
  e.preventDefault();
  addBlogPost();
};

//create post

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
      //   else {
      //     window.location.assign("posts/index.html"); // redirect to posts page to view newly added post
      //   }
    });
}

function getPosts() {
  // POST /auth/login
  const options = {
    method: "GET",
    headers: {
      // This header specifies the type of content we're sending.
      // This is required for endpoints expecting us to send
      // JSON data.
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
      //   console.log(posts);
    });
}

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.onclick = (e) => {
  e.preventDefault();
  logout();
};
