const overlay = document.getElementById('overlay');
const toggleButton = document.createElement('button');
const arrowButton = document.createElement('button');

// Toggle Button
toggleButton.textContent = 'On';
toggleButton.style.position = 'fixed';
toggleButton.style.bottom = '20px';
toggleButton.style.right = '20px';
toggleButton.style.width = '50px';
toggleButton.style.height = '50px';
toggleButton.style.borderRadius = '50%';
toggleButton.style.backgroundColor = '#4CAF50';
toggleButton.style.color = 'white';
toggleButton.style.border = 'none';
toggleButton.style.cursor = 'pointer';
toggleButton.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
toggleButton.style.opacity = '0.5';  // Less visible

// Arrow Button
arrowButton.innerHTML = '&#x2192;';  // Arrow symbol
arrowButton.style.position = 'fixed';
arrowButton.style.bottom = '20px';
arrowButton.style.right = '-50px';  // Hidden initially
arrowButton.style.width = '50px';
arrowButton.style.height = '50px';
arrowButton.style.borderRadius = '50%';
arrowButton.style.backgroundColor = '#4CAF50';
arrowButton.style.color = 'white';
arrowButton.style.border = 'none';
arrowButton.style.cursor = 'pointer';
arrowButton.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
arrowButton.style.display = 'none';  // Hidden initially

document.body.appendChild(toggleButton);
document.body.appendChild(arrowButton);

let confettiEnabled = localStorage.getItem('confettiEnabled') === 'true';
let longPressTimeout;

// Function to update button and overlay state
function updateButtonAndOverlay() {
    toggleButton.textContent = confettiEnabled ? 'On' : 'Off';
    toggleButton.style.backgroundColor = confettiEnabled ? '#4CAF50' : '#FF5733';
    overlay.style.pointerEvents = confettiEnabled ? 'auto' : 'none';
}

// Function to generate confetti
function triggerConfetti(e) {
    if (!confettiEnabled) return;

    function random(max) {
        return Math.random() * max;
    }

    const c = document.createElement('div');
    c.classList.add('click-confetti');
    c.style.top = e.clientY + 'px';
    c.style.left = e.clientX + 'px';

    for (let i = 0; i < 100; i++) {
        const el = document.createElement("i");
        el.style.transform = 'translate3d(' + (random(500) - 250) + 'px, ' + (random(200) - 150) + 'px, 0) rotate(' + random(360) + 'deg)';
        el.style.background = `hsla(${random(360)},100%,50%,1)`;
        c.appendChild(el);
    }

    document.body.appendChild(c);

    setTimeout(function() {
        c.remove();  // Remove the confetti element
    }, 700);
}

// Add click listener to overlay
overlay.addEventListener('click', function(e) {
    if (confettiEnabled) {
        triggerConfetti(e);
        e.stopPropagation();  // Stop the click from propagating further
        clearTimeout(confettiTimeout);
        overlay.style.pointerEvents = 'none';  // Temporarily disable overlay
        confettiTimeout = setTimeout(() => {
            overlay.style.pointerEvents = 'auto';  // Re-enable overlay
        }, 10);
    }
});

// Add click listener to document
document.addEventListener('click', function(e) {
    if (confettiEnabled) {
        triggerConfetti(e);
        setTimeout(() => {
            overlay.style.pointerEvents = 'auto';  // Re-enable overlay for the next click
        }, 10);
    }
});

// Add click listener to the toggle button
toggleButton.addEventListener('click', function() {
    confettiEnabled = !confettiEnabled;
    localStorage.setItem('confettiEnabled', confettiEnabled);
    updateButtonAndOverlay();

    // Trigger confetti once when turning on
    if (confettiEnabled) {
        const rect = toggleButton.getBoundingClientRect();
        triggerConfetti({ clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 });
    }
});

// Long press to hide the button
toggleButton.addEventListener('mousedown', function() {
    longPressTimeout = setTimeout(() => {
        toggleButton.style.display = 'none';  // Hide the button
        arrowButton.style.display = 'block';  // Show the arrow button
    }, 1000);  // Long press duration (1 second)
});

toggleButton.addEventListener('mouseup', function() {
    clearTimeout(longPressTimeout);
});

// Show toggle button again when clicking arrow button
arrowButton.addEventListener('click', function() {
    toggleButton.style.display = 'block';  // Show the button again
    arrowButton.style.display = 'none';  // Hide the arrow button
});

// Initial setup
updateButtonAndOverlay();
