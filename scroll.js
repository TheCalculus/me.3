const animationTarget = document.querySelectorAll(".animation");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting)
                entry.target.classList.add("scroll-animation");
            else entry.target.classList.remove("scroll-animation");
        });
    },
    { threshold: 0.4 }
);

for (let i = 0; i < animationTarget.length; i++) {
    const elements = animationTarget[i];

    observer.observe(elements);
}
