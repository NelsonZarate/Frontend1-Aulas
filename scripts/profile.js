document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const recentSearch = document.getElementById('recentSearch');
    const profileContainer = document.querySelector('.profile-data');
    const postsContainer = document.querySelector('.posts');

    let recentSearchSaved = localStorage.getItem("recentSearch");
    if (recentSearchSaved) {
        recentSearchSaved = JSON.parse(recentSearchSaved);
        displayRecentSearch(recentSearchSaved)
    } else {
        recentSearchSaved = {};
    }

    // Retrieve username from localStorage and fetch associated profiles and posts
    const usernameSaved = JSON.parse(localStorage.getItem("username"));
    if (usernameSaved) {
        console.log("local storage username:",usernameSaved)
        fetchProfilesAndPosts(usernameSaved);
    }

    // Function to fetch profiles and posts from the JSON files
    async function fetchProfilesAndPosts(username) {
        try {
            const responseProfile = await fetch('data/profile.json');
            const profiles = await responseProfile.json();

            const responsePosts = await fetch('data/posts.json');
            const posts = await responsePosts.json();

            const profile = profiles.find(p => p.name.toLowerCase() === username.toLowerCase());
            if (profile) {
                displayProfiles(profile);
                postsContainer.innerHTML = '';
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

    function displayProfiles(profile) {
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

    function displayRecentSearch(searchList) {
        // Clear the previous content in the recentSearch container (if needed)
        recentSearch.innerHTML = '';
        console.log("recent search function:",searchList)
        // Loop through each item in the searchList array
            const recentSearchData = document.createElement('p'); // Create a <p> element for each search name
            recentSearchData.textContent = searchList; // Set the text content of the <p> to the search name
            recentSearch.appendChild(recentSearchData); // Append the <p> element to the 'recentSearch' cont
    }
    

    // Event listener for form submission
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = usernameInput.value.trim();
        let saveData = localStorage.getItem("recentSearch");
        console.log("username:",username);
        console.log("recent search saved data: ", saveData);
        if (username) {
            let savedData = [];
            
            // If there's a recent search, merge it with the new username
            if (saveData && Object.keys(saveData).length > 0) {
                savedData = [
                    username, 
                    JSON.parse(saveData)
                ];
            } else {
                savedData = username;  // Just save the username if no recent search exists
            }

            // Save the combined data in localStorage
            localStorage.setItem("recentSearch", JSON.stringify(savedData));
            localStorage.setItem("username", JSON.stringify(username));

            fetchProfilesAndPosts(username);
            displayRecentSearch(savedData)
        } else {
            alert("Please enter a valid name.");
        }
    });
});
