const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let particles = [];
const PARTICLE_COUNT = 1000;
const MASS_MAX = 1000;
const G = 10;
const TIME_STEP = 0.005;
const MIN_DISTANCE_SQ = 100 ** 2;

function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

function initializeParticles() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

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

function calculateForces() {
    const len = particles.length;
    particles.forEach((particle, indexa) => {
        let ax = 0;
        let ay = 0;

        for (let indexb = 0; indexb < len; indexb++) {
            if (indexa === indexb) continue;
            let other = particles[indexb];

            let dx = other.x - particle.x;
            let dy = other.y - particle.y;

            let distanceSquared = dx ** 2 + dy ** 2;
            let distance_c = Math.sqrt(dx ** 2 + dy ** 2);

            if (distanceSquared > MIN_DISTANCE_SQ) {
                let force =
                    (G * (particle.mass * other.mass)) / distanceSquared;
                force /= Math.sqrt(particle.mass);

                ax += (force * dx) / Math.sqrt(distanceSquared);
                ay += (force * dy) / Math.sqrt(distanceSquared);
            }
        }

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

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    calculateForces();
    updateParticles();

    ctx.fillStyle = "white";
    particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, 2 * Math.PI);
        ctx.fill();
    });

    requestAnimationFrame(draw);
}

initializeParticles();
draw();
