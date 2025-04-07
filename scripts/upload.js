document.addEventListener("DOMContentLoaded", function () {
    const uploadform = document.getElementById('form-upload');
    const titleInput = document.getElementById('titleInput');
    const descriptionInput = document.getElementById('descriptionInput');
    const uploadPostContainer = document.querySelector('.uploadPosts');
    const postsContainer = document.querySelector('.posts');

    let posts = JSON.parse(localStorage.getItem("posts"));
    if (!posts) {
        fetchPosts();
    } else {
        displayPosts(posts);
    }

    async function fetchPosts() {
        try {
            const response = await fetch('data/posts.json');
            const postsData = await response.json();
            localStorage.setItem("posts", JSON.stringify(postsData));
            posts = postsData;
            displayPosts(posts);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
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
        fetchPosts();
        event.preventDefault();

        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();

        if (title) {
            const lastId = Math.max(...posts.map(p => p.id), 0); // fallback se estiver vazio
            const newPost = {
                id: lastId + 1,
                nome: title,
                createdAt: new Date().toLocaleDateString("pt-PT"),
                descricao: description,
                author: "Nelson",
                body: "Body of post",
                image_url: "posts/1.png"
            };

            posts.push(newPost);
            localStorage.setItem("posts", JSON.stringify(posts));
            displayPosts(posts); // atualiza a lista inteira com o novo post incluído

            // limpa os campos do formulário
            titleInput.value = '';
            descriptionInput.value = '';
        } else {
            alert("Please enter a valid name.");
        }
    });
});
