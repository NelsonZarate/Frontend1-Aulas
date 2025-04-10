import { getPosts, createPost, updatePost, deletePost } from "./api.js";
import { displayPosts,fetchAndDisplayPosts } from "./post.js";
import { openModal } from "./modal.js";
document.addEventListener("DOMContentLoaded", async function () {
    function getdatetime() {
        const currentDate = new Date();
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        return currentDate.toLocaleString('pt', options);
    }

    const uploadform = document.getElementById('form-upload');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const AuthorInput = document.getElementById('author');
    const bodyInput = document.getElementById('body');
    const imageInput = document.getElementById('image');
    const uploadPostContainer = document.querySelector('.uploadPosts');
    const postsContainer = document.querySelector('.post');
    const createPostButton = document.getElementById("create-post-button");

    let posts = await getPosts();
    if (posts) {
        displayPosts(posts);
    } else {
        console.error("No posts founds.");
    }

    uploadform.addEventListener('submit', async function (event) {
        event.preventDefault();
        const title = titleInput.value;
        const description = descriptionInput.value;
        const author = AuthorInput.value.trim();
        const image = imageInput.value.trim();
        const body = bodyInput.value.trim();
        if (title) {
            const newPost = {
                "createdAt": getdatetime(),
                "Author": author,
                "Title": title,
                "Description": description,
                "Image": image,
                "Body": body
            }

            await createPost(newPost);
            fetchAndDisplayPosts();

            titleInput.value = '';
            descriptionInput.value = '';
            AuthorInput.value = '';
            bodyInput.value = '';
            imageInput.value = '';

        } else {
            alert("Please enter a valid name.");
        }
    });
});
