
let animal = {
    id:1,
    name:"Puppy",
    species:"Dog",
    race:"Golden",
    gender:"Male"
}

let profile = {
    id:1,
    name : "Nelson",
    gender :"Male",
    createdAt : "02-04-2025",
    descricao : "Descrição",
    author : "Author",
    body : "Body"
}
const MyPets = [animal]

document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch posts from the JSON file
    async function fetchPosts() {
        try {
            const response = await fetch('posts.json');
            const posts = await response.json(); 
            // Now display the posts
            displayPosts(posts);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }

    // Function to display the posts
    function displayPosts(posts) {
        const postsContainer = document.querySelector('.posts');

        posts.forEach(post => {
            const postContainer = document.createElement('div');
            postContainer.classList.add('post');
            console.log(post);
            // Create and append post title
            const postTitle = document.createElement('h4');
            postTitle.textContent = post.nome;
            postContainer.appendChild(postTitle);

            // Create and append post description
            const postDescription = document.createElement('p');
            postDescription.textContent = post.descricao;
            postContainer.appendChild(postDescription);

            // Create and append post body
            const postBody = document.createElement('p');
            postBody.textContent = post.body;
            postContainer.appendChild(postBody);

            // Create and append post image if it exists
            if (post.image_url) {
                const postImage = document.createElement('img');
                postImage.src = post.image_url;
                postImage.alt = "Post Image";
                postContainer.appendChild(postImage);
            }

            // Append the post container to the posts container
            postsContainer.appendChild(postContainer);
        });
    }

    // Call the fetch function to load posts on page load
    fetchPosts();
});

