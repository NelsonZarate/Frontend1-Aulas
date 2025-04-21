import { getPost, getPosts, updatePost, deletePost } from "./api.js";
export function openModal(content) {
    const modal = document.getElementById("modal");
    const modalBody = document.getElementById("modal-body");
    const closeButton = modal.querySelector(".close-button");

    // Populate the modal with content
    modalBody.innerHTML = ""; // Clear previous content
    modalBody.appendChild(content); // Append the new content

    // Show the modal
    modal.classList.remove("hidden");

    // Close modal on close button click
    closeButton.addEventListener("click", () => closeModal(modal));

    // Close modal on outside click
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal(modal);
        }
    });
}

export function closeModal() {
    const modal = document.getElementById("modal");
    modal.classList.add("hidden");
}
export async function openEditModal(postId) {
    const post = await getPost(postId); // Fetch the correct post data
    console.log("Editing post:", post); // Debug to ensure the correct post is being fetched

    // Create a new container for the modal content
    const modalContent = document.createElement('div');

    // Create the edit form dynamically
    const form = document.createElement('form');
    form.innerHTML = `
        <div class="modal-post">
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
        </div>
    `;

    // Handle form submission
    form.addEventListener('submit', async (event) => {
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
            closeModal(); // Close the modal after updating
            fetchAndDisplayPosts(); // Refresh the posts
        } else {
            alert("Please enter a valid title.");
        }
    });

    // Append the form to the modal content container
    modalContent.appendChild(form);

    // Pass the new modal content to openModal
    openModal(modalContent);
}