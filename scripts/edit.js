import { getPost, updatePost } from "./api.js";
import { openModal } from "./modal.js";

document.addEventListener("DOMContentLoaded", async function () {
    // Extract the post ID from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (!postId) {
        console.error("No post ID found in the URL.");
        alert("Invalid post ID. Redirecting to the posts page.");
        window.location.href = "post.html"; // Redirect to posts page
        return;
    }

    // Fetch the post data
    let post = await getPost(postId);
    if (!post) {
        console.error("Post not found.");
        alert("Post not found. Redirecting to the posts page.");
        window.location.href = "post.html"; // Redirect to posts page
        return;
    }

    // Create the edit form dynamically
    const form = document.createElement("form");
    form.innerHTML = `
        <h2>Edit Post</h2>
        <label for="title">Title:</label>
        <input type="text" id="title" value="${post.Title}" required /><br>
        <label for="description">Description:</label>
        <input type="text" id="description" value="${post.Description}" required /><br>
        <label for="author">Author:</label>
        <input type="text" id="author" value="${post.Author}" required /><br>
        <label for="body">Body:</label>
        <textarea id="body" required>${post.Body}</textarea><br>
        <label for="image">Image URL:</label>
        <input type="text" id="image" value="${post.Image}" required /><br>
        <button type="submit">Update</button>
    `;

    // Handle form submission
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const updatedPost = {
            Title: form.querySelector("#title").value.trim(),
            Description: form.querySelector("#description").value.trim(),
            Author: form.querySelector("#author").value.trim(),
            Body: form.querySelector("#body").value.trim(),
            Image: form.querySelector("#image").value.trim(),
        };

        if (updatedPost.Title) {
            await updatePost(postId, updatedPost);
            alert("Post updated successfully!");
            window.location.href = "home.html"; // Redirect to home page
        } else {
            alert("Please enter a valid title.");
        }
    });

    // Open the modal with the edit form
    openModal(form);
});