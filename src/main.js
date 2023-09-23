import { BREEDS } from "./breeds.js";
import { getRandomElement, shuffleArray, getMultipleChoices } from "./utils.js";

const nextDogBtn = document.querySelector(".quiz__next-dog");

const RANDOM_IMG_ENDPOINT = "https://dog.ceo/api/breeds/image/random";

function getBreedFromURL(url) {
    let [, , , , breed] = url.split("/");
    if (breed.includes("-")) {
        breed = breed.split("-").reverse().join(" ");
    }
    return breed;
}

async function fetchMessage(url) {
    const response = await fetch(url);
    const { message } = await response.json();
    return message;
}

function renderButtons(choicesArray, correctAnswer) {
    function buttonHandler(e) {
        if (e.target.value === correctAnswer) {
            e.target.classList.add("correct");
        } else {
            e.target.classList.add("incorrect");
            document
                .querySelector(`button[value="${correctAnswer}"]`)
                .classList.add("correct");
        }
    }

    const options = document.getElementById("options"); 

    for (let choice of choicesArray) {
        const btn = document.createElement("button");
        btn.name = choice;
        btn.value = choice;
        btn.textContent = choice;
        btn.addEventListener("click", buttonHandler);
        options.prepend(btn);
    }

}

function renderQuiz(imgUrl, correctAnswer, choices) {
    const image = document.createElement("img");
    image.setAttribute("src", imgUrl);
    const frame = document.getElementById("image-frame");

    image.addEventListener("load", () => {
        frame.replaceChildren(image);
        renderButtons(choices, correctAnswer);
    });

    nextDogBtn.addEventListener("click", (event) => {
        location.reload();
    })
}

async function loadQuizData() {
    document.getElementById("image-frame").textContent = "Fetching dog...";

    const dogImgUrl = await fetchMessage(RANDOM_IMG_ENDPOINT);
    const correctBreed = getBreedFromURL(dogImgUrl);
    const breedChoices = getMultipleChoices(3, correctBreed, BREEDS);

    return [dogImgUrl, correctBreed, breedChoices];
}

const data = await loadQuizData();
renderQuiz(...data);
