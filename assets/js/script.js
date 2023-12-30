const apiKey = "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";

const maxImages = 3;

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function disableGenerateButton() {
    document.getElementById("generate-btn").disabled = true;
}

function enableGenerateButton() {
    document.getElementById("generate-btn").disabled = false;
}

function clearImageGrid() {
    const imageGrid = document.getElementById("image-grid");
    imageGrid.innerHTML = "";
}

async function generateImages(input) {
    disableGenerateButton();
    clearImageGrid();

    const loading = document.getElementById("loading");
    loading.classList.remove("hidden");

    const imageUrls = [];

    for (let i = 0; i < maxImages; i++) {
        const randomNumber = getRandomNumber(1, 10000);
        const prompt = `{${input}} ${randomNumber}`;

        // Introduce a delay between API calls
        await delay(1000); // Adjust the delay time as needed

        const response = await fetch(
            "https://api-inference.huggingface.co/models/segmind/SSD-1B",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    inputs: prompt,
                }),
            }
        );

        if (!response.ok) {
            alert("Failed to generate image!");
        }

        const blob = await response.blob();
        const imgUrl = URL.createObjectURL(blob);
        imageUrls.push(imgUrl);

        const img = document.createElement("img");
        img.src = imgUrl;
        img.alt = `artwork-${i + 1}`;
        img.onclick = () => downloadImage(imgUrl, i);

        document.getElementById("image-grid").appendChild(img);
    }

    loading.classList.add("hidden");
    enableGenerateButton();
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.getElementById("generate-btn").onclick = () => {
    const input = document.getElementById("user-prompt").value;
    generateImages(input);
};

function downloadImage(url, imageNumber) {
    const link = document.createElement("a");
    link.href = url;
    link.download = `artwork-${imageNumber + 1}.png`;
    link.click();
}
