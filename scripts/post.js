import { getPost, getPosts, updatePost, deletePost } from "./api.js";
import { openModal, closeModal } from "./modal.js";
let postsContainer = document.querySelector('.posts'); 

export async function fetchAndDisplayPosts() {
    postsContainer.innerHTML = '';
    const posts = await getPosts();
    displayPosts(posts);
}
export function displayPosts(posts) {
    postsContainer.innerHTML = ''; // Clear previous posts
    posts.forEach(post => {
        const postContainer = document.createElement('div');
        postContainer.classList.add('post');
        
        // Create and append edit button
        const editButton = document.createElement('button');
        editButton.textContent = "Edit";
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', () => openEditModal(post.id));
        postContainer.appendChild(editButton);

        // Create and append delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', async () => {
            if (confirm("Are you sure you want to delete this post?")) {
                await deletePost(post.id);
                alert("Post deleted successfully!");
                fetchAndDisplayPosts();
            }
        });
        postContainer.appendChild(deleteButton);
        // Create and append post title
        const postTitle = document.createElement('h4');
        postTitle.textContent = post.Title || "Untitled";
        postContainer.appendChild(postTitle);

        // Create and append post body
        const postBody = document.createElement('p');
        postBody.textContent = post.Body || "No content available";
        postContainer.appendChild(postBody);

        // Create and append post image if it exists
        if (post.Image) {
            const postImage = document.createElement('img');
            postImage.src = post.Image;
            postImage.alt = post.Title || "Post image";
            postImage.style.objectFit = "cover";
            postImage.classList.add('post-image');
            postContainer.appendChild(postImage);
        }
        // Create and append post description
        const postDescription = document.createElement('p');
        postDescription.textContent = post.Description || "No description available";
        postContainer.appendChild(postDescription);
        // Create and append post author
        const postAuthor = document.createElement('p');
        postAuthor.textContent = `Author: ${post.Author || "Unknown"}`; 
        postContainer.appendChild(postAuthor);
        // Create and append post date
        const postDate = document.createElement('p');
        postDate.textContent = `Date: ${post.createdAt || "Unknown"}`;
        postContainer.appendChild(postDate);

        postsContainer.appendChild(postContainer);
        async function openEditModal(postId) {
            const post = await getPost(postId);
    
            const form = document.createElement('form');
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
                    closeModal();
                    fetchAndDisplayPosts(); // Refresh posts
                } else {
                    alert("Please enter a valid title.");
                }
            });
    
            openModal(form);
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const postsContainer = document.querySelector('.posts');
    fetchAndDisplayPosts();
});
