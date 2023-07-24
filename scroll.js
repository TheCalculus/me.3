const animationTarget = document.querySelectorAll(".animation");
let active = 0;

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("scroll-animation");
                entry.target.style.zIndex = "1000";
                active++;
            } else {
                entry.target.classList.remove("scroll-animation");
                entry.target.style.zIndex = "-1000";
                active++;
            }
        });
    },
    { threshold: 0.7 }
);

// TODO: check if active is 0 for more than 2 seconds, and show a prompt telling the user to scroll to show more content

for (let i = 0; i < animationTarget.length; i++) {
    const elements = animationTarget[i];

    observer.observe(elements);
}
