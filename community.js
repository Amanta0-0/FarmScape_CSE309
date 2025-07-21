// community.js

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Get references to the DOM elements
    const postButton = document.getElementById('outputButton');
    const userInput = document.getElementById('userInput');

    // Add event listener to the "Post Question/Experience" button
    postButton.addEventListener('click', function () {
        const inputValue = userInput.value.trim(); // Get the user's input value
        if (inputValue !== "") {
            // Save the user's input to localStorage
            localStorage.setItem('userPost', inputValue);
            // Redirect to the communityForum2.html page to display the post
            window.location.href = 'community2.html';
        } else {
            alert("Please enter a question or experience to post."); // Show an alert if input is empty
        }
    });
});
