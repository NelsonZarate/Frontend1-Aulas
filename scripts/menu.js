// menu.js

document.addEventListener("DOMContentLoaded", function () {
    // Select the container where the menu will be injected
    const menuContainer = document.querySelector('.menu-placeholder');

    // Fetch the menu HTML
    fetch('menu.html')
        .then(response => response.text())
        .then(data => {
            menuContainer.innerHTML = data; // Inject the menu HTML into the container
        }).then(() => {
            // Check if the logo container element exists
            const logo = document.querySelector('#logo-container');

            if (logo) {
                // Attach click event listener to the logo container
                logo.addEventListener('click', () => {
                    const paw = document.querySelector('.paw-icon');

                    // Check if the paw element exists
                    if (paw) {
                        // Apply the transform effect (scale and rotate)
                        paw.style.transform = 'scale(1.1) rotate(15deg)';

                        // Reset the transform after 300ms
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
        }

        )
        .catch(error => {
            console.error('Error loading the menu:', error);
        });


});
