
document.addEventListener("DOMContentLoaded", () => {

    const breedForm = document.getElementById("breed-dog-form");
    const resultDiv = document.getElementById("dog-result");
    const breedInput = document.getElementById("breed-dog-input");
    
    const randomDogButton = document.getElementById("RandomDogButton");
    const randomDogResult = document.getElementById("imageUrl");
    breedForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Get the latest value of the breed input
        const breed = breedInput.value.trim();
        if (!breed) {
            resultDiv.innerHTML = `<p>Please enter a breed name.</p>`;
            return;
        }

        try {
            // Fetch dog image from API
            const response = await fetch(
                `https://dog.ceo/api/breed/${breed}/images/random`
            );
            const data = await response.json();

            if (!response.ok || data.status !== "success") {
                throw new Error("Breed not found");
            }

            // Display dog image
            const dogImage = document.createElement("img");
            dogImage.src = data.message;
            dogImage.alt = `Dog of breed ${breed}`;
            dogImage.style.maxWidth = "100%";

            resultDiv.innerHTML = ""; 
            resultDiv.appendChild(dogImage); 
        } catch (error) {
            console.error("Error fetching dog image:", error);
            resultDiv.innerHTML = `<p>Error fetching dog image. Please try again.</p>`;
        }
    });

    randomDogButton.addEventListener("click", async (event) => {
        event.preventDefault();
        console.log("Random dog button clicked");
        try {
            const response = await fetch(`https://dog.ceo/api/breeds/image/random`);
            const data = await response.json();

            if (!response.ok || data.status !== "success") {
                throw new Error("Error fetching random dog image");
            }
            console.log(data);
            randomDogResult.value = "";
            randomDogResult.value = data.message;

        } catch (error) {
            console.error("Error fetching random dog image:", error);
            randomDogResult.innerHTML = `<p>Error fetching random dog image. Please try again.</p>`;
        }
    });
});