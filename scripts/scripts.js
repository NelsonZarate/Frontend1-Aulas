function getYear() {
    // Get the current year
    const date = new Date();
    const year = date.getFullYear();
    // Display the current year in the 
    return year;
}

document.addEventListener("DOMContentLoaded", function () {
    // Define custom menu component
    class CustomFooter extends HTMLElement {
        year = getYear();
        connectedCallback() {
            // Insert HTML content for the menu
            this.innerHTML = `
                <footer><p>© ${this.year} PetConnect | Made with ❤️ for pets</p></footer>`;
        }
    }

    // Register the custom element with the tag 'my-custom-menu'
    customElements.define('my-custom-footer', CustomFooter);
});
