let searchButton = document.getElementById('searchButton');
let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
let isListening = false;

searchButton.addEventListener('click', function() {
    if (!isListening) {
        startRecording();
    } else {
        stopRecording();
    }
});

function startRecording() {
    isListening = true;
    searchButton.classList.add('recording');
    searchButton.innerText = 'Record';
    recognition.start();
}

function stopRecording() {
    isListening = false;
    recognition.stop();
    searchButton.classList.remove('recording');
    searchButton.classList.add('searching');
    searchButton.innerText = 'Searching...';
}

recognition.onresult = function(event) {
    let transcript = event.results[0][0].transcript;
    performSearch(transcript);
};

recognition.onend = function() {
    if (!isListening) {
        resetButton();
    }
};

function performSearch(query) {
    window.open(`https://google.com/search?q=${encodeURIComponent(query)}`, '_blank');
    resetButton();
}

function resetButton() {
    searchButton.classList.remove('searching');
    searchButton.innerText = 'Search';
}
