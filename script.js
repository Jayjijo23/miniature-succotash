let searchButton = document.getElementById('searchButton');
let recording = false;

searchButton.addEventListener('click', function() {
    if (!recording) {
        startRecording();
    } else {
        // Placeholder for stopping recording
        searchButton.innerText = 'Searching...';
        // Implement stopping of recording and searching
        performSearch("example search"); // Replace with actual search query
    }
});

function startRecording() {
    let recognition = new webkitSpeechRecognition();
    recognition.onresult = function(event) {
        let transcript = event.results[0][0].transcript;
        performSearch(transcript);
    };
    recognition.onerror = function(event) {
        alert('Error occurred in recognition: ' + event.error);
        resetButton();
    }
    recognition.start();
}

function performSearch(query) {
    window.open(`https://google.com/search?q=${encodeURIComponent(query)}`, '_blank');
    resetButton();
}

function resetButton() {
    recording = false;
    searchButton.innerText = 'Search';
    searchButton.style.backgroundColor = ''; // Reset or change color as needed
}