import { getPosts } from "./api.js";

document.addEventListener("DOMContentLoaded", async function() {
    
    const posts = await getPosts(); // Await the asynchronous function

    displayPosts(posts);
    function displayPosts(posts) {
        console.log(posts);
        const postsContainer = document.querySelector('.posts');
        posts.forEach(post => {
            const postContainer = document.createElement('div');
            postContainer.classList.add('post');

            // Create and append post title
            const postTitle = document.createElement('h4');
            postTitle.textContent = post.Title || "Untitled"; // Use Title directly
            postContainer.appendChild(postTitle);

            // Create and append post description
            const postDescription = document.createElement('p');
            postDescription.textContent = post.Description || "No description"; // Use Description directly
            postContainer.appendChild(postDescription);

            // Create and append post body
            const postBody = document.createElement('p');
            postBody.textContent = post.Body || "No content"; // Use Body directly
            postContainer.appendChild(postBody);

            // Create and append post image if it exists
            if (post.Image) { // Use Image directly
                const postImage = document.createElement('img');
                postImage.src = post.Image;
                postImage.alt = post.Title || "Post image";
                postImage.style.objectFit = "cover"; // Ensure the image fits nicely
                postImage.classList.add('postImage'); // Add a CSS class
                postContainer.appendChild(postImage);
            }

            postsContainer.appendChild(postContainer);
        });
    }
});

