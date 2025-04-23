document.addEventListener("DOMContentLoaded", function () {
    // Define custom menu component
    class CustomFooter extends HTMLElement {
        connectedCallback() {
            // Insert HTML content for the menu
            this.innerHTML = `
                <footer><p>© 2025 PetConnect | Made with ❤️ for pets</p></footer>`;
        }
    }

    // Register the custom element with the tag 'my-custom-menu'
    customElements.define('my-custom-footer', CustomFooter);
});
