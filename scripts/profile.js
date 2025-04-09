import { getPosts } from "./api.js";

document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById('searchForm');
    const usernameInput = document.getElementById('username');
    const recentSearch = document.getElementById('recentSearch');
    const profileContainer = document.querySelector('.profile-data');
    const postsContainer = document.querySelector('.posts');

    let recentSearchSaved = localStorage.getItem("recentSearch");
    if (recentSearchSaved) {
        recentSearchSaved = JSON.parse(recentSearchSaved);
        displayRecentSearch(recentSearchSaved);
    } else {
        recentSearchSaved = [];
    }

    // Retrieve username from localStorage and fetch associated posts
    const usernameSaved = JSON.parse(localStorage.getItem("username"));
    if (usernameSaved) {
        console.log("local storage username:", usernameSaved);
        fetchPostsByAuthor(usernameSaved);
    }

    // Function to fetch posts and filter by author
    async function fetchPostsByAuthor(author) {
        try {
            const posts = await getPosts(); // Use your existing getPosts function
            const filteredPosts = posts.filter(post => post.Author && post.Author.toLowerCase() === author.toLowerCase());
            console.log(filteredPosts)

            if (filteredPosts.length > 0) {
                displayAuthorProfile(author);
                displayPosts(filteredPosts);
            } else {
                profileContainer.innerHTML = `<p>No posts found for author "${author}".</p>`;
                postsContainer.innerHTML = '';
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }

    // Function to display the author's profile (simulated using the author name)
    function displayAuthorProfile(author) {
        profileContainer.innerHTML = '';

        const profileCard = document.createElement('div');
        profileCard.classList.add('profile-card');

        const profileName = document.createElement('h2');
        profileName.textContent = `Author: ${author}`;
        profileCard.appendChild(profileName);

        profileContainer.appendChild(profileCard);
    }

    // Function to display posts
    function displayPosts(posts) {
        postsContainer.innerHTML = ''; // Clear previous posts
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

            postsContainer.appendChild(postContainer);
        });
    }

    // Function to display recent searches
    function displayRecentSearch(searchList) {
        recentSearch.innerHTML = ''; // Clear previous content
        const recentSearchData = document.createElement('p');
        recentSearchData.textContent = `Recent Searches: ${searchList.join(', ')}`;
        recentSearch.appendChild(recentSearchData);
    }

    // Event listener for form submission
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = usernameInput.value.trim();
        if (username) {
            // Save recent searches in localStorage
            if (!recentSearchSaved.includes(username)) {
                recentSearchSaved.push(username);
                localStorage.setItem("recentSearch", JSON.stringify(recentSearchSaved));
            }
            localStorage.setItem("username", JSON.stringify(username));

            fetchPostsByAuthor(username);
            displayRecentSearch(recentSearchSaved);
        } else {
            alert("Please enter a valid name.");
        }
    });
});
