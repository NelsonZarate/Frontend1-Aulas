document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const profileContainer = document.querySelector('.profile-data');
    const postsContainer = document.querySelector('.posts');

    // Function to fetch profiles and posts from the JSON files
    async function fetchProfilesAndPosts(username) {
        try {
            // Fetch profiles and posts
            const responseProfile = await fetch('data/profile.json');
            const profiles = await responseProfile.json();

            const responsePosts = await fetch('data/posts.json');
            const posts = await responsePosts.json();

            // Find the profile matching the username
            const profile = profiles.find(p => p.name.toLowerCase() === username.toLowerCase());
            if (profile) {
                // Display the profile
                displayProfiles(profile);
                postsContainer.innerHTML = '';
                // Filter and display posts related to the logged-in user
                const filteredPosts = posts.filter(post => post.author === profile.name);
                filteredPosts.forEach(post => {
                    displayPosts(post);
                });
            } else {
                console.error("Profile not found for:", username);
                alert("Profile not found, please check the name and try again.");
            }

        } catch (error) {
            console.error("Error fetching profiles or posts:", error);
        }
    }

    // Display the profile
    function displayProfiles(profile) {
        // Clear any existing profile data
        profileContainer.innerHTML = '';

        const profileCard = document.createElement('div');
        profileCard.classList.add('profile-card');

        const profileName = document.createElement('h2');
        profileName.textContent = profile.name;
        profileCard.appendChild(profileName);

        const profileGender = document.createElement('p');
        profileGender.textContent = `Gender: ${profile.gender}`;
        profileCard.appendChild(profileGender);

        const profileCreatedAt = document.createElement('p');
        profileCreatedAt.textContent = `Joined on: ${profile.createdAt}`;
        profileCard.appendChild(profileCreatedAt);

        const profileDescription = document.createElement('p');
        profileDescription.textContent = `Description: ${profile.descricao}`;
        profileCard.appendChild(profileDescription);

        const profileBody = document.createElement('p');
        profileBody.textContent = `Details: ${profile.body}`;
        profileCard.appendChild(profileBody);

        profileContainer.appendChild(profileCard);
    }

    // Display posts
    function displayPosts(post) {
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
    }

    // Event listener for form submission
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent page reload

        const username = usernameInput.value.trim();

        if (username) {
            fetchProfilesAndPosts(username);  // Fetch data for the logged-in user
        } else {
            alert("Please enter a valid name.");
        }
    });

});
