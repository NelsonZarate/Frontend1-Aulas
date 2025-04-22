
document.addEventListener("DOMContentLoaded", function () {

    loadMenu();

});

function loadMenu() {
    // Select the container where the menu will be injected
    const menuContainer = document.querySelector('.menu-placeholder');


    // Fetch the menu HTML
    fetch('menu.html')
        .then(response => response.text())
        .then(data => {
            menuContainer.innerHTML = data; // Inject the menu HTML into the container

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
            if (currentPath === 'upload.html') {
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
            console.log("menuBtn is:", menuBtn);

            const navbarLinks = document.querySelector(".navbar-links");

            if (menuBtn) {
                menuBtn.addEventListener("click", function () {
                    navbarLinks.classList.toggle("active");
                });
            } else {
                console.error("menuBtn is null! Check your HTML for id='menubtn'");
            }
        })
        .catch(error => {
            console.error('Error loading the menu:', error);
        });
}