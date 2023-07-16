const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let particles = [];

const PARTICLE_COUNT = 1000;
const MASS_MAX = 1000;
const G = 10;
const TIME_STEP = 0.001;
const MIN_DISTANCE_SQ = 100;

let clietnX, clientY;

function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

function initializeParticles() {
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        let x = randomRange(0, canvas.width);
        let y = randomRange(0, canvas.height);

        let mass = Math.floor(Math.random() * MASS_MAX);
        let radius = mass ** 0.1;

        particles.push({
            x: x,
            y: y,
            mass: mass,
            radius: radius,
            vx: 0,
            vy: 0,
        });
    }
}

document.addEventListener("mousemove", (event) => {
    clientX = event.clientX;
    clientY = event.clientY;
});

initializeParticles();

function calculateForces() {
    particles.forEach((particle, indexa) => {
        let ax = 0;
        let ay = 0;

        particles.forEach((other, indexb) => {
            if (particle !== other) {
                let dx = other.x - particle.x;
                let dy = other.y - particle.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > MIN_DISTANCE_SQ) {
                    let force =
                        (G * (particle.mass * other.mass)) / distance ** 2;
                    force /= Math.sqrt(particle.mass);

                    ax += force * (dx / distance);
                    ay += force * (dy / distance);
                }
            }
        });

        particle.ax = ax;
        particle.ay = ay;
    });
}

function updateParticles() {
    particles.forEach((particle, index) => {
        particle.vx += particle.ax * TIME_STEP;
        particle.vy += particle.ay * TIME_STEP;
        particle.x += particle.vx * TIME_STEP;
        particle.y += particle.vy * TIME_STEP;

        if (
            particle.x < -particle.radius ||
            particle.x > canvas.width + particle.radius ||
            particle.y < -particle.radius ||
            particle.y > canvas.height + particle.radius
        ) {
            particles.splice(index, 1);
        }
    });
}

ctx.fillStyle = "white";

const MAX_ITERS = 10000;
let iterations = 0;

function draw() {
    iterations += 1;
    if (iterations >= MAX_ITERS) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    calculateForces();
    updateParticles();

    particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, 2 * Math.PI);
        ctx.fill();
    });

    requestAnimationFrame(draw);
}

draw();
