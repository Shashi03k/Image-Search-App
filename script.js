const accessKey = "pWV6Lb_Awh2UgWh92Zm_nZqfeFKtaHBXstyG3nXEYew";
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const imageContainer = document.getElementById("image-container");
const showMoreBtn = document.getElementById("show-more-btn");
const loadingIndicator = document.getElementById("loading");

let page = 1;
let query = "";

searchBtn.addEventListener("click", () => {
    query = searchInput.value;
    if (!query) return;
    page = 1;
    imageContainer.innerHTML = "";
    fetchImages();
});

showMoreBtn.addEventListener("click", () => {
    fetchImages();
});

async function fetchImages() {
    loadingIndicator.style.display = "block";
    showMoreBtn.style.display = "none";

    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=10&client_id=${accessKey}`);
        const data = await response.json();

        if (page === 1) imageContainer.innerHTML = ""; 

        data.results.forEach(photo => {
            const imageCard = document.createElement("div");
            imageCard.classList.add("image-card");
            imageCard.innerHTML = `
                <img src="${photo.urls.small}" alt="${photo.alt_description}">
                <p>${photo.alt_description}</p>
            `;
            imageContainer.appendChild(imageCard);
        });

        page++;

        if (data.results.length === 10) {
            showMoreBtn.style.display = "block";
        } else {
            showMoreBtn.style.display = "none";
        }

    } catch (error) {
        console.error("Error fetching images:", error);
    }

    loadingIndicator.style.display = "none";
}
