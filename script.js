let searchButton = document.getElementById('searchButton');
let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
let isListening = false;

recognition.onstart = function() {
    isListening = true;
    searchButton.classList.add('recording');
    searchButton.innerText = 'Record';
    searchButton.style.backgroundColor = '#f44336'; // Turn the button red
};

recognition.onend = function() {
    isListening = false;
    searchButton.classList.remove('recording');
    searchButton.style.backgroundColor = ''; // Reset the button color
    searchButton.innerText = 'Search';
};

recognition.onresult = function(event) {
    let transcript = event.results[0][0].transcript;
    performSearch(transcript);
};

searchButton.addEventListener('click', function() {
    if (!isListening) {
        recognition.start();
    } else {
        recognition.stop();
    }
});

function performSearch(query) {
    window.open(`https://google.com/search?q=${encodeURIComponent(query)}`, '_blank');
}
