import { getPosts,deletePost } from "./api.js";

document.addEventListener("DOMContentLoaded", async function() {
    
    const posts = await getPosts();
    displayPosts(posts);
    function displayPosts(posts) {
        console.log(posts);
        const postsContainer = document.querySelector('.posts');
        posts.forEach(post => {
            const postContainer = document.createElement('div');
            postContainer.classList.add('post');
            
            const editButton = document.createElement('button');
            editButton.textContent = "Edit";
            editButton.classList.add('edit-button');
            editButton.addEventListener('click', function() {
                // Redirect to the edit page with the post ID
                window.location.href = `edit.html?id=${post.id}`;
            });
            postContainer.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = "Delete";
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', function() {
                // Implement delete functionality here
                const confirmation = confirm("Are you sure you want to delete this post?");
                if (confirmation) {
                    // Call your delete function here
                    deletePost(post.id);
                    console.log(`Post with ID ${post.id} deleted.`);
                }
            });
            postContainer.appendChild(deleteButton);

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
            const postAuthor = document.createElement('p');
            postAuthor.textContent = post.Author || "Anonymous"; // Use Author directly
            postContainer.appendChild(postAuthor);
            const postCreatedAt = document.createElement('p');
            postCreatedAt.textContent = post.createdAt || "Unknown date"; // Use createdAt directly
            postContainer.appendChild(postCreatedAt);
            postsContainer.appendChild(postContainer);
        });
    }
});

