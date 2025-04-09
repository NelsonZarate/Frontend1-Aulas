function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener("DOMContentLoaded", async function () {
    const welcomeTitle = document.getElementById("welcome-title");
    const rightAnimation = document.getElementById("right-animation");

    // Show the right animation when the title is clicked
    welcomeTitle.addEventListener("click", async function () {
        if (rightAnimation.style.opacity === "0" || rightAnimation.style.display === "") {
            rightAnimation.style.opacity = "1"; // Show the animation
            await wait(500);
            welcomeTitle.classList.add("animate__hinge");
            await wait(2000);
            window.location.href = "home.html";
        } else {
            rightAnimation.style.opacity = "0"; // Hide the animation
        }
    });
});