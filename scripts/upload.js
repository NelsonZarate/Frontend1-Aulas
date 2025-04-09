import { getPosts, createPost, updatePost, deletePost } from "./api.js";
 
document.addEventListener("DOMContentLoaded", async function () {
    function getdatetime(){
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

    let posts = await getPosts();
    if (posts) {
        displayPosts(posts);
    }else{
        console.error("No posts founds.");
    }

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
            const postAuthor = document.createElement('p');
            postAuthor.textContent = post.Author || "Anonymous"; // Use Author directly
            postContainer.appendChild(postAuthor);
            const postCreatedAt = document.createElement('p');
            postCreatedAt.textContent = post.createdAt || "Unknown date"; // Use createdAt directly
            postContainer.appendChild(postCreatedAt);
            postsContainer.appendChild(postContainer);
        });
    }
    uploadform.addEventListener('submit', async function (event) {
        event.preventDefault();
        const title = titleInput.value;
        const description = descriptionInput.value;
        const author = AuthorInput.value.trim();
        const image = imageInput.value.trim();
        const body = bodyInput.value.trim();
        if (title) {
            const newPost =  {
                "createdAt": getdatetime(),
                "Author": author,
                "Title": title,
                "Description": description,
                "Image": image,
                "Body": body
              }
        
            createPost(newPost);
            posts = await getPosts();
            displayPosts(posts);

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
