/* Posts Page Javascript */

"use strict";

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.onclick = (e) => {
  e.preventDefault();
  logout();
};

let hostDiv = document.getElementById("blogposts");

window.onload = function () {
  //   console.log("connected");
  //   hostDiv.appendChild(createPost());
  getPosts();
};

// formatting for posts
function createPost(post) {
  console.log();
  let userPostDiv = document.createElement("div");

  userPostDiv.className = "card text-bg-dark";

  let postImage = document.createElement("img");

  postImage.src = "/images/posts_background.jpg";
  postImage.className = "card-img";
  postImage.alt = "...";

  userPostDiv.appendChild(postImage);

  let imageOverlayDiv = document.createElement("div");

  imageOverlayDiv.className = "card-img-overlay";

  userPostDiv.appendChild(imageOverlayDiv);

  let postHeading = document.createElement("h5");

  postHeading.className = "card-title";
  postHeading.innerHTML = post.username; //pull username of the creator of blogpost to use as title

  imageOverlayDiv.appendChild(postHeading);

  let postTextMain = document.createElement("p");

  postTextMain.className = "card-text";
  postTextMain.innerHTML = post.text; // pull body text of the post that was entered

  imageOverlayDiv.appendChild(postTextMain);

  let postTextSecondary = document.createElement("p");
  let postTextSmall = document.createElement("small");
  postTextSmall.innerHTML = "Created at:" + post.createdAt; //pull in entered date

  postTextSecondary.className = "card-text";
  postTextSecondary.appendChild(postTextSmall);
  imageOverlayDiv.append(postTextSecondary);

  return userPostDiv;
}



//Displays posts

function getPosts() {
  // making sure theyre logged in
  const options = {
    method: "GET",
    headers: {
      // This header specifies the type of content we're sending.
      // This is required for endpoints expecting us to send
      // JSON data.
      "Content-Type": "application/json",
      "Authorization": `Bearer ${
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



//NOTES TO DELETE LATER

//SHAPE OF DATA REFERENCES
// [
//     {
//       "_id": "string",
//       "text": "string",
//       "username": "string",
//       "createdAt": "2024-06-25T15:45:06.240Z",
//       "likes": [
//         {
//           "_id": "string",
//           "username": "string",
//           "postId": "string",
//           "createdAt": "2024-06-25T15:45:06.240Z"
//         }
//       ]
//     }
//   ]

// <div class="card text-bg-dark">
// <img src="images/posts_background.jpg" class="card-img" alt="...">
// <div class="card-img-overlay">
//     <h5 class="card-title">Card title</h5>
//     <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
//         additional content. This content is a little bit longer.</p>
//     <p class="card-text"><small>Last updated 3 mins ago</small></p>
// </div>
// </div> */}
