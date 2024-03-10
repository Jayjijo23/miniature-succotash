let searchButton = document.getElementById('searchButton');
let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
let isListening = false;

recognition.onresult = function(event) {
    let transcript = event.results[0][0].transcript;
    performSearch(transcript);
};

recognition.onend = function() {
    if (isListening) {
        toggleListening();
    }
};

searchButton.addEventListener('click', function() {
    if (!isListening) {
        toggleListening();
    }
});

function toggleListening() {
    if (!isListening) {
        isListening = true;
        searchButton.innerText = 'Record';
        recognition.start();
    } else {
        isListening = false;
        searchButton.innerText = 'Search';
        recognition.stop(); // Stop recording
    }
}

function performSearch(query) {
    window.open(`https://google.com/search?q=${encodeURIComponent(query)}`, '_blank');
}
