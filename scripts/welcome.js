document.addEventListener("DOMContentLoaded", function () {
    const welcomeTitle = document.getElementById("welcome-title");
    const rightAnimation = document.getElementById("right-animation");

    // Show the right animation when the title is clicked
    welcomeTitle.addEventListener("click", function () {
        rightAnimation.style.display = "block"; // Show the animation
    });
});