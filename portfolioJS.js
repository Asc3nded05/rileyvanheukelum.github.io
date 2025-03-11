// Get the lightbox elements
var lightbox = document.getElementById('lightbox');
var lightboxImage = document.getElementById('lightboxImage');
var closeBtn = document.getElementsByClassName('close')[0];
var zoomInBtn = document.getElementById('zoomIn');
var zoomOutBtn = document.getElementById('zoomOut');
var scale = 1;
var minScale = 1; // Minimum scale to prevent zooming out more than the default size
var maxScale; // Maximum scale to prevent zooming in too much
var zoomInterval; // Interval for continuous zooming

// Function to open the lightbox
function openLightbox(src) {
    lightbox.style.display = 'flex'; // Change to flex to match the CSS
    lightboxImage.src = src;
    scale = 1; // Reset scale
    lightboxImage.style.transform = 'scale(1)'; // Reset transform

    // Calculate the maximum scale based on the container's width and the image's natural width
    lightboxImage.onload = function() {
        var containerWidth = lightboxImage.parentElement.clientWidth;
        var imageNaturalWidth = lightboxImage.naturalWidth;
        maxScale = imageNaturalWidth;
        if (maxScale < 1) {
            maxScale = 1; // Ensure maxScale is at least 1
        }
    };
}

// Function to close the lightbox
closeBtn.onclick = function() {
    lightbox.style.display = 'none';
}

// Close the lightbox when clicking outside of the image
lightbox.onclick = function(event) {
    if (event.target == lightbox) {
        lightbox.style.display = 'none';
    }
}

// Zoom in function
function zoomIn() {
    if (scale < maxScale) {
        scale += 0.1;
        if (scale > maxScale) {
            scale = maxScale;
        }
        updateTransform();
    }
}

// Zoom out function
function zoomOut() {
    if (scale > minScale) {
        scale -= 0.1;
        if (scale < minScale) {
            scale = minScale;
        }
        updateTransform();
    }
}

// Start continuous zoom in
zoomInBtn.onmousedown = function() {
    zoomInterval = setInterval(zoomIn, 100);
}

// Start continuous zoom out
zoomOutBtn.onmousedown = function() {
    zoomInterval = setInterval(zoomOut, 100);
}

// Stop continuous zoom
zoomInBtn.onmouseup = zoomOutBtn.onmouseup = function() {
    clearInterval(zoomInterval);
}

// Stop continuous zoom if mouse leaves the button
zoomInBtn.onmouseleave = zoomOutBtn.onmouseleave = function() {
    clearInterval(zoomInterval);
}

// Update the transform property for zooming
function updateTransform() {
    lightboxImage.style.transform = 'scale(' + scale + ')';
}

// Ensure the lightbox is hidden on page load
document.addEventListener('DOMContentLoaded', function() {
    lightbox.style.display = 'none';
});




document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting

    // Get form values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    // Basic validation
    if (name === '' || email === '' || message === '') {
        alert('Please fill in all fields.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // If validation passes
    alert('Form submitted successfully!');
});

// Email validation function
function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}