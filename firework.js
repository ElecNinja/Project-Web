function execute_fireworks(firework) {
    // Set the trail and explosion file paths
    const trailFile = "./firework-trail.webp";
    const explosionFile = "./firework-explosion.webp";

    // Function to randomize position
    const randomizePosition = () => {
        const xpos = Math.floor(Math.random() * 80) + 5;
        const ypos = 95;
        firework.style.top = ypos + "%";
        firework.style.left = xpos + "%";
    };

    randomizePosition();

    // Set the firework trail image
    firework.firstElementChild.src = trailFile;

    // Make the firework visible
    firework.style.display = "inline-block";

    // Randomize hue rotation for random color values
    const hue = Math.floor(Math.random() * 360) + 1;
    firework.style.filter = "hue-rotate(" + hue + "deg)";

    // Animation variables
    let id = null;
    const height = Math.floor(Math.random() * 60) + 15;
    let ypos = 95;
    clearInterval(id);

    // Start the animation
    id = setInterval(frame, 20);

    function frame() {
        if (ypos <= height) {
            clearInterval(id);
            firework.firstElementChild.src = explosionFile; // Use explosion file
        } else {
            ypos--;
            firework.style.top = ypos + "%";
            // Adjust trail height using clip-path
            const progress = (95 - ypos) / (95 - height);
            firework.firstElementChild.style.clipPath = `inset(${(1 - progress) * 100}% 0 0 0)`;
        }
    }
}

// Firework execution loop
let counter = 0;
for (let firework of document.getElementsByClassName("firework")) {
    const timeout = 2000 * counter;
    counter++;
    setTimeout(() => {
        execute_fireworks(firework);
        setInterval(execute_fireworks, 5000, firework);
    }, timeout);
}
