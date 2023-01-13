// ! Input Elements
let originalText = document.getElementById("originalText");
let redactWords = document.getElementById("redactedWords");
let textDisplay = document.getElementById("textDisplay");
let ignoreCapitals = document.getElementById("ignoreCapitals");

function redact() {
    // // ! did the user choose to ignore capitals?
    // if (ignoreCapitals.value === "yes") {
    //     // * if the user chose to IGNORE capitals: 
    //     console.log("The user chose to IGNORE capitals");
    //     console.log("Here is the original text with IGNORED capitals")
    //     originalText.style.textTransform = "lowercase";
    //     console.log(originalText.value);
    // } else {
    //     // * if the user chose to NOT IGNORE capitals: 
    //     console.log("The user chose to NOT IGNORE capitals");
    //     console.log("Here is the original text with capitals NOT IGNORED")
    //     console.log(originalText.value);
    // }
    // ! checks the "full text" against the "text to redact"
    let originalTextArray = originalText.value.split(' '); // * creates an array of strings of the full text
    let redactedWordsArray = redactWords.value.split(' '); // * creates an array of strings of the text to redact
    let letterCount = 0; // * initializes the lettercount for the redactWords
    let originalTextLetters; // * used for joining back the letters after each letter is redacted. see "! redacting mechanism"

    // ! redacting mechanism
    for (let a = 0; a < originalTextArray.length; a++) {
        originalTextLetters = originalTextArray[a].split('');
        for (let b = 0; b < redactedWordsArray.length; b++) {
            if (originalTextArray[a] === redactedWordsArray[b]) {
                letterCount = originalTextArray[a].length;
                for (let l = 0; l < letterCount; l++) {
                    originalTextLetters[l] = "\u2588";
                }
                originalTextArray[a] = originalTextLetters.join('')
            }
        }
    }    
    // ! displays the redacted text: 
    textDisplay.innerHTML = originalTextArray.join(' ');
}

