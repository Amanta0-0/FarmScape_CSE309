// Set active class dynamically based on the current page
document.addEventListener("DOMContentLoaded", function() {
    const currentPage = window.location.pathname.split("/").pop(); // Get the current page name
    const sidebarLinks = document.querySelectorAll(".sidebar nav ul li a");

    sidebarLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active"); // Add active class to the correct link
        } else {
            link.classList.remove("active"); // Remove active class from others
        }
    });

    // Language change feature
    document.getElementById('languageButton').addEventListener('click', function() {
        alert('Language change feature coming soon!');
    });

    // Search functionality
    document.getElementById('searchBox').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            alert('Searching for: ' + this.value);
        }
    });

    // Consultation form submission
    document.querySelector('.consultation-form').addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent form submission
        alert('Your consultation request has been submitted successfully!');
        this.reset();  // Reset the form after submission
    });
});
