export function openModal(content) {
    const modal = document.getElementById("modal");
    const modalBody = document.getElementById("modal-body");
    const closeButton = modal.querySelector(".close-button");

    // Populate the modal with content
    modalBody.innerHTML = ""; // Clear previous content
    modalBody.appendChild(content);

    // Show the modal
    modal.classList.remove("hidden");

    // Close modal on close button click
    closeButton.addEventListener("click", () => closeModal(modal));

    // Close modal on outside click
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal(modal);
        }
    });
}

export function closeModal() {
    const modal = document.getElementById("modal");
    modal.classList.add("hidden");
}