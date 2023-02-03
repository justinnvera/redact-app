// ! Input Elements
let originalText = document.getElementById("originalText");
let redactWords = document.getElementById("redactedWords");
let textDisplay = document.getElementById("textDisplay");
let redactEmailsSelect = document.getElementById("redact-email-addresses"); 
let redactUrlsSelect = document.getElementById("redact-urls");

function redact() {
    // ! checks the "full text" against the "text to redact"
    let originalTextArray = originalText.value.split(' '); //  creates an array of strings of the full text
    let redactedWordsArray = redactWords.value.split(','); //  creates an array of strings of the text to redact
    let letterCount = 0; //  initializes the lettercount for the redactWords
    let originalTextLetters; //  used for joining back the letters after each letter is redacted. see "! redacting mechanism"
    let emailLetterCount = 0; //  intializes the lettercount for any emails in the original text
    let emailTextLetters; //  used for joining back after each letter is redacted. see "! redacting mechanism" --> "? Email Check"
    let urlLetterCount = 0;
    let urlTextLetters;

    // ! redacting mechanism
    for (let a = 0; a < originalTextArray.length; a++) {
        originalTextLetters = originalTextArray[a].split('');

        let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
        let emailString = originalTextArray[a];
        let emailResult = emailRegex.test(emailString);     



        let urlRegex = /^(https?:\/\/|www\.)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        let urlString = originalTextArray[a];
        let urlResult = urlRegex.test(urlString);

        // ? Redacted Words Check
        for (let b = 0; b < redactedWordsArray.length; b++) {
            if (originalTextArray[a] === redactedWordsArray[b]) {
                letterCount = originalTextArray[a].length;
                for (let l = 0; l < letterCount; l++) {
                    originalTextLetters[l] = "\u2588";
                }
                originalTextArray[a] = originalTextLetters.join('');
            } else {
                originalTextLetters = [];   
            }
        }

        // ? Email Check
        if (redactEmailsSelect.value === "true") {
            if (originalTextArray[a].includes("@gmail.com") === true || 
            originalTextArray[a].includes("@outlook.com") === true || 
            originalTextArray[a].includes("@protonmail.com") === true || 
            originalTextArray[a].includes("@yahoo.com") === true || 
            originalTextArray[a].includes("@icloud.com") === true || 
            emailResult === true) {
                emailTextLetters = originalTextArray[a].split(' ');
                emailLetterCount = originalTextArray[a].length;
                for (let l = 0; l < emailLetterCount; l++) {
                    emailTextLetters[l] = "\u2588";
                }
                originalTextArray[a] = emailTextLetters.join('');
            } 
            else if (originalTextArray[a].includes("@gmail.com") === false && 
            originalTextArray[a].includes("@outlook.com") === false && 
            originalTextArray[a].includes("@protonmail.com") === false && 
            originalTextArray[a].includes("@yahoo.com") === false && 
            originalTextArray[a].includes("@icloud.com") === false &&
            emailResult === false) {
                emailTextLetters = [];
            }
        } else if (redactEmailsSelect.value === "false") {
            emailTextLetters = [];
        }
        // ? Url Check
        if (redactUrlsSelect.value === "true") {
            if (urlResult === true) {
                urlTextLetters = originalTextArray[a].split(' ');
                console.log(urlTextLetters);    
                urlLetterCount = originalTextArray[a].length;
                for (let l = 0; l < urlLetterCount; l++) {
                    urlTextLetters[l] = "\u2588";
                }
                originalTextArray[a] = urlTextLetters.join('');
            }
        } else {
            urlTextLetters = [];
        }
    }   
    // ! displays the redacted text: 
    textDisplay.value = originalTextArray.join(' ');
}
