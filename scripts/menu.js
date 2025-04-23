document.addEventListener("DOMContentLoaded", function () {
    // Define custom menu component
    class MyCustomMenu extends HTMLElement {
        connectedCallback() {
            // Insert HTML content for the menu
            this.innerHTML = `
                <nav class="navbar">
                    <div class="logo-container" id="logo-container">
                        <div class="paw-icon"><img src="icons/paw-icon2.png" alt="Paw Icon"></div>
                        <h1 class="logo-text">PetConnect</h1>
                    </div>
                    <button class="menu-btn" id="menu-btn">&#9776;</button>
                    <div class="navbar-links">
                        <a href="home.html" id="home-button">Home</a>
                        <a href="search.html" id="search-button">Search</a>
                        <a href="uploadPost.html" id="upload-button">Upload</a>
                        <button id="theme-toggle">Switch to Dark Mode</button>
                    </div>
                </nav>`;
            
            // Call loadMenu() to initialize the menu and event listeners
            loadMenu();
        }
    }

    // Register the custom element with the tag 'my-custom-menu'
    customElements.define('my-custom-menu', MyCustomMenu);
});

// Function to load the menu and setup event listeners
function loadMenu() {
    const homeButton = document.getElementById('home-button');
    const searchButton = document.getElementById('search-button');
    const uploadButton = document.getElementById('upload-button');
    console.log("Menu buttons loaded!");

    const currentPath = window.location.pathname.split('/').pop(); // Extract the filename

    // Check if the current page is "home.html"
    if (currentPath === 'home.html') {
        homeButton.classList.add('active'); // Add the 'active' class
    }
    if (currentPath === 'search.html') {
        searchButton.classList.add('active'); // Add the 'active' class
    }
    if (currentPath === 'uploadPost.html') {
        uploadButton.classList.add('active'); // Add the 'active' class
    }

    const logo = document.querySelector('#logo-container');
    if (logo) {
        logo.addEventListener('click', () => {
            const paw = document.querySelector('.paw-icon');
            if (paw) {
                paw.style.transform = 'scale(1.1) rotate(15deg)';
                setTimeout(() => {
                    paw.style.transform = 'scale(1)';
                }, 300);

                console.log("Logo clicked! 🐾");
            } else {
                console.error("Paw icon not found.");
            }
        });
    } else {
        console.error("Logo container not found.");
    }

    const menuBtn = document.getElementById("menu-btn");
    const navbarLinks = document.querySelector(".navbar-links");

    if (menuBtn) {
        menuBtn.addEventListener("click", function () {
            navbarLinks.classList.toggle("active");
        });
    } else {
        console.error("menuBtn is null! Check your HTML for id='menu-btn'");
    }

    const themeToggleButton = document.getElementById("theme-toggle");

    // Check if dark mode is set in localStorage
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        themeToggleButton.textContent = "Switch to Light Mode";
    }

    // Toggle theme on button click
    themeToggleButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        // Save theme preference to localStorage
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            themeToggleButton.textContent = "Switch to Light Mode";
            console.log("dark mode on");
        } else {
            localStorage.removeItem("theme");
            console.log("light mode on");
            themeToggleButton.textContent = "Switch to Dark Mode";
        }
    });
}
