// community2.js

// Display the stored post from local storage when the page is loaded
window.onload = function() {
    // Retrieve the stored post from localStorage
    var userPost = localStorage.getItem('userPost');

    // Check if there is a post stored in localStorage
    if (userPost) {
        // Display the user's post in the 'userPostOutput' div
        document.getElementById('userPostOutput').innerText = userPost;
    } else {
        // If no post is found, show a message saying no posts are available
        document.getElementById('userPostOutput').innerText = "No posts available.";
    }
};
