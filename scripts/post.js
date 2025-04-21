import { getPost, getPosts, updatePost, deletePost } from "./api.js";
import { openModal, closeModal, openEditModal } from "./modal.js";
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

        // Create and append post image
        if (post.Image) {
            const postImage = document.createElement('img');
            postImage.src = post.Image;
            postImage.alt = post.Title || "Post image";
            postImage.classList.add('post-image');
            postContainer.appendChild(postImage);
        }

        // Create and append post title
        const postTitle = document.createElement('h4');
        postTitle.textContent = post.Title || "Untitled";
        postContainer.appendChild(postTitle);

        // Create and append post author
        const postAuthor = document.createElement('p');
        postAuthor.textContent = `Author: ${post.Author || "Unknown"}`;
        postAuthor.classList.add('post-author');
        postContainer.appendChild(postAuthor);

        // Create and append edit button
        const editButton = document.createElement('button');
        editButton.textContent = "Edit";
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', (e) => {
            e.stopPropagation(); 
            console.log("Opening edit modal for post ID:", post.id); // Debugging
            openEditModal(post.id); 
        });
        postContainer.appendChild(editButton);
        // Create and append delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', async (e) => {
            e.stopPropagation();
            if (confirm("Are you sure you want to delete this post?")) {
                await deletePost(post.id);
                alert("Post deleted successfully!");
                fetchAndDisplayPosts();
            }
        });
        postContainer.appendChild(deleteButton);

        // Create and append Full Screen button
        const fullScreenButton = document.createElement('button');
        fullScreenButton.textContent = "Full Screen";
        fullScreenButton.classList.add('full-screen-button');

        // Add event listener for Full Screen functionality
        fullScreenButton.addEventListener('click', (e) => {
            e.stopPropagation();
            closeModal();
            const postContent = document.createElement('div');
            postContent.classList.add('full-screen-content');
            
            if (post.Image) {
                const postImage = document.createElement('img');
                postImage.src = post.Image;
                postImage.alt = post.Title || "Post image";
                postImage.style.maxWidth = "100%";
                postImage.classList.add('post-image'); 
                postContent.appendChild(postImage);
            }

            // Append the full-screen content to the body and request full screen
            document.body.appendChild(postContent);
            postContent.requestFullscreen().catch((err) => {
                console.error("Error attempting to enable full-screen mode:", err.message);
            });

            // Exit full screen and remove the content when the user exits full screen
            document.addEventListener('fullscreenchange', () => {
                if (!document.fullscreenElement) {
                    postContent.remove();
                }
            });
        });

        postContainer.appendChild(fullScreenButton);

        // Add click event to show full details
        postContainer.addEventListener('click', () => {
            showPostDetails(post);
        });

        postsContainer.appendChild(postContainer);
    });
}

// Function to show full post details
function showPostDetails(post) {
    const modalContent = document.createElement('div');
    modalContent.classList.add('post-details');

    const postTitle = document.createElement('h2');
    postTitle.textContent = post.Title || "Untitled";
    modalContent.appendChild(postTitle);

    const postAuthor = document.createElement('p');
    postAuthor.textContent = `Author: ${post.Author || "Unknown"}`;
    modalContent.appendChild(postAuthor);

    const postBody = document.createElement('p');
    postBody.textContent = post.Body || "No content available";
    modalContent.appendChild(postBody);

    if (post.Image) {
        const postImage = document.createElement('img');
        postImage.src = post.Image;
        postImage.alt = post.Title || "Post image";
        postImage.style.maxWidth = "100%";
        modalContent.appendChild(postImage);
    }

    const postDescription = document.createElement('p');
    postDescription.textContent = post.Description || "No description available";
    modalContent.appendChild(postDescription);

    openModal(modalContent); // Use the modal to display full details
}

document.addEventListener("DOMContentLoaded", function () {
    const postsContainer = document.querySelector('.posts');
    fetchAndDisplayPosts();
});