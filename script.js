let searchButton = document.getElementById('searchButton');
let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
let isListening = false;

recognition.onresult = function(event) {
    performSearch(event.results[0][0].transcript);
};

recognition.onend = function() {
    if (isListening) {
        isListening = false;
        resetButton();
    }
};

searchButton.addEventListener('click', function() {
    if (!isListening) {
        isListening = true;
        searchButton.classList.add('recording');
        searchButton.innerText = 'Record';
        recognition.start();
    } else {
        recognition.stop();
    }
});

function performSearch(query) {
    searchButton.classList.add('searching');
    searchButton.innerText = 'Searching...';
    window.open(`https://google.com/search?q=${encodeURIComponent(query)}`, '_blank');
}

function resetButton() {
    searchButton.classList.remove('recording', 'searching');
    searchButton.innerText = 'Search';
}
