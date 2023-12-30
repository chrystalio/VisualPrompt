const apiKey = "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";

const maxImages = 4;
let selectedImageNumber = null;

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