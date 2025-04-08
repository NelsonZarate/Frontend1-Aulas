import { getPosts, createPost } from "./api.js";

document.addEventListener("DOMContentLoaded", function () {
    const uploadform = document.getElementById('form-upload');
    const titleInput = document.getElementById('titleInput');
    const descriptionInput = document.getElementById('descriptionInput');
    const uploadPostContainer = document.querySelector('.uploadPosts');
    const postsContainer = document.querySelector('.posts');

    const posts = getPosts();
    if (posts) {
        displayPosts(posts);
    }else{
        console.error("No posts founds.");
    }

    function displayPosts(postsToDisplay) {
        // Limpa os posts atuais
        postsContainer.innerHTML = '';

        // Se for apenas um post (ex: após submit), transforma em array
        const postArray = Array.isArray(postsToDisplay) ? postsToDisplay : [postsToDisplay];

        postArray.forEach(post => {
            const postContainer = document.createElement('div');
            postContainer.classList.add('post');

            const postTitle = document.createElement('h4');
            postTitle.textContent = post.nome;
            postContainer.appendChild(postTitle);

            const postDescription = document.createElement('p');
            postDescription.textContent = post.descricao;
            postContainer.appendChild(postDescription);

            const postBody = document.createElement('p');
            postBody.textContent = post.body;
            postContainer.appendChild(postBody);

            if (post.image_url) {
                const postImage = document.createElement('img');
                postImage.src = post.image_url;
                postImage.alt = "Post Image";
                postContainer.appendChild(postImage);
            }

            postsContainer.appendChild(postContainer);
        });
    }

    uploadform.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();
        
        if (title) {
            const newPost =  {
                "createdAt": "2025-04-08T10:24:08.322Z",
                "Author": "Edith Langosh",
                "Title": "Excepturi audacia tristis angustus conitor vereor cunabula.",
                "Description": "https://loremflickr.com/348/2066?lock=8085492080177151",
                "Image": "https://loremflickr.com/3024/2104?lock=4796131944609210",
                "Body": "Tristis repudiandae coma tutamen terebro soluta culpa cena inventore. Supra aedificium cado fugiat. Conspergo assentator cur modi.",
                "id": "1"
              }
        
            createPost(newPost);
            posts = getPosts();
            displayPosts(posts);

            titleInput.value = '';
            descriptionInput.value = '';
        } else {
            alert("Please enter a valid name.");
        }
    });
});
