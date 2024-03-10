document.addEventListener('DOMContentLoaded', function() {
    var searchButton = document.getElementById('searchButton');
    var recognition;
    var listening = false;

    // Check if the browser supports the Web Speech API
    if (!('webkitSpeechRecognition' in window)) {
        alert('Your browser does not support speech recognition. Please try Chrome.');
        return;
    }

    // Create a new instance of webkitSpeechRecognition
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false; // Set to false for single-shot mode
    recognition.interimResults = false; // We don't need interim results for this use case

    // Define what happens when we have a result
    recognition.onresult = function(event) {
        var searchQuery = event.results[0][0].transcript;
        recognition.stop();
        performSearch(searchQuery);
    };

    // Define what happens when speech recognition ends
    recognition.onend = function() {
        resetButton();
    };

    searchButton.addEventListener('click', function() {
        if (listening) {
            // If already listening, stop the recognition
            recognition.stop();
            return;
        }
        
        // Start speech recognition
        recognition.start();
        listening = true;
        searchButton.classList.add('recording');
        searchButton.innerText = 'Record';
    });

    function performSearch(query) {
        searchButton.classList.add('searching');
        searchButton.innerText = 'Searching...';
        window.open(`https://google.com/search?q=${encodeURIComponent(query)}`, '_blank');
    }

    function resetButton() {
        listening = false;
        searchButton.classList.remove('recording', 'searching');
        searchButton.innerText = 'Search';
    }
});
