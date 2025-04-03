document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch profiles and posts from the JSON files
    async function fetchProfilesAndPosts() {
        try {
            const responseProfile = await fetch('src/data/profile.json');
            const profiles = await responseProfile.json();

            const responsePosts = await fetch('src/data/posts.json');
            const posts = await responsePosts.json();

            // Loop through the profiles and posts and display only posts that belong to the current profile
            profiles.forEach(profile => {
                // Display the profile
                displayProfiles(profile);

                // Filter posts based on the current profile's author
                const filteredPosts = posts.filter(post => post.author === profile.name);
                // Display the filtered posts
                filteredPosts.forEach(post => {
                    displayPosts(post);
                });
            });

        } catch (error) {
            console.error("Error fetching profiles or posts:", error);
        }
    }

    // Function to display the profile
    function displayProfiles(profile) {
        const profileContainer = document.querySelector('.profile-container');

        const profileCard = document.createElement('div');
        profileCard.classList.add('profile-card');

        // Create and append profile name
        const profileName = document.createElement('h2');
        profileName.textContent = profile.name;
        profileCard.appendChild(profileName);

        // Create and append profile gender
        const profileGender = document.createElement('p');
        profileGender.textContent = `Gender: ${profile.gender}`;
        profileCard.appendChild(profileGender);

        // Create and append profile creation date
        const profileCreatedAt = document.createElement('p');
        profileCreatedAt.textContent = `Joined on: ${profile.createdAt}`;
        profileCard.appendChild(profileCreatedAt);

        // Create and append profile description
        const profileDescription = document.createElement('p');
        profileDescription.textContent = `Description: ${profile.descricao}`;
        profileCard.appendChild(profileDescription);

        // Create and append profile body
        const profileBody = document.createElement('p');
        profileBody.textContent = `Details: ${profile.body}`;
        profileCard.appendChild(profileBody);

        // Append the profile card to the profile container
        profileContainer.appendChild(profileCard);
    }

    // Function to display the posts
    function displayPosts(post) {
        const postsContainer = document.querySelector('.posts');

        const postContainer = document.createElement('div');
        postContainer.classList.add('post');

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
    }

    // Call the fetch function to load both profiles and posts on page load
    fetchProfilesAndPosts();
});
