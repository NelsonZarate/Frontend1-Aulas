document.addEventListener("DOMContentLoaded", function() {
    const menuBtn = document.getElementById("menu-btn");
    const navbarLinks = document.querySelector(".navbar-links");

    menuBtn.addEventListener("click", function() {
        navbarLinks.classList.toggle("active");
    });
});
