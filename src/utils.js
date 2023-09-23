function getRandomElement(array) {
    const i = Math.floor(Math.random() * array.length);
    return array[i];
}

function shuffleArray(array) {
    return array.sort((a, b) => Math.random() - 0.5);
}

function getMultipleChoices(n, correctAnswer, possibleChoices) {
    const possibleAnswers = [correctAnswer];
    while (possibleAnswers.length < n) {
        let randomChoice = getRandomElement(possibleChoices);
        if (!possibleAnswers.includes(randomChoice)) {
            possibleAnswers.push(randomChoice);
        }
    }
    return shuffleArray(possibleAnswers);
}

export {getRandomElement, shuffleArray, getMultipleChoices};
